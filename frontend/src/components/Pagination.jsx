const Pagination = ({ page, totalPages, onPageChange }) => {
  return (
     <nav className="flex gap-2 mt-4">
      <button
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
        className="px-3 py-1 border border-gray-500 rounded text-gray-700"
      >
        前へ
      </button>
      {Array.from({length: totalPages}, (_, i) => (
        <button
          key={i+1}
          onClick={() => onPageChange(i + 1)}
          className={`px-3 py-1 border border-gray-500  text-gray-700 rounded ${page === i+1 ? "bg-green-200 font-bold " : ""}`}
        >
          {i + 1}
        </button>
      ))}
      <button
        onClick={() => onPageChange(page + 1)}
        disabled={page === totalPages || totalPages === 0}
        className="px-3 py-1 border border-gray-500  text-gray-700 rounded "
      >
        次へ
      </button>
    </nav>
  )
}

export default Pagination