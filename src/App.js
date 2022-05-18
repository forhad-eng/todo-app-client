import { Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import AddTask from './Pages/Home/AddTask'
import Home from './Pages/Home/Home'
import MyTask from './Pages/Home/MyTask'
import Login from './Pages/Login/Login'
import RequireAuth from './Pages/Login/RequireAuth'
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
                <Route
                    path="/add-task"
                    element={
                        <RequireAuth>
                            <AddTask />
                        </RequireAuth>
                    }
                />
                <Route
                    path="/my-task"
                    element={
                        <RequireAuth>
                            <MyTask/>
                        </RequireAuth>
                    }
                />
            </Routes>
            <ToastContainer />
        </div>
    )
}

export default App
