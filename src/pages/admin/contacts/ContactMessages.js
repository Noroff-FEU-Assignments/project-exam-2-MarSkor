import { useState, useEffect } from "react";
import useAxios from "../../../hooks/useAxios";
import Loading from "../../../components/common/Loading";
import ErrorMessage from "../../../components/common/Error";
import MessageBox from "./MessageBox";
import { BASE_URL } from "../../../constants/apiUrl";

export default function ContactMessages(){
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError]  = useState(null);

    const http = useAxios();

    useEffect(() =>{
        async function fetchMessages(){
            try{
                const response = await http.get("contactuses")
                console.log("messages", response.data);
                setMessages(response.data)
                
            }catch(error){
                console.log(error)
                setError(error.toString());
            }finally{
                setLoading(false);
            }
        }
        fetchMessages();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if(loading){
        return <div className="loading-text">Messages are being loaded...<Loading /></div>
    }
    if(error){
        return <ErrorMessage message={`The Error: ${error}`}/>
    }

    if(!messages.length){
        return <div className="empty-array">No messages to display</div>
    };

    // removes that specific item from the array
     const onRemove = (id) =>{
        http.delete(`${BASE_URL}contactuses/${id}`)
        .then(res =>{
            const newList = messages.filter((item)=> item.id !== id);
            setMessages(newList)
        })
    }
    
    return(
        <>
            {messages.map(function(amessage){
                const {id, first_name, last_name, message, email_address, createdAt} = amessage;
                return <MessageBox key={id} id={id} 
                first_name={first_name} 
                last_name={last_name} 
                message={message} 
                email_address={email_address} 
                createdAt={createdAt} 
                onRemove={onRemove}/>
            })}
        </>
    )
} 

