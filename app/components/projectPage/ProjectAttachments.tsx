import React from 'react'
import type { ProjectDetail } from '@/schemas/projectSchema'
import {
  FileText,
  Image as ImageIcon,
  Download,
  ExternalLink,
  Archive
} from 'lucide-react'

interface ProjectAttachmentsProps {
  project: ProjectDetail
}

export function ProjectAttachments({ project }: ProjectAttachmentsProps) {
  const attachments = project.projectAttachments || []

  if (attachments.length === 0) {
    return (
      <div className="bg-[#10131a] rounded-2xl border border-[#2e323b]/50 p-12 text-center mt-6">
        <Archive className="w-12 h-12 text-[#2e323b] mx-auto mb-4" />
        <h3 className="text-[#ecedf6] font-['Space_Grotesk'] font-bold text-lg mb-2">
          No Attachments Found
        </h3>
        <p className="text-[#73757d]">
          This project hasn't uploaded any additional documents or files.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-6 mt-6">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-['Space_Grotesk'] font-bold text-[#ecedf6]">
          Project Documents
          <span className="text-sm text-[#a9abb3] font-normal ml-3">
            ({attachments.length} file{attachments.length !== 1 ? 's' : ''})
          </span>
        </h2>
        <div className="h-[1px] flex-1 bg-gradient-to-r from-[#2e323b] to-transparent ml-6" />
      </div>

      <div className="flex flex-col gap-3">
        {attachments.map((att) => {
          const isDoc = att.url.toLowerCase().match(/\.(pdf|doc|docx)$/i)
          // Extract file extension from URL (e.g. "jpg", "pdf")
          const extMatch = att.url.match(/\.([a-zA-Z0-9]+)(?:[\?#]|$)/)
          const ext = extMatch
            ? extMatch[1].substring(0, 4).toUpperCase()
            : 'FILE'

          const categoryName =
            att.category === 'Other' && att.customCategoryName
              ? att.customCategoryName
              : att.category

          return (
            <div
              key={att.id}
              className="group flex items-center justify-between p-4 bg-[#10131a] rounded-xl border border-[#2e323b]/50 hover:border-[#8ff5ff]/30 transition-all duration-300"
            >
              <div className="flex items-center gap-4 min-w-0">
                {/* Icon */}
                <div className="w-12 h-12 rounded-lg bg-[#161a21] border border-[#2e323b]/50 flex items-center justify-center shrink-0 group-hover:border-[#8ff5ff]/20 transition-colors relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent" />
                  {isDoc ? (
                    <FileText className="w-5 h-5 text-[#ac89ff] relative z-10" />
                  ) : (
                    <ImageIcon className="w-5 h-5 text-[#8ff5ff] relative z-10" />
                  )}
                </div>

                {/* Details */}
                <div className="min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-sm font-['Space_Grotesk'] font-bold text-[#ecedf6] truncate group-hover:text-[#8ff5ff] transition-colors uppercase tracking-widest">
                      {categoryName}
                    </h3>
                    <span className="shrink-0 px-1.5 py-0.5 rounded text-[9px] font-mono font-bold bg-[#1c2028] text-[#a9abb3] border border-[#2e323b] uppercase tracking-wider">
                      {ext}
                    </span>
                  </div>
                  {att.description ? (
                    <p className="text-xs text-[#73757d] truncate max-w-md">
                      {att.description}
                    </p>
                  ) : (
                    <p className="text-xs text-[#45484f] italic">
                      No description provided
                    </p>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="flex shrink-0 ml-4">
                <a
                  href={att.url}
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 rounded-full bg-[#161a21] flex items-center justify-center hover:bg-[#8ff5ff]/10 text-[#a9abb3] hover:text-[#8ff5ff] transition-colors border border-[#2e323b]/50 hover:border-[#8ff5ff]/30"
                  title="View File"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
