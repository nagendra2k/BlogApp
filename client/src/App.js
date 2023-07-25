import Navbar from './components/Navbar';
import './App.css'
import {BrowserRouter, Routes, Route, useNavigate, Switch} from "react-router-dom";
import Home from './components/screens/Home';
import Profile from './components/screens/Profile';
import Signin from './components/screens/Signin';
import Signup from './components/screens/Signup';
import CreateBlog from './components/screens/CreateBlog';
import BlogDetail from './components/screens/BlogDetail';
import Editprofile from './components/screens/Editprofile';
import { createContext, useContext, useEffect, useReducer } from 'react';
import {reducer, intialState} from './reducers/userReducer';

export const userContext = createContext();

const Routing = () => {
  const navigate = useNavigate();
  const {state,dispatch} = useContext(userContext);
  const user = JSON.parse(localStorage.getItem('user'));
  
  useEffect(() => {
    if(user){      
      dispatch({type: 'USER',payload: user});
    }else{
      navigate('/signin');
    }
  }, []);

  return(
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blogdetail/:id" element={<BlogDetail />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/editprofile" element={<Editprofile />} />
        <Route path="/createBlog" element={<CreateBlog />} />
    </Routes>
  );
}

function App() {  
  const [state, dispatch] = useReducer(reducer, intialState);
  return (
    <userContext.Provider value={{state, dispatch}}>
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path="/signup" element={<Signup />} />          
          <Route path="/signin" element={<Signin />} />
        </Routes>        
        <Routing/>
      </BrowserRouter>
    </userContext.Provider>
  );
}

export default App;
