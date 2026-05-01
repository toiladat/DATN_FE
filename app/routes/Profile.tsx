import { useState, useEffect, useRef } from 'react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot
} from '@/components/ui/input-otp'
import {
  Camera,
  Plus,
  Trash2,
  ShieldCheck,
  Mail,
  AlertCircle
} from 'lucide-react'
import { userRequests } from '@/apis/requests/user'
import mediaRequests from '@/apis/requests/media'
import { authRequests } from '@/apis/requests/auth'
import { useQueryClient } from '@tanstack/react-query'
import { UpdateProfileSchema } from '@/schemas/userSchema'
import { getErrorMessage } from '@/lib/utils'

const PLATFORMS = [
  { value: 'facebook', label: 'Facebook' },
  { value: 'twitter', label: 'Twitter (X)' },
  { value: 'telegram', label: 'Telegram' },
  { value: 'youtube', label: 'YouTube' },
  { value: 'linkedin', label: 'LinkedIn' }
]

// Parse "platform:url" string to structured object
function parseSocialLink(raw: string): {
  id: number
  platform: string
  url: string
} {
  const idx = raw.indexOf(':')
  if (idx === -1) return { id: Date.now(), platform: 'facebook', url: raw }
  return {
    id: Date.now() + Math.random(),
    platform: raw.slice(0, idx),
    url: raw.slice(idx + 1)
  }
}

// Serialize structured link back to "platform:url"
function serializeSocialLink(link: { platform: string; url: string }): string {
  return `${link.platform}:${link.url}`
}

type LinkItem = { id: number; platform: string; url: string }

