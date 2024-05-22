
import React, { MouseEventHandler, ReactElement, useEffect } from "react";
import { useRouter,usePathname,useSearchParams, ReadonlyURLSearchParams } from 'next/navigation';
import { usePagination } from "pagination-react-js"

const updateQuery = (key:string,value:string,searchParams:ReadonlyURLSearchParams)=>{
  const query = new URLSearchParams(Array.from(searchParams.entries()))

  const oldValue=query.get(key)
  if(oldValue!==value){
      query.set(key,value)
  }else{
      query.delete(key)
  } 

  const newQuery = query.toString() ? `?${query.toString()}`:''
  return newQuery
}


type PaginationType = {
  children:ReactElement|string, 
  label:string, 
  active?:boolean, 
  onClick:MouseEventHandler<HTMLLIElement>, 
  rel?:string,
  className?:string
}

const PaginationItem:React.FC<PaginationType>= ({ children, label, active, onClick, rel,className }) => {
    const classNM = className?className:''
    return (
      <li
        className={classNM+["pagination-item ", active ? "pagination-item-active" : undefined].filter((value) => value).join(" ")}
        aria-current={active ?? "page"}
        aria-label={label}
        rel={rel}
        onClick={onClick}
      >
        {children}
      </li>
    )
  }
  
const Pagination = ({totalItems, onState, onPageChange}: {totalItems: number, onState: boolean, onPageChange: any}) => {
    const router = useRouter();
    const pathname = usePathname()
    const searchParams = useSearchParams();
    const page = searchParams.get('p')
    const { records, pageNumbers, setActivePage, setRecordsPerPage } = usePagination({
      activePage: 1,
      recordsPerPage: 20,
      totalRecordsLength: totalItems,
      offset: 2,
      navCustomPageSteps: { prev: 3, next: 3 },
      permanentFirstNumber: true,
      permanentLastNumber: true,
    })

    function updateActivePage(pageNumber:number|boolean) {
      if(typeof pageNumber ==='number'){
        
      
        console.log('pagenumber:',pageNumber)
        if(typeof onPageChange == 'function'){
          onPageChange(pageNumber)
        }
        pageNumber && setActivePage(pageNumber)
        if(!onState){
          const query = updateQuery('p',`${pageNumber}`,searchParams)
          router.replace(`${pathname}${query}`)
        }
      }
    }

    useEffect(()=>{
      if(page && Number(page)){
        setActivePage(Number(page))
      }
    },[])
  
    return ( 
        <nav role="navigation" aria-label="Pagination Navigation">
          <ul className="pagination">
            <PaginationItem
              label={`Goto first page ${pageNumbers.firstPage}`}
              rel="first"
              onClick={() => updateActivePage(pageNumbers.firstPage)}
              active={false}
              className="pagi-item "
            

            >
              &laquo;
            </PaginationItem>
  
            <PaginationItem
              label={`Goto previous page ${pageNumbers.previousPage}`}
              rel="prev"
              onClick={() => updateActivePage(pageNumbers.previousPage)}
              active={pageNumbers.previousPage === pageNumbers.activePage}
              className="pagi-item "
            >
              &lsaquo;
            </PaginationItem>
  
            <PaginationItem
              label={`Goto first page ${pageNumbers.firstPage}`}
              active={pageNumbers.firstPage === pageNumbers.activePage}
              onClick={() => updateActivePage(pageNumbers.firstPage)}
              rel='first'
            >
              {pageNumbers.firstPage?String(pageNumbers.firstPage):'0'}
            </PaginationItem>
  
            {pageNumbers.customPreviousPage && (
              <PaginationItem
                label={`Goto page ${pageNumbers.customPreviousPage}`}
                onClick={() => updateActivePage(pageNumbers.customPreviousPage)}
                active={pageNumbers.customPreviousPage === pageNumbers.activePage}
                rel='to'
              >
                &middot;&middot;&middot;
              </PaginationItem>
            )}
  
            {pageNumbers.navigation.map((navigationNumber) => {
              const isFirstOrLastPage = navigationNumber === pageNumbers.firstPage || navigationNumber === pageNumbers.lastPage
  
              return isFirstOrLastPage ? null : (
                <PaginationItem
                  label={`Goto page ${navigationNumber}`}
                  key={navigationNumber}
                  rel='to'
                  active={navigationNumber === pageNumbers.activePage}
                  onClick={() => updateActivePage(navigationNumber)}
                >
                  {navigationNumber?String(navigationNumber):'0'}
                </PaginationItem>
              )
            })}
  
            {pageNumbers.customNextPage && (
              <PaginationItem 
              label={`Goto page ${pageNumbers.customNextPage}`}
              onClick={() => updateActivePage(pageNumbers.customNextPage)} 
              active={pageNumbers.customNextPage === pageNumbers.activePage}
              rel='to'>
                &middot;&middot;&middot;
              </PaginationItem>
            )}
  
            {pageNumbers.firstPage !== pageNumbers.lastPage && (
              <PaginationItem
                label={`Goto last page ${pageNumbers.lastPage}`}
                active={pageNumbers.lastPage === pageNumbers.activePage}
                onClick={() => updateActivePage(pageNumbers.lastPage)}
                rel='last'
              >
                {pageNumbers.lastPage?String(pageNumbers.lastPage):'0'}
              </PaginationItem>
            )}
  
            <PaginationItem
              label={`Goto next page ${pageNumbers.nextPage}`}
              rel="next"
              active={pageNumbers.nextPage === pageNumbers.activePage}
              onClick={() => updateActivePage(pageNumbers.nextPage)}
              className="pagi-item "
            >
              &rsaquo;
            </PaginationItem>
  
            <PaginationItem
              label={`Goto last page ${pageNumbers.lastPage}`}
              rel="last"
              active={false}
              className="pagi-item "
              onClick={() => updateActivePage(pageNumbers.lastPage)}
            >
              &raquo;
            </PaginationItem>
          </ul>
        </nav>
    )
  }

export default Pagination