import { LayoutDashboard, PackageCheck, Shirt } from "lucide-react"
import { ShieldUser } from 'lucide-react'
import React, { Fragment } from 'react'
import { useNavigate } from 'react-router-dom'
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTitle } from "../ui/sheet"

const adminSidebarMenuItems = [
  {
      id : 'dashboard',
      label : 'Dashboard',
      path : '/admin/dashboard',
      icon : <LayoutDashboard />
  },
  {
      id : 'products',
      label : 'Products',
      path : '/admin/products',
      icon : <Shirt />
  },
  {
      id : 'orders',
      label : 'Orders',
      path : '/admin/orders',
      icon : <PackageCheck />
  },
]

const MenuItems = ({setOpen}) =>{

  const navigate = useNavigate();

  return <nav className='mt-8 flex-col flex gap-2'>
    {
      adminSidebarMenuItems.map((item) => (
        <div 
          key={item.id} 
          onClick={()=> {
            navigate(item.path)
            setOpen ? setOpen(false) : null
          }} 
          className='flex font-medium cursor-pointer items-center gap-2 rounded-md px-3 py-2 text-muted-foreground hover:bg-muted hover:text-foreground'>{item.icon} <span>{item.label}</span>
        </div>
        ))
    }
  </nav>
}


const AdminSidebar = ({open, setOpen}) => {
  const navigate = useNavigate();

  return <Fragment>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="left" className='w-64'>
          <div className="flex flex-col h-full">
            <SheetHeader className='border-b'>
              <SheetTitle className='flex gap-2'>
                <ShieldUser size={30} />
                <h1 className='text-xl font-bold'>Admin Panel</h1>
              </SheetTitle>
            </SheetHeader>
            <MenuItems setOpen={setOpen}/>
          </div>
        </SheetContent>
      </Sheet>
      <aside className='hidden w-64 flex-col border-r bg-background p-6 lg:flex'>
        <div onClick={()=> navigate('/admin/dashboard')} className='flex cursor-pointer items-center gap-2'>
          <ShieldUser size={30} />
          <h1 className='text-xl font-bold'>Admin Panel</h1>
        </div>
        <MenuItems />
      </aside>
    </Fragment>
}

export default AdminSidebar