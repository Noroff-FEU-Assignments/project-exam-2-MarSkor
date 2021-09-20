import { useState } from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import useAxios from "../../hooks/useAxios";
import { confirmAlert } from 'react-confirm-alert'; 
import 'react-confirm-alert/src/react-confirm-alert.css';

export default function DeleteEstablishment({ id }){
    const [error, setError] = useState(null);

    const http = useAxios();
    const history = useHistory();
    const url = `establishments/${id}`


    async function handleDelete(){
        try{
            await http.delete(url)
            history.push("/establishments")
        
        }catch(error){
            setError(error)
        }
    }

    const handlingSubmitDelete = () => {
        confirmAlert({
          customUI: ({ onClose }) => {
            return (
              <div className="custom-ui confirm">
                <h1>Are you sure?</h1>
                <p>Do you want to delete this establishment?</p>
                <p>This cannot be undone</p>
                <div className="confirm__wrap">
                    <button className="confirm-btn confirm-cancel" onClick={onClose}>No</button>
                    <button className="confirm-btn confirm-delete"
                    onClick={() => {
                        handleDelete();
                        onClose();
                    }}
                    >
                    Yes, Delete it!
                    </button>
                </div>
                
              </div>
            );
          }
        });
      };

    return(
        <>
            <button type="button" className="delete-btn btn " onClick={handlingSubmitDelete}>
                {error ? "Error" : "Delete"}
            </button>
        </>
        
    )
}

DeleteEstablishment.propTypes={
    id: PropTypes.string.isRequired,
}

