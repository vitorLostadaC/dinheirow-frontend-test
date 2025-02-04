'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { PaginationPropsSchema } from './Pagination.chema'
import { PaginationItem } from './components/PaginationItem/PaginationItem'
import { generatePagesArray } from './utils/utils'

/**
 * Quantity siblings renders
 * @example
 * consider 1 being the current page
 * SIBLINGS_COUNT = 2 => 1 `2` `3` ... 10
 * SIBLINGS_COUNT = 1 => 1 `2` ... 10
 */
const SIBLINGS_COUNT = 5

export function Pagination({
  totalItems,
  currentPage,
  quantityItemsPerPage
}: PaginationPropsSchema) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const queryParams = new URLSearchParams(searchParams.toString())
  const lastPage = Math.ceil(totalItems / quantityItemsPerPage)

  const handleChangePage = (page: number) => {
    queryParams.set('page', String(page))
    router.push(`/?${queryParams.toString()}`)
  }

  const previousPages =
    currentPage > 1
      ? generatePagesArray(currentPage - 1 - SIBLINGS_COUNT, currentPage - 1)
      : []

  const nextPages =
    currentPage < lastPage
      ? generatePagesArray(
          currentPage,
          Math.min(currentPage + SIBLINGS_COUNT, lastPage)
        )
      : []

  return (
    <div className="flex w-full justify-center gap-2 text-white">
      {currentPage > 1 + SIBLINGS_COUNT && (
        <>
          <PaginationItem selectPage={handleChangePage} pageNumber={1} />
          {currentPage > 2 + SIBLINGS_COUNT && <p className="px-2"> ...</p>}
        </>
      )}
      {previousPages.length > 0 &&
        previousPages.map((page) => (
          <PaginationItem
            selectPage={handleChangePage}
            key={page}
            pageNumber={page}
          />
        ))}
      <PaginationItem
        selectPage={handleChangePage}
        pageNumber={currentPage}
        isSelected
      />
      {nextPages.length > 0 &&
        nextPages.map((page) => (
          <PaginationItem
            selectPage={handleChangePage}
            key={page}
            pageNumber={page}
          />
        ))}
      {currentPage + SIBLINGS_COUNT < lastPage && (
        <>
          {currentPage + 1 + SIBLINGS_COUNT < lastPage && (
            <p className="px-2"> ...</p>
          )}
          <PaginationItem
            selectPage={(page) => router.replace(`/?page=${page}`)}
            pageNumber={lastPage}
          />
        </>
      )}
    </div>
  )
}
