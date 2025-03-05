import CommonForm from '@/components/common/form'
import { loginFormControl } from '@/config'
import { loginUser } from '@/store/auth-slice/authSlice'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { toast } from 'sonner'

const initialState = {
  email : '',
  password : ''
}

const Login = () => {

  const [formData,setFormData] = useState(initialState)
  const dispatch = useDispatch()

  function onSubmit (e) {
    e.preventDefault();
    dispatch(loginUser(formData)).then((data)=>{
      if(data?.payload?.success){
        toast(data?.payload?.message)

      }else{
        toast(data?.payload?.message)
      }
    })
    
    console.log(formData)
  }

  return (
    <div className='mx-auto w-full max-w-md space-y-6'>
      <div className="text-center">
         <h2 className='text-3xl font-bold tracking-tight text-foreground'>Sign in to your account</h2>
        <p className='mt-2'>Don't have an account ?<Link className='font-medium ml-2 text-primary hover:underline' to='/auth/register'>Register</Link></p>
        <CommonForm formControls={loginFormControl} buttonText={'Sign In'} formData={formData} setFormData={setFormData} onSubmit={onSubmit}/>
      </div>
    </div>
  )
}

export default Login