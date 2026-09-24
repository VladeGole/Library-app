import { useAuth0 } from "@auth0/auth0-react"
import { useEffect, useState } from "react";
import MessageModel from "../../../models/MessageMode";
import { SpinerLoading } from "../../Utils/SpinerLoading";
import {Pagination} from "../../Utils/Pagination";
import {AdminMessage} from "./AdminMessage";
import {AdminMessageRequestDto} from "../../../dto/AdminMessageRequestDto";

export const AdminMessages = () => {

    const { isAuthenticated, getAccessTokenSilently } = useAuth0();

    const [httpError, setHttpError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState<MessageModel[]>([]);
    const [totalPage, setTotalPage] = useState(0);
    const [page, setPage] = useState(1);
    const [btnSubmit, setBtnSubmit] = useState(false);

    useEffect(() => {
        const fetchMessage = async () => {
            if (isAuthenticated) {
                const accesToken = await getAccessTokenSilently();
                const url = `http://localhost:8080/api/v1/messages/secure/close?page=${page - 1}&size=5`
                const requireOptions = {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${accesToken}`,
                        "Content-type": "application/json"
                    }
                }
                const responseMessage = await fetch(url, requireOptions);
                if (!responseMessage.ok) {
                    throw new Error("Something went wrong");
                }
                const responseMessageJson = await responseMessage.json();
                setMessage(responseMessageJson.content);
                setTotalPage(responseMessageJson.totalPage);
                setIsLoading(false);
            }
        }
        fetchMessage().catch((error: any) => {
            setHttpError(error.message);
            setIsLoading(false);
        })
    }, [isAuthenticated, getAccessTokenSilently, page, btnSubmit])

    async function submitResponseToQuestion(id: number, response: string) {
        const url = `http://localhost:8080/api/v1/messages/secure/admin/message`;
        const accessToken = await getAccessTokenSilently();
        if (isAuthenticated && id !== null && response !== '') {
            const messageAdminRequestModel: AdminMessageRequestDto = new AdminMessageRequestDto(id, response);
            const requestOptions = {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(messageAdminRequestModel)
            };

            const messageAdminRequestModelResponse = await fetch(url, requestOptions);
            if (!messageAdminRequestModelResponse.ok) {
                throw new Error('Something went wrong!');
            }
            setBtnSubmit(!btnSubmit);
        }
    }

    if (httpError) {
        return (
            <div className="container m-5">
                {httpError}
            </div>
        )
    }

    if (isLoading) {
        return(
            <SpinerLoading></SpinerLoading>
        )
    }

    const paginate = (pageNumber: number) => setPage(pageNumber);

    return (
        <div className="mt-3">
            {message.length > 0 ?
                <>
                    <h5>Pending Q\A: </h5>
                    {message.map(msg => (
                        <AdminMessage message={msg} key={msg.id} submitResponseToQuestion={submitResponseToQuestion}/>
                    ))}
                </>
                :
                <h5>No pending Q\A</h5>
            }
            {totalPage > 1 && <Pagination currentPage={page} totalPages={totalPage} paginate={paginate}/>}
        </div>
    )

}