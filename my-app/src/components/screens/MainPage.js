import React,{Fragment} from "react"
import {Link} from "react-router-dom"
const MainPage=()=>{
    return(
<Fragment>
    <body>
        <header>
          
            <div className="content">
                <div className="container">
                    <h1 className="h1c">PAPARAZZO</h1>
                    <p>TAP INTO THE INTERNET CULTURE </p>
                    <h6 color="#fff">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                    &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                    OF THE FIRST SOCIAL MEME HUB </h6>
                    <i class="fas fa-user-alien"></i>
                    <div className="mov">
                    <Link class="black lighten-2 btn" to="/signup"><i class="tiny material-icons">face</i> JOIN US</Link>
                    </div>
                </div>
            </div>
        </header>

        <footer>
           
                <center>
                
                    <strong><a href="https://www.facebook.com/m.abdullahmujahid" class="fa fa-facebook" style={{fontSize:"36px"}} ></a></strong> &nbsp; &nbsp;
                    <strong><a href="http://www.github.com/abdullahmujahidali"  class="fa fa-github-alt" style={{fontSize:"36px"}} ></a></strong> &nbsp; &nbsp;
                    <strong><a href="http://www.instagram.com/abdullahmujahidali"  class="fa fa-instagram"  style={{fontSize:"36px"}}></a></strong> &nbsp; &nbsp;
                    <strong><a href="https://www.youtube.com/channel/UC2xO3s_j_JkY2hC_737ggcQ?view_as=subscriber"  class="fa fa-youtube-play"  style={{fontSize:"36px"}}></a></strong> &nbsp; &nbsp;
                    <strong><a href="https://www.twitter.com/abdulladgaf"  class="fa fa-twitter"  style={{fontSize:"36px"}}></a></strong> &nbsp; &nbsp;


                    <br />
                    &copy; Abdullah Mujahid 2020
                   <hr />
                </center>
            
        </footer>
    </body>
</Fragment>
    )
}
export default MainPage
