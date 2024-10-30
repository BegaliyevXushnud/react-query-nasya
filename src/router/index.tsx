import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import App from "../App";
import loadable from '@loadable/component';
 
const SignIn = loadable(() => import('../modules/auth/pages/sign_in'));
const SignUp = loadable(() => import('../modules/auth/pages/sign_up'));
const Layout = loadable(() => import('../modules/layout'))
const Product = loadable(() => import('../modules/product/pages'))


const index = () => {
    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route path='/' element={<App/>}>
                <Route index element={<SignIn/>} />
                <Route path="sign-up" element={<SignUp/>} />
                <Route path="layout" element={<Layout/>}>
                <Route index element={<Product/>} >

                </Route>
                </Route>
                <Route />
            </Route>
        )
    )
  return (
    <RouterProvider router={router} />
  )
}

export default index
