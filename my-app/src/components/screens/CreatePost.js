import React from "react"

const CreatePost = () => {
    return (
        <div className="card input-field"
        style={{
            margin: "30px auto",
            maxWidth: "500px",
            padding: "20px",
            textAlign: "center"
        }}
        >
            <input type="text" placeholder="Title"></input>
            <input type="text" placeholder="Body"></input>
            <div className="file-field input-field">
                <div className="btn #b71c1c red darken-4">
                    <span>Upload image</span>
                    <input type="file" />
                </div>
                <div className="file-path-wrapper">
                    <input className="file-path validate" type="text" />
                </div>
            </div>
            <button className="btn waves-effect waves-light #b71c1c red darken-4">Submit Post
             </button>
        </div>
    )
}

export default CreatePost