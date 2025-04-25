import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom'
import './index.css'



const Header = () => {
    const navigate = useNavigate()
    const onLogOut = () => {
        Cookies.remove('jwt_token')
        navigate('/login')
    }
    return(
        <nav className='header-bg-container'>
            <ul className='nav-item-list-container'>
                <Link to="/" className='nav-link'><li className='nav-item'>Home</li></Link>
                <Link to="/login" className='nav-link'><li className='nav-item'>Login</li></Link>
                <li className='nav-item'><button className='btn btn-primary' type="button" onClick={onLogOut}>Logout</button></li>
            </ul>
        </nav>
    )
}

export default Header