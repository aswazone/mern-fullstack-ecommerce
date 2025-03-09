import { LogOut, Menu, Pyramid, ShoppingCart, User } from 'lucide-react'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet'
import { Button } from '../ui/button'
import { useDispatch, useSelector } from 'react-redux'
import {shoppingViewHeaderMenuItems} from '../../config/index'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu'
import { Avatar, AvatarFallback } from '../ui/avatar'
import { DropdownMenuLabel } from '@radix-ui/react-dropdown-menu'
import { logoutUser } from '@/store/auth-slice/authSlice'


const MenuItems = ()=>{
  console.log(shoppingViewHeaderMenuItems)
  return <nav className='flex flex-col mb-3 lg:mb-0 lg:items-center gap-6 lg:flex-row'>
    {
      shoppingViewHeaderMenuItems.map(item => <Link className='text-sm font-medium' to={item.path} key={item.id}>{item.label}</Link>)
    }
  </nav>
}


const HeaderRightContent = () => {

  const {user} = useSelector(state => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () =>{
    dispatch(logoutUser());
  }

  return (
    <div className='flex lg:items-center lg:flex-row flex-col gap-4'>
      <Button variant='outline' size='icon'>
        <ShoppingCart className='h-6 w-6'/>
        <span className="sr-only">User cart</span>
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className='bg-black'>
            <AvatarFallback className='bg-black text-white font-extrabold'>{user?.userName[0].toUpperCase()}</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent side='left' className='w-56'>
          <DropdownMenuLabel><span className='text-xs'>Logged in as</span> {user?.userName.slice(0,1).toUpperCase() + user?.userName.slice(1)}</DropdownMenuLabel>
          <DropdownMenuSeparator/>
          <DropdownMenuItem onClick={()=> navigate('/shop/account')}>
            <User className='mr-2 h-4 w-4'/>
            Account
          </DropdownMenuItem>
          <DropdownMenuSeparator/>
          <DropdownMenuItem onClick={handleLogout}>
            <LogOut className='mr-2 h-4 w-4 text-red-500'/>
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}


const ShoppingHeader = () => {


  return (
    <header className='sticky top-0 z-40 w-full border-b bg-background'>
      <div className="flex h-16 items-center justify-between px-4 md:px-6">
        <Link to='/shop/home' className='flex items-center gap-2'>
          <Pyramid className='h-6 w-6'/>
          <span className="font-bold">Heaven</span>
        </Link>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant='outline' size='icon' className='lg:hidden'>
              <Menu/>
              <span className='sr-only'>Toggle header menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side='left' className='w-full max-w-xs p-5'>
            <MenuItems />
            <HeaderRightContent/>
          </SheetContent>
          <div className="hidden lg:block">
              <MenuItems />
          </div>
          <div className="hidden lg:block">
            <HeaderRightContent/>
          </div>
          
        </Sheet>
      </div>
    </header>
  )
}

export default ShoppingHeader