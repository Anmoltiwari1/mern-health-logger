import { useState } from 'react'
import { BrowserRouter,Navigate,Route,Routes } from 'react-router-dom'
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';


import './App.css'

function App() {
  const [count, setCount] = useState(0);

  const PrivateRoute=({children})=>{
    const isLoggedIn=localStorage.getItem("token");
    return isLoggedIn ? children:<Navigate to="/login"/>
  }


  return (
    <BrowserRouter>
    <Routes>
      <Route path='/'  element={<Home/>}/>
      <Route path='/signup'  element={<Signup/>}/>
      <Route path='/login' element={<Login/>}  />
      <Route path='/dashboard' element={<PrivateRoute><Dashboard/></PrivateRoute>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App
