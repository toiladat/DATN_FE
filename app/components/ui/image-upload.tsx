import React, { useState, useRef, useEffect } from 'react'

interface ImageUploadProps {
  onImagesChange?: (
    files: File[],
    remainingInitialUrls: string[]
  ) => void | Promise<void>
  onRemoveInitial?: (url: string) => void
  className?: string
  maxImages?: number
  initialPreviews?: string[]
}

export function ImageUpload({
  onImagesChange,
  onRemoveInitial,
  className = '',
  maxImages = 4,
  initialPreviews = []
}: ImageUploadProps) {
  const [previews, setPreviews] = useState<string[]>([])
  const [files, setFiles] = useState<File[]>([])
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (initialPreviews.length > 0) {
      setPreviews(initialPreviews)
    }
  }, [initialPreviews])

  // Note: We use URL.createObjectURL for previews. We should revoke them to prevent memory leaks if component unmounts.
  useEffect(() => {
    return () => {
      previews.forEach((url) => URL.revokeObjectURL(url))
    }
  }, [previews])

  const processFiles = async (newFiles: FileList | File[]) => {
    const validFiles = Array.from(newFiles).filter((file) =>
      file.type.startsWith('image/')
    )
    const availableSlots = maxImages - files.length

    if (availableSlots <= 0) return

    const filesToAdd = validFiles.slice(0, availableSlots)
    const newPreviews = filesToAdd.map((file) => URL.createObjectURL(file))

    const updatedFiles = [...files, ...filesToAdd]
    const updatedPreviews = [...previews, ...newPreviews]

    setFiles(updatedFiles)
    setPreviews(updatedPreviews)

    if (onImagesChange) {
      const remainingInitial = updatedPreviews.filter((p) =>
        p.startsWith('http')
      )
      try {
        await onImagesChange(updatedFiles, remainingInitial)
      } catch (error) {
        // Rollback state if backend rejects the upload
        setFiles(files)
        setPreviews(previews)
      }
    }
  }

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const onDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFiles(e.dataTransfer.files)
    }
  }

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processFiles(e.target.files)
    }
    // reset input value so selecting the same file again triggers onChange
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const removeImage = (index: number, e: React.MouseEvent) => {
    e.stopPropagation()

    const previewUrl = previews[index]

    if (previewUrl.startsWith('http')) {
      // It's an initial image from parent
      if (onRemoveInitial) {
        onRemoveInitial(previewUrl)
      }
      const newPreviews = [...previews]
      newPreviews.splice(index, 1)
      setPreviews(newPreviews)
      return
    }

    // Otherwise it's a newly added file
    URL.revokeObjectURL(previewUrl)

    // We need to find its index in the 'files' array.
    // Since previews is a mix of initialUrls and new files, the index in 'files'
    // is (index - number of initial urls remaining).
    const initialUrlCount = previews.filter((p) => p.startsWith('http')).length
    const fileIndex = index - initialUrlCount

    const newFiles = [...files]
    const newPreviews = [...previews]
    newPreviews.splice(index, 1)

    if (fileIndex >= 0) {
      newFiles.splice(fileIndex, 1)
      setFiles(newFiles)
      if (onImagesChange) {
        // Because newPreviews already has the item removed
        const remainingInitial = newPreviews.filter((p) => p.startsWith('http'))
        onImagesChange(newFiles, remainingInitial)
      }
    }
    setPreviews(newPreviews)
  }

  return (
    <div className={`w-full ${className}`}>
      <div className="flex flex-wrap gap-4">
        {/* Upload Box */}
        {files.length < maxImages && (
          <div
            className={`relative flex-shrink-0 ${previews.length > 0 ? 'w-32 h-32 sm:w-40 sm:h-40' : 'w-full h-48'} border-2 border-dashed rounded-xl transition-all cursor-pointer flex flex-col items-center justify-center text-center p-4 group ${
              isDragging
                ? 'border-[#8ff5ff] bg-[#8ff5ff]/5'
                : 'border-[#45484f]/30 hover:border-[#8ff5ff]/50 hover:bg-[#8ff5ff]/5 bg-[#1c2028]'
            }`}
            onDragOver={onDragOver}
            onDragLeave={onDragLeave}
            onDrop={onDrop}
            onClick={() => fileInputRef.current?.click()}
          >
            <input
              type="file"
              accept="image/*"
              className="hidden"
              ref={fileInputRef}
              onChange={onChange}
              multiple
            />

            <div
              className={`rounded-full bg-[#22262f] border border-[#45484f]/30 flex items-center justify-center transition-colors text-[#a9abb3] group-hover:text-[#8ff5ff] group-hover:border-[#8ff5ff]/50 ${previews.length > 0 ? 'w-10 h-10 mb-2' : 'w-12 h-12 mb-4'}`}
            >
              <span
                className={`material-symbols-outlined ${previews.length > 0 ? 'text-xl' : 'text-2xl'}`}
              >
                {previews.length > 0 ? 'add_photo_alternate' : 'cloud_upload'}
              </span>
            </div>
            {previews.length === 0 ? (
              <>
                <p className="text-[#ecedf6] font-medium mb-1">
                  <span className="text-[#8ff5ff]">Click to upload</span> or
                  drag and drop
                </p>
                <p className="text-[#a9abb3] text-xs mt-1">
                  Upload up to {maxImages} images (SVG, PNG, JPG)
                </p>
              </>
            ) : (
              <p className="text-[#a9abb3] text-[10px] sm:text-xs">
                Add more ({files.length}/{maxImages})
              </p>
            )}
          </div>
        )}

        {/* Previews */}
        {previews.map((preview, index) => (
          <div
            key={index}
            className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-xl overflow-hidden group border border-[#45484f]/30 flex-shrink-0 bg-[#1c2028]"
          >
            <img
              src={preview}
              alt={`Preview ${index}`}
              className="w-full h-full object-cover"
            />

            <div className="absolute inset-0 bg-[#0b0e14]/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <button
                onClick={(e) => removeImage(index, e)}
                className="w-10 h-10 bg-[#22262f] text-[#ecedf6] rounded-full hover:bg-red-500 hover:text-white transition-colors flex items-center justify-center shadow-lg transform hover:scale-110 active:scale-95"
                title="Remove image"
              >
                <span className="material-symbols-outlined text-[20px]">
                  delete
                </span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
