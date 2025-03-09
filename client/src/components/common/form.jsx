import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Input } from '../ui/input';
import { Label } from '../ui/label'
import React from 'react'
import { Textarea } from '../ui/textarea';
import { Button } from '../ui/button';
const CommonForm = ({formControls ,formData, setFormData , onSubmit ,buttonText ,isBtnDisabled}) => {

    function renderInputsByComponentType (getControlItem){
        // console.log('form',getControlItem)

        let element = null;
        const value = formData[getControlItem.name] || '';

        // console.log(value , getControlItem.componentType)

        switch (getControlItem.componentType) {
            case 'input' :
                // console.log(getControlItem.type)
                if(getControlItem.type === 'password') {
                    element = (<Input name={getControlItem.name} placeholder={getControlItem.placeholder} id={getControlItem.name} type={getControlItem.type} value={value} onChange={(event)=>setFormData({ ...formData,[getControlItem.name]:event.target.value})} autoComplete='false' />);
                }else{
                    element = (<Input name={getControlItem.name} placeholder={getControlItem.placeholder} id={getControlItem.name} type={getControlItem.type} value={value} onChange={(event)=>setFormData({ ...formData,[getControlItem.name]:event.target.value})} />);
                }
                break;
            case 'select' :
                element = (
                    <Select onValueChange={(value)=> setFormData({...formData, [getControlItem.name] : value})} value={value}>
                        <SelectTrigger className='w-full'>
                            <SelectValue placeholder={getControlItem.label}></SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                            {
                                getControlItem.options && 
                                getControlItem.options.length > 0 ?
                                getControlItem.options.map(optionItem => <SelectItem key={optionItem.id} value={optionItem.label}>{optionItem.label}</SelectItem> ) : null
                            }
                        </SelectContent>
                    </Select>
                )
                break;
            case 'textarea':
                element = (<Textarea name={getControlItem.name} placeholder={getControlItem.placeholder} id={getControlItem.name}  value={value} onChange={(event)=>setFormData({ ...formData,[getControlItem.name]:event.target.value})} />)
                break;

            default :
                element = (<Input name={getControlItem.name} placeholder={getControlItem.placeholder} id={getControlItem.name} type={getControlItem.type}  value={value}/>);      
                break;
        }

        return element
    }

  return (
    <form onSubmit={onSubmit}>
        <div className="flex flex-col gap-3 mb-2">
            {
                formControls.map(controlItem => <div className='grid w-full gap-1.5 mb-2' key={controlItem.name}>
                    <Label className='mb-1'>{controlItem.label}</Label>
                    {renderInputsByComponentType(controlItem)}
                </div>)
            }
        </div>
        <Button disabled={isBtnDisabled} type='submit' className='mt-2 w-full'>{buttonText || 'Submit'}</Button>
    </form>
  )
}

export default CommonForm