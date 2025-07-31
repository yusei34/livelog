import React from 'react'

const Pagination = ({ page, totalPages, onPageChange }) => {
  return (
    <nav className="flex gap-2 mt-4">
      <button
        onClick={() => onPageChange(page - 1)}
        // disabled={page === 1}
        className="px-3 py-1 border rounded"
      >
        前へ
      </button>
      
        <button
          onClick={() => onPageChange(i + 1)}
          className={`px-3 py-1 border rounded `}
        >
        </button>
   
      <button
        onClick={() => onPageChange(page + 1)}
        // disabled={page === totalPages || totalPages === 0}
        className="px-3 py-1 border rounded"
      >
        次へ
      </button>
    </nav>
  )
}

export default Pagination