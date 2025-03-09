import React from 'react'
import { Button } from '../ui/button'
import { LogOut, Menu } from 'lucide-react'
import { useDispatch } from 'react-redux'
import { logoutUser } from '@/store/auth-slice/authSlice'

const AdminHeader = ({setOpen}) => {

  const dispatch = useDispatch();

  const handleLogout = () =>{
    console.log('logout')
    dispatch(logoutUser()).then((data)=> console.log(data))
  }

  return <header className='flex item-center justify-between px-4 py-3 bg-background border-b'>
    <Button onClick={()=>setOpen(true)} className='lg:hidden sm:block'>
      <Menu />
      <span className='sr-only'>Toggle Menu</span>
    </Button>
    <div className="flex flex-1 justify-end">
      <Button onClick={handleLogout} className='inline-flex gap-2 items-center rounded px-4 py-2 text-sm font-medium shadow'>
        <LogOut />Logout
      </Button>
    </div>
  </header>
}

export default AdminHeader