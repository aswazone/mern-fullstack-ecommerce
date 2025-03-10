import { filterOptions } from '@/config';
import React, { Fragment } from 'react'
import { Label } from '../ui/label';
import { Checkbox } from '../ui/checkbox';
import { Separator } from '../ui/separator';

const ProductFilter = ({filters , handleFilter}) => {
  return (
    <div className='bg-background rounded-lg shadow-sm'>
        <div className="p-4 border-b">
            <h2 className='text-lg font-extrabold'>Filters</h2>
        </div>
        <div className="p-4 space-y-4">
            {
                Object.keys(filterOptions).map(item => (
                <Fragment key={item}>
                    <div>
                        <h3 className='text-base font-bold'>{item}</h3>
                        <div className="grid gap-2 mt-2">
                            {
                                filterOptions[item].map(option => <Label key={option.id} className='flex items-center gap-2'> 
                                    <Checkbox 
                                        checked={
                                            filters && 
                                            Object.keys(filters).length > 0 &&
                                            filters[item] && 
                                            filters[item].indexOf(option.label) > -1
                                        } 
                                        onCheckedChange={()=>handleFilter(item, option.label)}
                                    /> {option.label}</Label>)
                            }
                        </div>
                    </div>
                    <Separator />
                </Fragment>
            ))}
        </div>
    </div>
  )
}

export default ProductFilter;