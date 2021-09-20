import { NavLink } from "react-router-dom";
import  Navbar  from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import { useContext } from "react";
import {  Link, useHistory } from "react-router-dom";
import AuthContext from "../../contexts/AuthContext";
import Dropdown from 'react-bootstrap/Dropdown'

function Navigationbar(){

    const [auth, setAuth] = useContext(AuthContext);
    const history = useHistory();

    function logOut(){
        setAuth(null);
        history.push("/");
        window.localStorage.removeItem("isAuthenticated")
    }

     

    return(
        <>
        <Navbar  collapseOnSelect expand="lg" bg="dark" variant="dark" sticky="top">
            <Container>

                <NavLink to="/">
                    <Navbar.Brand>Holidaze</Navbar.Brand>
                </NavLink>

                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="ml-auto nav-default">
                        <NavLink exact to="/" className="nav-link">Home</NavLink>
                        <NavLink  to="/establishments" className="nav-link">Establishments</NavLink>
                        <NavLink  to="/contact" className="nav-link">Contact Us</NavLink>
                   
                        {auth ? (
                            <>
                            <Dropdown className="button-spacing btn-admin-container">
                                <Dropdown.Toggle className="admin-button"  id="dropdown-basic">
                                    Admin
                                </Dropdown.Toggle>

                                <Dropdown.Menu className="admin-nav-menu">
                                    <Link to="/admin" className="dropdown-item ">Account </Link>
                                    <Dropdown.Item onClick={logOut}>Log out</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                            </>
                        ) : (
                            <Link to="/login" className="nav-link">Login</Link>
                        ) }

                        <div className="button-spacing">
                            <NavLink to="/booking" className="primary-btn btn-book-now"> 
                                Book now
                            </NavLink>
                        </div>
                    </Nav>
                   
                    
                </Navbar.Collapse>

            </Container>
        </Navbar>
        </>
    )
}
export default Navigationbar