export default function Profile() {
  const queryClient = useQueryClient()
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [isAvatarUploading, setIsAvatarUploading] = useState(false)
  const [isSendingOtp, setIsSendingOtp] = useState(false)
  const [isVerifyingOtp, setIsVerifyingOtp] = useState(false)
  const avatarInputRef = useRef<HTMLInputElement>(null)

  // User info
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('KYC_PENDING')
  const [avatar, setAvatar] = useState('')

  // Form fields
  const [name, setName] = useState('')
  const [biography, setBiography] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [location, setLocation] = useState('')
  const [website, setWebsite] = useState('')
  const [links, setLinks] = useState<LinkItem[]>([])

  // KYC OTP state
  const [isVerifyMode, setIsVerifyMode] = useState(false)
  const [otp, setOtp] = useState('')

  const isKycPending = status === 'KYC_PENDING'

  // Fetch user on mount
  useEffect(() => {
    setIsLoading(true)
    userRequests
      .getMe()
      .then((res) => {
        const u = res.data
        setEmail(u.email ?? '')
        setStatus(u.status ?? 'KYC_PENDING')
        setAvatar(u.avatar ?? '')
        setName(u.name ?? '')
        setBiography(u.biography ?? '')
        setPhoneNumber(u.phoneNumber ?? '')
        setLocation(u.location ?? '')
        setWebsite(u.website ?? '')
        setLinks((u.socialLinks ?? []).map((s: string) => parseSocialLink(s)))
      })
      .catch((err) => {
        console.error('Failed to load profile:', err)
      })
      .finally(() => setIsLoading(false))
  }, [])

  const handleSave = async () => {
    // Client-side validation
    const validation = UpdateProfileSchema.safeParse({
      website,
      socialLinks: links
    })
    if (!validation.success) {
      const firstError = validation.error.issues[0]
      toast.error(firstError.message)
      return
    }

    setIsSaving(true)
    try {
      const payload = {
        name: name || undefined,
        biography: biography || undefined,
        phoneNumber: phoneNumber || undefined,
        location: location || undefined,
        website: website || undefined,
        socialLinks: links.map(serializeSocialLink)
      }
      await userRequests.updateMe(payload)
      queryClient.invalidateQueries({ queryKey: ['me'] })
      toast.success('Lưu thành công!')
    } catch (err: any) {
      toast.error(getErrorMessage(err, 'Đã xảy ra lỗi khi lưu.'))
    } finally {
      setIsSaving(false)
    }
  }

  const handleSendCode = async () => {
    if (!email) {
      toast.error('Vui lòng nhập email trước khi xác thực.')
      return
    }
    setIsSendingOtp(true)
    try {
      await authRequests.requestEmailVerification(email)
      setIsVerifyMode(true)
      toast.success('Đã gửi mã xác thực đến email của bạn.')
    } catch (err: any) {
      toast.error(getErrorMessage(err, 'Gửi mã xác thực thất bại.'))
    } finally {
      setIsSendingOtp(false)
    }
  }

  // KYC verify
  const handleVerifyOTP = async () => {
    if (!otp || otp.length !== 6) {
      toast.error('Vui lòng nhập đủ 6 số OTP.')
      return
    }
    setIsVerifyingOtp(true)
    try {
      await authRequests.verifyEmail({ email, code: otp })
      setStatus('ACTIVE')
      setIsVerifyMode(false)
      setOtp('')
      queryClient.invalidateQueries({ queryKey: ['me'] })
      toast.success('Xác thực email thành công!')
    } catch (err: any) {
      toast.error(
        getErrorMessage(
          err,
          'Xác thực thất bại, mã OTP không đúng hoặc đã hết hạn.'
        )
      )
    } finally {
      setIsVerifyingOtp(false)
    }
  }

  const handleAvatarSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setIsAvatarUploading(true)
    try {
      const urls = await mediaRequests.uploadFiles([file], 'cover')
      const newAvatarUrl = urls[0]
      if (newAvatarUrl) {
        setAvatar(newAvatarUrl)
        // Persist to backend immediately
        await userRequests.updateMe({ avatar: newAvatarUrl })
        queryClient.invalidateQueries({ queryKey: ['me'] })
      }
    } catch (err) {
      console.error('Failed to upload avatar:', err)
    } finally {
      setIsAvatarUploading(false)
      // Reset input so same file can be re-selected
      if (avatarInputRef.current) avatarInputRef.current.value = ''
    }
  }

  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center bg-[#10131a] min-h-[calc(100vh-4rem)]">
        <div className="w-8 h-8 border-2 border-[#8ff5ff]/30 border-t-[#8ff5ff] rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="flex-1 overflow-y-auto p-6 md:p-12 relative bg-[#10131a] min-h-[calc(100vh-4rem)]">
      {/* Background Atmospheric Glow */}
      <div className="absolute top-0 right-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-[#8ff5ff]/5 rounded-full blur-[120px]"></div>
      </div>

      <div className="max-w-4xl mx-auto relative z-10 mt-8 md:mt-12">
        {/* Form Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Primary Info */}
          <div className="lg:col-span-2 space-y-8">
            {/* Identity Details Section */}
            <section className="space-y-6">
              <h2 className="text-lg font-['Space_Grotesk'] font-semibold text-[#ecedf6] flex items-center gap-2">
                Identity Details
              </h2>

              <div className="space-y-5 bg-[#161a21] border border-[#2e323b]/50 rounded-lg p-6">
                {/* Name Input */}
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-[#ecedf6]">
                    Display Name
                  </Label>
                  <Input
                    id="name"
                    placeholder="Your public name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="bg-[#10131a] border-[#2e323b] text-[#ecedf6] focus-visible:ring-[#8ff5ff]"
                  />
                </div>

                {/* Email – read-only, updated only via KYC verify */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-[#ecedf6]">
                    Email Address
                  </Label>
                  <div className="flex gap-2">
                    <Input
                      id="email"
                      placeholder="alex@example.com"
                      type="email"
                      value={email}
                      readOnly={!isKycPending}
                      onChange={(e) => setEmail(e.target.value)}
                      className="bg-[#10131a] border-[#2e323b] text-[#ecedf6] flex-1 disabled:opacity-50"
                    />
                    {isKycPending && !isVerifyMode && (
                      <Button
                        type="button"
                        onClick={handleSendCode}
                        disabled={isSendingOtp}
                        className="bg-[#ffb020] text-[#10131a] hover:bg-[#ffb020]/90 font-semibold px-4"
                      >
                        {isSendingOtp ? (
                          <div className="w-4 h-4 border-2 border-[#10131a]/30 border-t-[#10131a] rounded-full animate-spin mr-2" />
                        ) : null}
                        Verify
                      </Button>
                    )}
                    {!isKycPending && (
                      <Button
                        type="button"
                        disabled
                        className="bg-[#2e323b] text-[#8ff5ff] font-semibold opacity-100 cursor-default px-4"
                      >
                        <span className="material-symbols-outlined text-[16px] mr-1">
                          check_circle
                        </span>{' '}
                        Verified
                      </Button>
                    )}
                  </div>
                </div>

                {/* Inline OTP Section */}
                {isVerifyMode && isKycPending && (
                  <div className="flex items-center justify-start gap-3 animate-in fade-in slide-in-from-top-2">
                    <InputOTP maxLength={6} value={otp} onChange={setOtp}>
                      <InputOTPGroup>
                        {[0, 1, 2, 3, 4, 5].map((i) => (
                          <InputOTPSlot
                            key={i}
                            index={i}
                            className="h-9 w-9 text-base font-mono bg-[#10131a] border-[#2e323b] text-[#ecedf6] data-[active=true]:border-[#8ff5ff]"
                          />
                        ))}
                      </InputOTPGroup>
                    </InputOTP>
                    <Button
                      type="button"
                      onClick={handleVerifyOTP}
                      disabled={otp.length !== 6 || isVerifyingOtp}
                      className="bg-[#8ff5ff] text-[#10131a] hover:bg-[#8ff5ff]/90 font-semibold px-4 h-9 min-w-[90px]"
                    >
                      {isVerifyingOtp ? (
                        <div className="w-4 h-4 border-2 border-[#10131a]/30 border-t-[#10131a] rounded-full animate-spin" />
                      ) : (
                        'Confirm'
                      )}
                    </Button>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {/* Phone Input */}
                  <div className="space-y-2">
                    <Label htmlFor="phoneNumber" className="text-[#ecedf6]">
                      Phone Number
                    </Label>
                    <Input
                      id="phoneNumber"
                      placeholder="+1 (555) 000-0000"
                      type="tel"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className="bg-[#10131a] border-[#2e323b] text-[#ecedf6] focus-visible:ring-[#8ff5ff]"
                    />
                  </div>

                  {/* Location Input */}
                  <div className="space-y-2">
                    <Label htmlFor="location" className="text-[#ecedf6]">
                      Location
                    </Label>
                    <Input
                      id="location"
                      placeholder="Search city or country"
                      type="text"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="bg-[#10131a] border-[#2e323b] text-[#ecedf6] focus-visible:ring-[#8ff5ff]"
                    />
                  </div>
                </div>

                {/* Bio Textarea */}
                <div className="space-y-2">
                  <Label htmlFor="biography" className="text-[#ecedf6]">
                    Biography
                  </Label>
                  <Textarea
                    id="biography"
                    placeholder="Tell the community about yourself..."
                    rows={4}
                    value={biography}
                    onChange={(e) => setBiography(e.target.value)}
                    className="bg-[#10131a] border-[#2e323b] text-[#ecedf6] focus-visible:ring-[#8ff5ff] resize-y"
                  />
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-[#73757d]">
                      Briefly describe your background and interests.
                    </span>
                    <span className="text-xs text-[#73757d] font-mono">
                      {biography.length} / 300
                    </span>
                  </div>
                </div>
              </div>
            </section>

            {/* Presence & Links Card */}
            <section className="space-y-6">
              <h2 className="text-lg font-['Space_Grotesk'] font-semibold text-[#ecedf6] flex items-center gap-2">
                Presence & Links
              </h2>

              <div className="bg-[#161a21] border border-[#2e323b]/50 rounded-lg p-6 space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="website" className="text-[#ecedf6]">
                    Website
                  </Label>
                  <Input
                    id="website"
                    type="url"
                    placeholder="https://"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                    className="bg-[#10131a] border-[#2e323b] text-[#ecedf6] focus-visible:ring-[#8ff5ff]"
                  />
                </div>

                <div className="border-t border-[#2e323b]/50 pt-5 mt-5">
                  <div className="flex items-center justify-between mb-4">
                    <Label className="text-[#ecedf6]">Social Links</Label>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 text-xs text-[#8ff5ff] hover:text-[#8ff5ff] hover:bg-[#8ff5ff]/10"
                      onClick={() =>
                        setLinks([
                          ...links,
                          { id: Date.now(), platform: 'facebook', url: '' }
                        ])
                      }
                    >
                      <span className="material-symbols-outlined text-[14px] mr-1">
                        add
                      </span>{' '}
                      Add Link
                    </Button>
                  </div>

                  <div className="space-y-3">
                    {links.map((link, index) => (
                      <div key={link.id} className="flex items-center gap-3">
                        <div className="w-[140px] shrink-0">
                          <Select
                            value={link.platform}
                            onValueChange={(val) => {
                              const newLinks = [...links]
                              newLinks[index] = {
                                ...newLinks[index],
                                platform: val
                              }
                              setLinks(newLinks)
                            }}
                          >
                            <SelectTrigger className="bg-[#10131a] border-[#2e323b] text-[#ecedf6] focus-visible:ring-[#8ff5ff]">
                              <SelectValue placeholder="Platform" />
                            </SelectTrigger>
                            <SelectContent>
                              {PLATFORMS.map((p) => (
                                <SelectItem key={p.value} value={p.value}>
                                  {p.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="flex-1">
                          <Input
                            type="url"
                            placeholder="https://"
                            value={link.url}
                            className="bg-[#10131a] border-[#2e323b] text-[#ecedf6] focus-visible:ring-[#8ff5ff]"
                            onChange={(e) => {
                              const newLinks = [...links]
                              newLinks[index] = {
                                ...newLinks[index],
                                url: e.target.value
                              }
                              setLinks(newLinks)
                            }}
                          />
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-10 w-10 text-[#73757d] hover:text-[#ff716c] hover:bg-[#ff716c]/10 shrink-0"
                          title="Remove link"
                          onClick={() =>
                            setLinks(links.filter((l) => l.id !== link.id))
                          }
                        >
                          <span className="material-symbols-outlined text-sm">
                            close
                          </span>
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Right Column: Avatar & Actions */}
          <div className="space-y-6">
            {/* Avatar Upload Card */}
            <div className="bg-[#161a21] border border-[#2e323b]/50 rounded-lg p-6 flex flex-col items-center text-center">
              <h2 className="text-sm font-medium text-[#ecedf6] mb-6 w-full text-left">
                Profile Image
              </h2>

              {/* Hidden file input */}
              <input
                ref={avatarInputRef}
                type="file"
                accept="image/jpeg,image/jpg,image/png,image/webp"
                className="hidden"
                onChange={handleAvatarSelect}
              />

              <div
                className="relative group cursor-pointer mb-6"
                onClick={() =>
                  !isAvatarUploading && avatarInputRef.current?.click()
                }
              >
                <div className="w-32 h-32 rounded-full overflow-hidden border border-[#2e323b] relative z-10 group-hover:border-[#8ff5ff]/50 transition-colors">
                  {avatar ? (
                    <img
                      alt="Avatar"
                      className="w-full h-full object-cover"
                      src={avatar}
                    />
                  ) : (
                    <div className="w-full h-full bg-[#2e323b] flex items-center justify-center">
                      <span className="material-symbols-outlined text-[#73757d] text-4xl">
                        person
                      </span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-[#10131a]/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    {isAvatarUploading ? (
                      <span className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <span className="material-symbols-outlined text-white text-2xl">
                        upload
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <p className="text-xs text-[#73757d] mb-4">
                JPEG, PNG, or WebP.
                <br />
                Max file size: 15MB.
              </p>

              <Button
                variant="outline"
                className="w-full bg-[#10131a] border-[#2e323b] text-[#ecedf6] hover:bg-[#2e323b] hover:text-white disabled:opacity-50"
                disabled={isAvatarUploading}
                onClick={() => avatarInputRef.current?.click()}
              >
                {isAvatarUploading ? 'Uploading...' : 'Select File'}
              </Button>
            </div>

            {/* Action Card */}
            <div className="bg-[#161a21] border border-[#2e323b]/50 rounded-lg p-6 sticky top-28">
              <h3 className="text-sm font-medium text-[#ecedf6] mb-2">
                Unsaved Changes
              </h3>
              <p className="text-xs text-[#a9abb3] mb-5">
                Review your changes before saving to the network.
              </p>

              <Button
                onClick={handleSave}
                disabled={isSaving}
                className="w-full bg-[#8ff5ff] text-[#10131a] hover:bg-[#8ff5ff]/90 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSaving ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-[#10131a]/30 border-t-[#10131a] rounded-full animate-spin" />
                    Saving...
                  </span>
                ) : (
                  'Save Settings'
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
