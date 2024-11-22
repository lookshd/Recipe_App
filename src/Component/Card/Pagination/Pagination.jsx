import React from 'react'
import '../Pagination/Pagination.css'
const Pagination = ({paginatedHandler,length,page,totalPages}) => {
  function selectPageHandler(p)
  {
    paginatedHandler(p);
  }
  return (
    <div>
         {length > 0 && (
          <div className="pagination">
            <span
              onClick={() => selectPageHandler(page - 1)}
              className={page > 1 ? "" : "pagination__disable"}
            >
              ◀
            </span>
            {[...Array(totalPages)].map((_, i) => (
              <span
                key={i + 1}
                className={page === i + 1 ? "pagination__selected" : ""}
                onClick={() => selectPageHandler(i + 1)}
              >
                {i + 1}
              </span>
            ))}
            <span
              onClick={() => selectPageHandler(page + 1)}
              className={page < totalPages ? "" : "pagination__disable"}
            >
              ▶
            </span>
          </div>
        )}
      </div>
   
  )
}

export default Pagination