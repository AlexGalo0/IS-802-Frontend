
import { useEffect } from "react";
import Pagination from "react-bootstrap/Pagination";

export const Paginacion = ({longitudPaginacion,state}) => {
  

  return (
    <Pagination className='py-4'>
    {Array.from({ length: longitudPaginacion }).map((_, index) => {
       
        return (
            <Pagination.Item
                onClick={() => handlePageChange(index + 1)}
                key={index + 1}
                active={index + 1 === state.activePage}
            >
                {index + 1}
            </Pagination.Item>
        );
    })}
</Pagination>
  )
}


// /* 

// 					<Pagination className='py-4'>
// 						{Array.from({ length: longitudPaginacion }).map((_, index) => {
// 							/* /* Necesito la cantidad de paginas desde el back */
// 							return (
// 								<Pagination.Item
// 									onClick={() => handlePageChange(index + 1)}
// 									key={index + 1}
// 									active={index + 1 === state.activePage}
// 								>
// 									{index + 1}
// 								</Pagination.Item>
// 							);
// 						})}
// 					</Pagination>
// 					*/

// */