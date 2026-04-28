import {
  Pagination as ShadcnPagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from '@/components/ui/pagination'

type PaginationProps = {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange
}: PaginationProps) {
  if (totalPages <= 1) return null

  // Tạo mảng số trang hiển thị
  const getPageNumbers = () => {
    const pages = []
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i)
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, '...', totalPages)
      } else if (currentPage >= totalPages - 2) {
        pages.push(
          1,
          '...',
          totalPages - 3,
          totalPages - 2,
          totalPages - 1,
          totalPages
        )
      } else {
        pages.push(
          1,
          '...',
          currentPage - 1,
          currentPage,
          currentPage + 1,
          '...',
          totalPages
        )
      }
    }
    return pages
  }

  return (
    <div className="mt-20">
      <ShadcnPagination>
        <PaginationContent className="gap-2 text-[13px] font-mono font-bold">
          <PaginationItem>
            <PaginationPrevious
              onClick={(e) => {
                e.preventDefault()
                if (currentPage > 1) onPageChange(currentPage - 1)
              }}
              className={`p-3 rounded-xl border border-[#2e323b] text-[#73757d] hover:text-[#ecedf6] hover:border-[#73757d] hover:bg-[#161a21] transition-all bg-[#161a21] ${currentPage === 1 ? 'opacity-50 cursor-not-allowed pointer-events-none' : 'cursor-pointer'}`}
            />
          </PaginationItem>

          {getPageNumbers().map((page, index) => {
            if (page === '...') {
              return (
                <PaginationItem key={`dots-${index}`}>
                  <PaginationEllipsis className="text-[#2e323b]" />
                </PaginationItem>
              )
            }

            const isCurrent = page === currentPage
            return (
              <PaginationItem key={page}>
                <PaginationLink
                  onClick={(e) => {
                    e.preventDefault()
                    onPageChange(page as number)
                  }}
                  isActive={isCurrent}
                  className={`w-11 h-11 rounded-xl flex items-center justify-center transition-all cursor-pointer ${
                    isCurrent
                      ? 'bg-[#8ff5ff]/10 text-[#8ff5ff] border border-[#8ff5ff]/50 shadow-[0_0_15px_rgba(143,245,255,0.2)] hover:bg-[#8ff5ff]/20 hover:text-[#8ff5ff]'
                      : 'bg-[#161a21] border border-[#2e323b] text-[#73757d] hover:text-[#ecedf6] hover:border-[#73757d] hover:bg-[#2e323b]/50'
                  }`}
                >
                  {(page as number).toString().padStart(2, '0')}
                </PaginationLink>
              </PaginationItem>
            )
          })}

          <PaginationItem>
            <PaginationNext
              onClick={(e) => {
                e.preventDefault()
                if (currentPage < totalPages) onPageChange(currentPage + 1)
              }}
              className={`p-3 rounded-xl border border-[#2e323b] text-[#73757d] hover:text-[#ecedf6] hover:border-[#73757d] hover:bg-[#161a21] transition-all bg-[#161a21] ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed pointer-events-none' : 'cursor-pointer'}`}
            />
          </PaginationItem>
        </PaginationContent>
      </ShadcnPagination>
    </div>
  )
}
