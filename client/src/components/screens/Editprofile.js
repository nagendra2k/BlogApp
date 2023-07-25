import { useState, useEffect, useContext } from "react";
import { useNavigate} from "react-router-dom";
import { userContext } from '../../App'
import M from "materialize-css";

const Editprofile = () => {

    const {state, dispatch} = useContext(userContext);

    const [name,setName] = useState(state?state.name:'');
    const [imageURL,setImageURL] = useState(state?state.photo:'');
    const [image,setImage] = useState('');

    const navigate = useNavigate();
    
    useEffect(() => {
        const formData = new FormData();
            formData.append("file", image);
            formData.append("upload_preset", "Blog-app");
            formData.append("cloud_name", "hari03cloud")
            fetch('https://api.cloudinary.com/v1_1/hari03cloud/image/upload', {
                method: 'post',
                body: formData 
            }).then(res => res.json())
            .then(data => setImageURL(data.url))
            .catch(err => console.log(err));
    }, [image]);

    const uploadData = () => {
        console.log(name);
        if(image&&imageURL){
            fetch('/editprofile',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer '+localStorage.getItem('jwt')
                },
                body: JSON.stringify({
                    name,
                    image: imageURL
                })
            }).then(res => res.json())
            .then(data => {
                if(data.error){
                    M.toast({html: data.error, displayLength: '800', classes: '#e53935 red darken-1'});
                    if(data.type=='1'){
                        navigate('/signin');
                    }
                }else{
                    M.toast({html: data.success, displayLength: '800', classes: '#64dd17 light-green accent-4'});
                    localStorage.setItem('user',JSON.stringify(data.user));
                    dispatch({type: 'USER',payload: data.user})
                    navigate('/profile');
                }
            })
        
        }
    }

    return (
        <div className="my-card">
            <div className="card auth-card">
                <h4>Edit Profile</h4>
                <input type="text" placeholder="Edit Name" value={name} onChange={(e)=>setName(e.target.value)}/>
                <div className="file-field input-field">
                    <div className="btn" value={image} onChange={(e)=>setImage(e.target.files[0])}>
                        <span>Upload Profile Pic</span>
                        <input type="file" />
                    </div>
                    <div className="file-path-wrapper">
                        <input className="file-path validate" type="text" />
                    </div>
                </div>
                <button className="btn waves-effect waves-light" onClick={() => uploadData()}>Submit</button>
            </div>
        </div>
    );
}
 
export default Editprofile;