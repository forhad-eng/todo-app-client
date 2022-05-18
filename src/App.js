import { Route, Routes } from 'react-router-dom'
import Home from './Pages/Home/Home'
import Login from './Pages/Login/Login'
import SignUp from './Pages/Login/SignUp'
import Navbar from './Pages/Shared/Navbar'

function App() {
    return (
        <div className="max-w-7xl mx-auto px-10">
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
            </Routes>
        </div>
    )
}

export default App
