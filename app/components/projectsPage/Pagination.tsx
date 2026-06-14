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
              className={`p-3 rounded-none border border-border text-muted-foreground hover:text-foreground hover:border-border/80 hover:bg-card transition-all bg-card ${currentPage === 1 ? 'opacity-50 cursor-not-allowed pointer-events-none' : 'cursor-pointer'} shadow-[2px_2px_0px_rgba(0,0,0,0.08)] dark:shadow-[2px_2px_0px_rgba(255,255,255,0.05)] active:translate-y-0.5 active:translate-x-0.5`}
            />
          </PaginationItem>

          {getPageNumbers().map((page, index) => {
            if (page === '...') {
              return (
                <PaginationItem key={`dots-${index}`}>
                  <PaginationEllipsis className="text-border" />
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
                  className={`w-11 h-11 rounded-none flex items-center justify-center transition-all cursor-pointer active:translate-y-0.5 active:translate-x-0.5 ${
                    isCurrent
                      ? 'bg-neon-cyan/10 text-neon-cyan border border-neon-cyan/50 shadow-[2px_2px_0px_0px_var(--neon-purple)] hover:bg-neon-cyan/20 hover:text-neon-cyan'
                      : 'bg-card border border-border text-muted-foreground hover:text-foreground hover:border-border/80 hover:bg-muted/50 shadow-[2px_2px_0px_rgba(0,0,0,0.08)] dark:shadow-[2px_2px_0px_rgba(255,255,255,0.05)]'
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
              className={`p-3 rounded-none border border-border text-muted-foreground hover:text-foreground hover:border-border/80 hover:bg-card transition-all bg-card ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed pointer-events-none' : 'cursor-pointer'} shadow-[2px_2px_0px_rgba(0,0,0,0.08)] dark:shadow-[2px_2px_0px_rgba(255,255,255,0.05)] active:translate-y-0.5 active:translate-x-0.5`}
            />
          </PaginationItem>
        </PaginationContent>
      </ShadcnPagination>
    </div>
  )
}
