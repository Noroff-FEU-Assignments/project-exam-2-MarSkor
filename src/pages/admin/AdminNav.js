import Nav from "react-bootstrap/Nav";
import { NavLink } from "react-router-dom";
import {FaEnvelope, FaHotel, FaWpforms, FaUser} from "react-icons/fa";


export default function AdminNav(){
    return(
        <div className="adminnav">
            <Nav  className="justify-content-center adminnav__wrapper" activekey="/admin">
                <Nav.Item className="adminnav__item">
                    <NavLink className="adminnav__link" eventkey="/admin" to="/admin"><FaUser className="adminnav__icon"/> Admin</NavLink>
                </Nav.Item>

                <Nav.Item className="adminnav__item">
                    <NavLink className="adminnav__link" to="/admin/createestablishment"><FaHotel className="adminnav__icon"/> Create establishment</NavLink>
                </Nav.Item>
            
                <Nav.Item className="adminnav__item">
                    <NavLink className="adminnav__link" to="/admin/contactmessages"><FaEnvelope className="adminnav__icon"/> Messages</NavLink>
                </Nav.Item>

                <Nav.Item className="adminnav__item">
                    <NavLink className="adminnav__link" to="/admin/checkenquiries"><FaWpforms className="adminnav__icon"/> Enquiries</NavLink>
                </Nav.Item>
            </Nav>
        </div>
        
    )
}
