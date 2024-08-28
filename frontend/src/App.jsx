import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { SignUp } from './pages/SignUp'
import { SignIn } from './pages/SignIn'
import { Dashboard } from './pages/Dashboard'
import { SendMoney } from './pages/SendMoney'
import { HomePage } from './pages/HomePage'
import { Err } from './pages/404'

function App() {

  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={
          <HomePage></HomePage>
        }>
        </Route>
        <Route path='/signup' element={
          <SignUp></SignUp>
        }></Route>
        <Route path='/signin' element={
          <SignIn></SignIn>
        }></Route>
        <Route path='/dashboard' element={<Dashboard></Dashboard>}></Route>
        <Route path='/send' element={<SendMoney></SendMoney>}></Route>
        <Route path="/*" element={<Err />} />
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
