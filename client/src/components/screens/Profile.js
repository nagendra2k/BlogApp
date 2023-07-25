import { useEffect, useState, useContext } from "react";
import { userContext } from '../../App'
import { Link, useNavigate} from "react-router-dom";
import M from "materialize-css";

const Profile = () => {

    const {state, dispatch} = useContext(userContext);
    const [myblogs,setMyBlogs] = useState('');

    const navigate = useNavigate();    

    useEffect(() => {
        fetch('/myblogs', {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer '+localStorage.getItem('jwt')
            },
        }).then(res => res.json())
        .then(result => setMyBlogs(result));
    }, [])

    const deleteBlog = (id) => {
        fetch(`/deleteblog/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': 'Bearer '+localStorage.getItem('jwt')
            },
        }).then(res => res.json())
        .then(data => {            
            if(data.error){
                M.toast({html: data.error, displayLength: '800', classes: '#e53935 red darken-1'});
                if(data.type=='1'){
                    navigate('/signin');
                }
            }else{
                const newData = myblogs.filter((blog) =>  blog._id !== data.id);
                setMyBlogs(newData);
                M.toast({html: data.success, displayLength: '800', classes: '#64dd17 light-green accent-4'});
            }
        })
    }
    
    return ( 
        <div style={{
            margin: '20px auto'
        }}>
            <div style={{
                display:"flex",
                justifyContent:"space-around",
                borderBottom: "2px solid black",
                padding: "10px",
                maxheight: "150px",
                maxWidth: "700px",
                margin:"auto",
                marginBottom: "20px",           
            }}>
                <div style={{
                    width:"180px",
                    height:"180px"
                }}>
                    <img src={state?state.photo:'#'} style={{
                        width:"100%",
                        height: "100%",
                        borderRadius:"50%"
                    }}/>
                </div>
                <div style={{
                    width:"70%",
                    height: "auto",
                    padding: "20px 50px"
                }}>
                    <h3>{state?state.name:'Loading...'}</h3>
                    <div style={{
                        display:"flex",
                        justifyContent:"space-between",
                        width:"100%"
                    }}>
                        <h6>{myblogs?myblogs.length:'**'} Blogs</h6>
                        <h6>{state?state.popularity:'**'} popularity</h6>
                    </div>
                </div>
                <span style={{float: 'right', cursor: 'pointer'}}><a href="/editprofile"><i class="material-icons">edit</i></a></span>
                              
            </div>
            <div style={{
                padding: "10px",
                maxWidth: "700px",
                margin:"auto"

            }}>
                <div style={{
                    padding:"20px"
                }}>
                    <h5>My Blogs</h5>
                </div>
                {
                    myblogs&&myblogs.map(blog => {
                        return (
                            <div style={{
                                display:"flex",
                                borderBottom: "1px solid gray",
                                padding: "10px",
                                height: "120px",
                                Width: "100%",
                                margin:"auto",
                                marginBottom: "10px",
                                borderRadius:"10px"
                            }} >
                                <div style={{
                                    width:"20%",
                                    height:"auto",
                    
                                }}>
                                    <img src={blog.photo} />
                                </div>
                                <div style={{
                                    padding:"10px 20px",
                                    width:"80%"
                                }}>
                                    <h6>{blog.title}</h6>
                                    <p>{blog.description}</p>
                                </div>                                
                                <span style={{float: 'right', cursor: 'pointer'}}><a href={`/blogdetail/${blog._id}`}><i class="material-icons">visibility</i></a></span>  
                                <span style={{float: 'right', cursor: 'pointer'}} onClick={() => deleteBlog(blog._id)}><i class="material-icons">delete</i></span>
                            </div> 
                        )
                    })
                }
            </div>
            
        </div>
    );
}
 
export default Profile;