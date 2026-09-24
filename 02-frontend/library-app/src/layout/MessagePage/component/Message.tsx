import { useEffect, useState } from "react"
import MessageModel from "../../../models/MessageMode";
import { useAuth0 } from "@auth0/auth0-react";
import { SpinerLoading } from "../../Utils/SpinerLoading";
import { Pagination } from "../../Utils/Pagination";

export const Message = () => {
    const [httpError, setHttpError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [totalPage, setTotalPage] = useState(0);
    const [page, setPage] = useState(1);
    const [message, setMessage] = useState<MessageModel[]>([]);
    const { isAuthenticated, getAccessTokenSilently } = useAuth0();

    useEffect(() => {
        const fetchMessage = async () => {
            if (isAuthenticated) {
                const accessToken = await getAccessTokenSilently();
                const url = `http://localhost:8080/api/v1/messages/secure/all?page=${page - 1}&size=5`
                const requestOptions = {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                        "Content-type": "application/json"
                    }
                }
                const responseMessage = await fetch(url, requestOptions);
                if (!responseMessage.ok) {
                    console.log("Error", responseMessage);
                    
                    throw Error("Something went wrong");
                }
                const responseMessageJson = await responseMessage.json();
                const contentMessage = responseMessageJson.content;
                setMessage(contentMessage);
                setTotalPage(responseMessageJson.totalPages);
                setIsLoading(false);
            }
        }
        fetchMessage().catch((error: any) => {
            setHttpError(error.message);
            setIsLoading(false);
        })
    }, [isAuthenticated, getAccessTokenSilently, page])

    if (isLoading) {
        return (
            <SpinerLoading></SpinerLoading>
        )
    }

    if (httpError) {
        return (
            <div className="container m-5">
                {httpError}
            </div>
        )
    }

    const paginate = (pageNumber: number) => {
        setPage(pageNumber);
    }

    return (
        <div className="mt-2">
            {message.length > 0 ?
                <>
                    <h4>Current Q/A:</h4>
                    {message.map(message => (
                        <div className="card shadow rounde p-3 mb-3">
                            <h4>Case: {message.title}</h4>
                            <p><i>Question: {message.question}</i></p>
                            <hr/>
                            {message.response && message.adminEmail ?
                                <>
                                    <h4>{message.adminEmail} (admin)</h4>
                                    <p>{message.response}</p>
                                </>
                                :
                                <>
                                    <h4>Response:</h4>
                                    <p><i>Pending response from administritator. Please be patient</i></p>
                                </>
                            }
                        </div>
                    ))}
                </>
                :
                <>
                    <h5>All questions you submit will be shown here</h5>
                </>
            }
            {totalPage > 1 && <Pagination currentPage={page} totalPages={totalPage} paginate={paginate}/>}
        </div>
    )
}
