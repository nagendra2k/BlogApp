import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { userContext } from "../../App";
import { Link, useNavigate} from "react-router-dom";
import M from "materialize-css";


const BlogDetail = () => {
    
    const navigate = useNavigate();

    const {state,dispatch} = useContext(userContext);

    const [isliked,setIsliked] = useState('0');
    const [blog,setBlog] = useState('');
    const [comment,setComment] = useState('');

    const {id} = useParams();
    const url = `/blogdetail/${id}`;

    useEffect(() => {
        fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer '+localStorage.getItem('jwt')
            },
        }).then(res => res.json())
        .then(result => {
            setBlog(result);            
        });        
    }, [])    

    useEffect(() => {
        if(blog){
            blog.likes.map(item => {
                if(item==state._id){setIsliked('1');}
            })
        }
    }, [blog])
    
    const str = {like: 'like', unlike: 'unlike'};
    
    const likefunc = (id) => {
        var temp;
        if(isliked=='0'){
            temp = str.like;
            setIsliked('1');
        }else{
            temp = str.unlike;
            setIsliked('0');
        }
        fetch(`/${temp}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+localStorage.getItem('jwt')
            },
            body: JSON.stringify({
                BlogId: id,
            })
        }).then(res => res.json())
        .then(result => setBlog(result));        
    }

    const makeComment = () => {        
            fetch('/comment', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer '+localStorage.getItem('jwt')
                },
                body: JSON.stringify({
                    text: comment,
                    BlogId: id,
                })
            }).then(res => res.json())
            .then(result => setBlog(result));
            setComment('');
    } 

    return (
        <div className="grid-container-details">
            <div className="card col s7">
                <div className="card-image" style={{
                    height: '400px',
                }}>
                    <img src={blog?blog.photo:'#'} />                
                </div>
                <div className="card-content">                  
                    <i class="small material-icons" style={{cursor:'pointer', color:isliked=='0'?'black':'red'}} onClick = {() => {likefunc(id)}}>thumb_up</i>
                    <p>{blog?blog.likes.length:''} Like</p>
                    <h6>Author: {blog?blog.postedBy.name:'Loading'}</h6>
                    <h4>{blog?blog.title:'Loading...'}</h4>
                    <h5>{blog?blog.description:'Loading...'}</h5>
                    <p>{blog?blog.content:'Loading...'}</p>
                </div>
            </div>  
            <div className="card col s3">
                <div>
                    <h4 style={{padding: '10px'}}>Comments</h4>
                    {
                        blog&&blog.comments.map(record => {
                            return(
                                <h6 style={{padding: '10px'}}><span style={{fontWeight:"500"}}>{record.postedBy.name}: </span>{record.text}</h6>
                            )
                        })
                    }
                </div>
                <div>
                    <div className="input-field col s12" style={{margin:"0px 10px"}}>
                        <i className="material-icons prefix">mode_edit</i>
                        <textarea id="icon_prefix2" className="materialize-textarea" value={comment} onChange={(e)=>setComment(e.target.value)}></textarea>
                        <label for="icon_prefix2">Add Comment</label>
                    </div>
                    <button className="btn waves-effect waves-light" style={{borderRadius:"20px", margin:"0px 10px"}} onClick={() => makeComment()}>Submit</button>
                </div>
            </div>  
        </div>         
    )
}
 
export default BlogDetail;