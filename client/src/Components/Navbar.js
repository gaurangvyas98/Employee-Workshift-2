import React from 'react'

function Navbar(){

    //this function will return profile, create post link in nav if user is logged in otherwise it will return login and signup link in the navbar
    const renderList=()=>{
        if(state){
            return(
                [
                    // <li ><i data-target="modal1" className="large material-icons modal-trigger" style={{color: "black"}}>search</i></li>,
                    <li><Link to="/">Home</Link></li>
                    // <li><Link to="/Create">Create Post</Link></li>,
                    // <li><Link to="/myfollowingpost">My following posts</Link></li>,
                    // <li>
                    //     <button className="btn waves-effect waves-light #d32f2f red darken-2" onClick={()=>{
                    //         localStorage.clear();
                    //         dispatch({ type: "CLEAR" })
                    //         history.push("/signin")
                    //     }}>
                    //         Logout
                    //     </button>
                    // </li>
                ]
            )
        }
        else{
            return(
                [
                    <li><Link to="/signin">Login</Link></li>,
                    <li><Link to="/signup">SignUp</Link></li>
                ]
            )
        }
    }

    return(
        <div>
        <nav className="nav-wrapper white">
            <div className="container">
                <Link to="/"  className="brand-logo">Instagram</Link>
                <a href="" data-target="mobile-demo" className="sidenav-trigger"><i className="material-icons">menu</i></a>
                <ul className="right hide-on-med-and-down">
                    {renderList()}
                </ul>
            </div>
        </nav>

        <ul className="sidenav center-align" id="mobile-demo" >
                {renderList()}
        </ul>
        </div>
    )
}

export default Navbar;