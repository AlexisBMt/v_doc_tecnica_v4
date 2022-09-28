export default function Pagination ({ dataPerPage, totalData, currentPage, paginate }) {

  return(
    <>
      <nav aria-label='Pagination Data'>
        <ul className='pagination'>
          <li className='page-item'>
            <button className='page-link' aria-label='Previus' value='-1' onClick={() => paginate(currentPage - 1)}>
              <span aria-hidden="true">&laquo;</span>
            </button>
          </li>
          <li className='page-item'><button className='page-link disabled'>{currentPage}</button></li>
          <li className='page-item'>
            <button className='page-link' aria-label='Next' value='1' onClick={() => paginate(currentPage + 1)}>
              <span aria-hidden="true">&raquo;</span>
            </button>
          </li>
        </ul>
      </nav>
    </>
  )
}