import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import {userContext} from '../App'

const Navbar = () => {
    const {state,dispatch} = useContext(userContext);

    const navigate = useNavigate();

    const userLogout = () => {
        localStorage.clear();
        dispatch({type:"CLEAR"});
        navigate('/signin');
    }

    const renderlist = () => {
        if(state){
            return [
                <li><a href="/profile">Profile</a></li>,
                <li><a href="/createBlog">New Blog</a></li>,
                <li><button className="btn #ff1744 red accent-3 " style={{borderRadius: '20px'}} onClick={() => userLogout()}>Logout</button></li>
            ];
        }else{
            return [
                <li><a href="/signin">Login</a></li>,
                <li><a href="/signup">Register</a></li>
            ];
        }
    }

    return(
        <nav>
            <div className="nav-wrapper white">
            <a href="/" className="brand-logo left">Blogg</a>
            <ul id="nav-mobile" className="right">
                {renderlist()}                
            </ul>
            </div>
        </nav>
    )
}

export default Navbar;