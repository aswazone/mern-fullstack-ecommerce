import ProductFilter from '@/components/shopping-view/Filter'
import ShoppingProductTile from '@/components/shopping-view/Product-tile'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuRadioGroup, DropdownMenuRadioItem } from '@/components/ui/dropdown-menu'
import { DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { sortOptions } from '@/config'
import { fetchAllFilteredProducts } from '@/store/shop/products-slice/productSlice'
import { ArrowUpDownIcon } from 'lucide-react'
import React, { useEffect, useState }  from 'react'
import { useDispatch, useSelector } from 'react-redux'

const ShoppingListing = () => {

  const dispatch = useDispatch();
  const {productList} = useSelector(state => state.shopProducts)
  const [filters,setFilters] = useState({});
  const [sort,setSort] = useState(null);

  const handleSort = (value) =>{
    console.log(value,'radio-sortBY')
    setSort(value)
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

  useEffect(()=>{
    setSort('price-lowtohigh');
    setFilters(JSON.parse(sessionStorage.getItem('filters')) || {})
  },[])

  useEffect(()=>{
    dispatch(fetchAllFilteredProducts())
  },[dispatch])

  console.log(productList)

  return (
    <div className='grid grid-cols-1 md:grid-cols-[300px_1fr] gap-6 p-4 md:p-6'>
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
              <ShoppingProductTile key={product?._id} product={product}/>
            )) : null
          }
        </div>
      </div>
    </div>
  )
}

export default ShoppingListing