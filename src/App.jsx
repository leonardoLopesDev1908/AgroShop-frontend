import {Route, 
        RouterProvider, 
        createBrowserRouter, 
        createRoutesFromElements
    } from "react-router-dom" 
import RootLayout from "./component/layout/RootLayout"
import Home from './home/Home'
import Profile from './Profile'


function App() {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout/>}>
        <Route index element={<Home/>}/>
        <Route path="/conta" element={<Profile/>}/>
      </Route>
    )
  )

  return (
    <RouterProvider router={router}>

    </RouterProvider>
  )
}

export default App
