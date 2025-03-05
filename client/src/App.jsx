import { Route, Routes } from "react-router-dom"
import AuthLayout from "./components/auth/Layout"
import Login from "./pages/auth/Login"
import Register from "./pages/auth/Register"
import AdminLayout from "./components/admin-view/Layout"
import AdminDashboard from "./pages/admin-view/Dashboard"
import AdminFeatures from "./pages/admin-view/Features"
import AdminProducts from "./pages/admin-view/Products"
import AdminOrders from "./pages/admin-view/Orders"
import ShoppingLayout from "./components/shopping-view/Layout"
import PageNotFound from "./pages/not-found/PageNotFound"
import ShoppingHome from "./pages/shopping-view/Home"
import ShoppingListing from "./pages/shopping-view/Listing"
import ShoppingAccount from "./pages/shopping-view/Account"
import ShoppingCheckout from "./pages/shopping-view/Checkout"
import CheckAuth from "./components/common/check-auth"
import UnAuthPage from "./pages/unauth-page/UnAuthPage"


function App() {

  const isAuthenticated = true;
  const user = {
    name:'aswin',
    role: 'admin'
  }

  return (
   <div className="flex flex-col overflow-hidden bg-white">
      {/* Header components */}
      <Routes>
        <Route path="/auth" element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            <AuthLayout/> 
          </CheckAuth>
        }>
          <Route path="login" element={<Login/>}/>
          <Route path="register" element={<Register/>}/>
        </Route>
        <Route path="/admin" element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            <AdminLayout/> 
          </CheckAuth>
        }>
          <Route path="dashboard" element={<AdminDashboard />}/>
          <Route path="products" element={<AdminProducts />}/>
          <Route path="orders" element={<AdminOrders />}/>
          <Route path="features" element={<AdminFeatures />}/>
        </Route>
        <Route path="/shop" element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            <ShoppingLayout/> 
          </CheckAuth>
        }>
          <Route path="home" element={<ShoppingHome/>} />
          <Route path="listing" element={<ShoppingListing/>} />
          <Route path="checkout" element={<ShoppingCheckout/>} />
          <Route path="account" element={<ShoppingAccount/>} />

        </Route>
          <Route path="*" element={<PageNotFound/>} />
          <Route path="/unauth-page" element={<UnAuthPage/>} />
      </Routes>
   </div>
  )
}

export default App
