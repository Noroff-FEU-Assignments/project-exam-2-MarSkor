import { useState, useEffect } from "react";
import useAxios from "../../../hooks/useAxios";
import ErrorMessage from "../../../components/common/Error";
import Loading from "../../../components/common/Loading";
import EnquiriesBox from "./EnquiriesBox";
import Row from "react-bootstrap/Row";
import {BASE_URL} from "../../../constants/apiUrl";

export default function EnquiriesList(){
    const [enquiries, setEnquiries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError]  = useState(null);

    const http = useAxios();

    useEffect(() =>{
        async function fetchEnquiries(){
            try{
                const response = await http.get("enquiries")
                setEnquiries(response.data);
            }catch(error){
                console.log(error)
                setError(error.toString());
            }finally{
                setLoading(false);
            }
        }
        fetchEnquiries();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if(loading){
        return <div className="loading-text">Enquiries are loading...<Loading /></div>
    }
    if(error){
        return <ErrorMessage message={`The Error: ${error}`}/>
    }

    if(!enquiries.length){
        return <div className="empty-array">No enquiries to display</div>
    };


    // removes that specific item from the array
    const onRemove = (id) =>{
        http.delete(`${BASE_URL}enquiries/${id}`)
        .then(res =>{
            const newList = enquiries.filter((item)=> item.id !== id);
            setEnquiries(newList)
        })
    }
    
    return(
        <>
            <Row className="enquiry__container">
                {enquiries.map(function(anenquiry){
                    const {id, arrival, departure, email, first_name, last_name, name_of_establishment, number_of_guests, phone_number, additional_comment} = anenquiry;
                    return <EnquiriesBox key={id} id={id} 
                    arrival={arrival} 
                    departure={departure} 
                    email={email} 
                    first_name={first_name} 
                    last_name={last_name} 
                    name_of_establishment={name_of_establishment} 
                    number_of_guests={number_of_guests} 
                    phone_number={phone_number} 
                    additional_comment={additional_comment} 
                    onRemove={onRemove}/>
                })}
            
            </Row>
        </>
 
    )
}