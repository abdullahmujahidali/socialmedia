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
                    <p>TAP INTO THE INTERNET CULTURE</p>
                    <i class="fas fa-user-alien"></i>
                    <div className="mov">
                    <Link class="black lighten-2 btn" to="/signup"><i class="tiny material-icons">face</i> JOIN US</Link>
                    </div>
                </div>
            </div>
        </header>

        <footer>
            <ul className="container">
                <li>
                    <strong><a href="#" class="fa fa-facebook"></a></strong>
                    <p>15 STreet Suburt Country 6000</p>
                </li>
                <li>
                    <strong>Phone</strong>
                    <p>+61 040 400 4000</p>
                </li>
                <li>
                    <strong>Email</strong>
                    <p>automotive@carsales.com.au</p>
                </li>
            </ul>
        </footer>
    </body>
</Fragment>
    )
}
export default MainPage
