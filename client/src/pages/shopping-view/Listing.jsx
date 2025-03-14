import ProductFilter from '@/components/shopping-view/Filter'
import ShoppingProductTile from '@/components/shopping-view/Product-tile'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuRadioGroup, DropdownMenuRadioItem } from '@/components/ui/dropdown-menu'
import { DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { sortOptions } from '@/config'
import { fetchAllFilteredProducts, fetchProductDetails } from '@/store/shop/products-slice/productSlice'
import { ArrowUpDownIcon } from 'lucide-react'
import React, { useEffect, useState }  from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom'
import ProductDetailsDialog from './Product-details'

const ShoppingListing = () => {

  const dispatch = useDispatch();
  const {productList , productDetails} = useSelector(state => state.shopProducts)
  const [filters,setFilters] = useState({});
  const [sort,setSort] = useState(null);
  const [searchParams , setSearchParams] = useSearchParams();
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);


  const handleSort = (value) =>{
    console.log(value,'radio-sortBY')
    setSort(value)
  }


  function createSearchParamsHelper(filterParams){
    const queryParams = [];

    for(const [key, value] of Object.entries(filterParams)){

      if(Array.isArray(value) && value.length > 0){
        const paramValue = value.join(',');

        queryParams.push(`${key}=${encodeURIComponent(paramValue)}`)
      }
    }
    console.log(queryParams)
    return queryParams.join('&')
  }



  //-----filter logic----
  const handleFilter = ( sectionId, currentOption) =>{
    console.log(sectionId,currentOption)
    let copyFilters = {...filters};
    const indexOfCurrentSection = Object.keys(copyFilters).indexOf(sectionId) //-1 tharum ingane oru section arrayil illengi
    console.log(indexOfCurrentSection,'section-index')

    if(indexOfCurrentSection === -1) {
      copyFilters = {
        ...copyFilters,
        [sectionId] : [currentOption]
      }
    }
    else {
      const indexOfCurrentOption = copyFilters[sectionId].indexOf(currentOption)
      console.log(indexOfCurrentOption);

      if(indexOfCurrentOption === -1) {
        copyFilters[sectionId].push(currentOption);
      }else{
        copyFilters[sectionId].splice(indexOfCurrentOption, 1)
      }
    }

    console.log(filters)
    setFilters(copyFilters)
    sessionStorage.setItem('filters',JSON.stringify(copyFilters));
  }


  //--- get one product Detail ---

  const handleGetProductDetails = (productId) => {
    console.log(productId);
    dispatch(fetchProductDetails(productId))
      .then((data)=> {
        console.log(data,'data')
      })
  }


  //---- setting URL params ----
  useEffect(()=>{
    if(filters && Object.keys(filters).length > 0){
      const createQueryString = createSearchParamsHelper(filters);
      setSearchParams(new URLSearchParams(createQueryString  ))
    }
  },[filters ,setSearchParams])


  //--- filter-retrive useEffect ---
  useEffect(()=>{
    setSort('price-lowtohigh');
    setFilters(JSON.parse(sessionStorage.getItem('filters')) || {})
  },[])

  // --- fetch products ---
  useEffect(()=>{
    if(filters !== null && sort !== null)
    dispatch(fetchAllFilteredProducts({filterParams : filters, sortParams : sort}))
  },[dispatch, sort, filters])

  useEffect(()=>{
    if(productDetails !== null)  setOpenDetailsDialog (true);

  },[productDetails])



  console.log(productList,searchParams,productDetails)




  return (
    <div className='grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6 p-4 md:p-6'>
      <ProductFilter filters={filters} handleFilter={handleFilter} />
      <div className="bg-background w-full rounded-lg shadow-sm">
        <div className="p-4 border-b flex items-center justify-between">
          <h2 className='text-lg font-extrabold'>All Products</h2>
          <div className="flex items-center gap-3">
            <span className='text-muted-foreground'> {productList?.length} Products</span>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                  <Button className='flex items-center gap-1' variant='outline' size='sm'>
                    <ArrowUpDownIcon className='h-4 w-4'/>
                    <span>Sort By</span>
                  </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align='end' className='w-[200px]'>
                <DropdownMenuRadioGroup value={sort} onValueChange={handleSort}>
                  {
                    sortOptions.map((option)=>(
                      <DropdownMenuRadioItem value={option.id} key={option.id}>{option.label}</DropdownMenuRadioItem>
                    ))
                  }
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
          {
            productList && productList.length > 0 ? 
            productList.map((product)=> (
              <ShoppingProductTile handleGetProductDetails={handleGetProductDetails} key={product?._id} product={product}/>
            )) : null
          }
        </div>
      </div>
      <ProductDetailsDialog open={openDetailsDialog} setOpen={setOpenDetailsDialog} productDetails={productDetails}/>
    </div>
  )
}

export default ShoppingListing