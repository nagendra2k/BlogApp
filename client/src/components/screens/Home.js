import { useEffect, useState } from "react";


const Home = () => {

    const [data,setData] = useState('');
    useEffect(()=>{
        fetch('/allblogs', {
            method: 'get',
            headers: {
                'Authorization': 'Bearer '+localStorage.getItem('jwt')
            },
        }).then(res => res.json())
        .then(result => {
            setData(result);
        });
    },[])


    return (
        <div className="grid-container">
            {
                data&&data.map(item => {
                    return(
                        <div className="card" >
                            <div className="card-image" style={{
                                height: "250px",
                            }}>
                                <img src={item.photo} />
                                <span className="card-title">{item.title}</span>
                            </div>
                            <div className="card-content">
                                <p>{item.description}</p>
                            </div>
                            <div className="card-action">
                                <a href={`/blogdetail/${item._id}`}>Read More</a>
                            </div>
                        </div>
                    )
                })
            }            
        </div>
    );
}
 
export default Home;