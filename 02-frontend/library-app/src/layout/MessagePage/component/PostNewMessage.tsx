import { useAuth0 } from "@auth0/auth0-react";
import { useState } from "react"
import MessageModel from "../../../models/MessageMode";
import {MessageRequestDto} from "../../../dto/MessageRequestDto";

export const PostNewMessage = () => {
    const [title, setTitle] = useState('');
    const [textArea, setTextArea] = useState('');
    const [displayWarning, setDisplayWarning] = useState(false);
    const [displaySucces, setDisplaySucces] = useState(false);
    const {isAuthenticated, getAccessTokenSilently} = useAuth0();


    async function submitNewMessage() {
        const url = "http://localhost:8080/api/v1/messages/secure/create";
        if (isAuthenticated && title !== '' && textArea !== '') {
            const accesToken = await getAccessTokenSilently();
            const messageRequestMode: MessageRequestDto = new MessageRequestDto(title, textArea);
            const requestOptions = {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${accesToken}`,
                    "Content-type": "application/json"
                },
                body: JSON.stringify(messageRequestMode)
            }
            const submitNewMessageResponse = await fetch(url, requestOptions);
            if (!submitNewMessageResponse.ok) {
                console.log("Error", )
                throw Error("Something went wrong");
            }
            setDisplaySucces(true);
            setTitle('');
            setTextArea('');
        } else {
            setDisplayWarning(true);
        }
    }

    return (
        <div className="card mt-3">
            {displayWarning && 
                <div className="alert alert-danger" role="alert">
                    All field must be filled out
                </div>
            }
            {displaySucces && 
                <div className="alert alert-success" role="alert">
                    Succesfully, you sent message
                </div>
            }
            <div className="card-title m-2">
                <p className="lead">Ask question to Luv2 Read Admin</p>
            </div>
            <div className="card-body">
                <form method="POST">
                    <div className="mb-2">
                        <label className="form-label">Title</label>
                        <input className="form-control" id="exampleTitleInput" onChange={(e) => setTitle(e.target.value)} value={title}></input>
                    </div>
                    <div>
                        <label className="form-label">Question</label>
                        <textarea className="form-control" id="exampleTextAreaInput" rows={3} onChange={(e) => setTextArea(e.target.value)} value={textArea}></textarea>
                    </div>
                    <div className="mt-2">
                        <button type="button" className="btn btn-primary" onClick={submitNewMessage}>Submit Question</button>
                    </div>
                </form>
            </div>
        </div>
    )
}