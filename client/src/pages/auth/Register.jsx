import CommonForm from '@/components/common/form'
import { registerFormControl } from '@/config'
import { registerUser } from '@/store/auth-slice/authSlice'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from "sonner"

const initialState = {
  userName : '',
  email : '',
  password : ''
}

const Register = () => {

  const [formData,setFormData] = useState(initialState)
  const dispatch = useDispatch()
  const navigate = useNavigate()


  function onSubmit (e) {
    e.preventDefault();
    dispatch(registerUser(formData)).then((data)=> {
      if(data?.payload?.success) {
        toast(data?.payload?.message);
        navigate('/auth/login');
      };
    })
    console.log(formData)
  }

  return (
    <div className='mx-auto w-full max-w-md space-y-6'>
      <div className="text-center">
         <h2 className='text-3xl font-bold tracking-tight text-foreground'>Create new account</h2>
        <p className='mt-2'>Already have an account ?<Link className='font-medium ml-2 text-primary hover:underline' to='/auth/login'>Login</Link></p>
        <CommonForm formControls={registerFormControl} buttonText={'Sign Up'} formData={formData} setFormData={setFormData} onSubmit={onSubmit}/>
      </div>
    </div>
  )
}

export default Register