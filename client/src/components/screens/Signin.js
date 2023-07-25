import { useState, useContext } from "react";
import { Link, useNavigate} from "react-router-dom";
import M from "materialize-css";
import {userContext} from '../../App'
 
const Signin = () => {
    const {state,dispatch} = useContext(userContext);
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const navigate = useNavigate();
    const clearAttributes = () => {
        setEmail('');
        setPassword('');
    }

    const isEmail = (email) => {
        var regexp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return regexp.test(String(email).toLowerCase());
    }
    
    const postData = () => {
        if(!isEmail(email)){
            M.toast({html: 'Invalid Email', displayLength: '800', classes: '#e53935 red darken-1'});
            clearAttributes();
            return;
        }
        fetch('/signin',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
                password
            })
        }).then(res => res.json())
        .then(data => {
            if(data.error){
                M.toast({html: data.error, displayLength: '800', classes: '#e53935 red darken-1'});
                clearAttributes();
            }else{
                localStorage.setItem('jwt',data.token);
                localStorage.setItem('user',JSON.stringify(data.user));
                dispatch({type:'USER', payload:data.user});
                M.toast({html: data.success, displayLength: '800', classes: '#64dd17 light-green accent-4'});
                navigate('/');
            }
        })
        
    }

    return (
        <div className="my-card">
            <div className="card auth-card">
                <h2>Blogg</h2>
                <input type="email" placeholder="Email" value={email} onChange={(e)=>setEmail((e.target.value).toLowerCase())}/>
                <input type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
                <button className="btn waves-effect waves-light" onClick={() => postData()}>Login</button>
                <h5>
                    <Link to="/signup">Don't have an account?</Link>
                </h5>
            </div>
        </div>
    );
}
 
export default Signin;