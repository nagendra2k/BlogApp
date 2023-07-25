import { useEffect, useState } from "react";
import { Link, useNavigate} from "react-router-dom";
import M from "materialize-css";

const CreateBlog = () => {
    const [title,setTitle] = useState('');
    const [description,setDescription] = useState('');
    const [content,setContent] = useState('');
    const [imageURL,setImageURL] = useState('');
    const [image,setImage] = useState('');
    
    const navigate = useNavigate();
    
    useEffect(() => {
        const formData = new FormData();
            formData.append("file", image);
            formData.append("upload_preset", "Blog-app");
            formData.append("cloud_name", "hari03cloud");
            fetch('https://api.cloudinary.com/v1_1/hari03cloud/image/upload', {
                method: 'post',
                body: formData 
            }).then(res => res.json())
            .then(data => setImageURL(data.url))
            .catch(err => console.log(err));
    }, [image]);
    
    const postData = () => {     
        if(imageURL){
            fetch('/createblog',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer '+localStorage.getItem('jwt')
                },
                body: JSON.stringify({
                    title,
                    description,
                    content,
                    imageURL
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
                    navigate('/');
                }
            })
        }        
    }

    return (
        <div className="card create-blog" style={{
            margin: "30px auto",
            maxWidth: "500px",
            padding: "20px"
        }}>
            <input type="text" placeholder="Title" value={title} onChange={(e)=>setTitle(e.target.value)}/>
            <input type="text" placeholder="Description" value={description} onChange={(e)=>setDescription(e.target.value)}/>
            <div className="input-field col s12">
                <i className="material-icons prefix">mode_edit</i>
                <textarea id="textarea1" className="materialize-textarea" value={content} onChange={(e)=>setContent(e.target.value)}></textarea>
                <label for="textarea1">Textarea</label>
            </div>
            <div className="file-field input-field">
                <div className="btn" value={image} onChange={(e)=>setImage(e.target.files[0])}>
                    <span>Upload Image</span>
                    <input type="file" />
                </div>
                <div className="file-path-wrapper">
                    <input className="file-path validate" type="text" />
                </div>
            </div>
            <button className="btn" style={{margin:"0px auto"}} onClick={() => postData()}>Submit Blog</button>
        </div>
    );
}
 
export default CreateBlog;