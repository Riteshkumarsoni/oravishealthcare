import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom'
import LoginPage from './components/LoginPage'
import UserRegisteration from './components/UserRegistration'
import DentistRegistaation from './components/DentistRegistration'
import ProtectedRoute from './components/ProtectedRoute'
import DentistDashboard from './components/DentistDashboard'
import UserDashboard from './components/UserDashboard'
import NotFound from './components/NotFound'
import Home from './components/Home'
import './App.css'

const App = () => (
    <Router>
        <Routes>
            <Route path='/' element={<ProtectedRoute><Home /></ProtectedRoute>} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/user/registration" element={<UserRegisteration />} />
            <Route path="/:userId/dashboard" element={<ProtectedRoute><UserDashboard /></ProtectedRoute>} />
            <Route path="/dentist/:dentistId/dashboard" element={<ProtectedRoute><DentistDashboard /></ProtectedRoute>} />
            <Route path="/dentist/registration" element={<DentistRegistaation />} />
            <Route path="/not-found" element={<NotFound />} />
            <Route path='*' element={<Navigate to="/not-found" />} />
        </Routes>
    </Router>
)

export default App