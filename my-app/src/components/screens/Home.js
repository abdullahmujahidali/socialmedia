import React, { useState, useEffect } from "react"

const Home = () => {
    const [data, setData] = useState([])
    useEffect(() => {
        fetch("/allpost", {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            }
        }).then(res => res.json())
            .then(result => {
                setData(result)
            })
    }, [])
    return (
        <div className="home">
            {
                data.map(item => {
                    return (
                        <div className="card home-card" key={item._id}>
                            <h5>{item.postedBy.name}</h5>
                            <div className="card-image">
                                <img src={item.photo} alt="post"></img>
                            </div>
                            <div className="card-content">
                                <i className="material-icons" style={{ color: "red" }}>whatshot</i>
                                <h4>{item.title}</h4>
                                <p>{item.body}</p>
                                <input type="text" placeholder="Add a comment" />
                            </div>
                        </div>
                    )
                })
            }


        </div>
    )
}

export default Home
