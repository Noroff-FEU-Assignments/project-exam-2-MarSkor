import {useState} from "react";
import Collapse from 'react-bootstrap/Collapse'
import Button from "react-bootstrap/Button";
import PropTypes from "prop-types";
import Heading from "../../../components/layout/Heading";
import {FaTrash} from "react-icons/fa";

function MessageBox({id, first_name, last_name, message, email_address, createdAt, onRemove}) {
    const [open, setOpen] = useState(false);

    //formatting the createdAt string to be more readable. 
    let newFormattedDate = (createdAt)
    let timeSent = new Date(newFormattedDate);
    let timeFormatted = 
    //date dd/mm/yy
    timeSent.getDate() + "-" + 
    (timeSent.getMonth()+1) + "-" + 
    timeSent.getFullYear() + " " + 
    //timestamp
    timeSent.getHours()+ ":" + 
    timeSent.getMinutes() + ":" + 
    timeSent.getSeconds();
    // console.log(timeFormatted)
  
    return (
      <section className="message__wrapper ">
          <div className="message__content box" key={id}>
            <section className="flex-wrap">
                    <div>
                      <Heading size="4" content={first_name}/>
                      <p><strong>Message sent:</strong> {timeFormatted}</p>
                    </div>

                    <div className="delete-icon-wrap" title="delete item">
                      <FaTrash onClick={() => onRemove(id)} className="delete-icon"/>
                    </div>
            </section>
            
           
            <div className="alignRight">
              <Button
              onClick={() => setOpen(!open)}
              aria-controls="message-details"
              aria-expanded={open} 
              className="message__button">
                Show full message
              </Button>
            </div>
         
            <Collapse in={open} >
            <div id="message-details">
                <p><strong>Full Name:</strong> {first_name} {last_name}</p>
                <p><strong>Email: </strong> {email_address}</p> 
                <p><strong>Comment:</strong> {message}</p>
            </div>
            </Collapse>
          </div>
      </section>
    );
  }
  
export default MessageBox

MessageBox.propTypes = {
    id: PropTypes.string.isRequired,
    first_name: PropTypes.string.isRequired,
    last_name: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
    email_address: PropTypes.string.isRequired,
}