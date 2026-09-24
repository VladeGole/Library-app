import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react"
import { SpinerLoading } from "../../Utils/SpinerLoading";
import HistoryModel from "../../../models/HistoryModel";
import { Pagination } from "../../Utils/Pagination";

export const HistoryPage = () => {
    const [history, setHistory] = useState<HistoryModel[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState(null);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const { isAuthenticated, getAccessTokenSilently } = useAuth0();

    useEffect(() => {
        const fetchHistory = async () => {
            if (isAuthenticated) {
                const accessToken = await getAccessTokenSilently();
                const url = `http://localhost:8080/api/v1/history?page=${page - 1}&size=5`
                const requestOptions = {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                        "Content-Type": "application/json"
                    }
                }
                const response = await fetch(url, requestOptions);
                if (!response) {
                    throw new Error("Something went wrong");
                }
                const responseJson = await response.json();
                const content = responseJson.content;
                setTotalPages(responseJson.totalPages)
                setHistory(content);
                setIsLoading(false);
            }
        }
        fetchHistory().catch((error: any) => {
            setHttpError(error.message);
        })
    }, [isAuthenticated, getAccessTokenSilently,page])

    const pagination = (page: number) => {
        setPage(page);
    }


    if (isLoading) {
        return (
            <SpinerLoading></SpinerLoading>
        )
    }

    if (httpError) {
        return (
            <div className="container m-5">{httpError}</div>
        )
    }

    return (
        <>
            {/*desktop*/}
            <div className="d-none d-lg-block">
                {history.length > 0 ?
                    <>
                        <h4>Recent History:</h4>
                        {history.map(history => (
                            <div className="card mt-2">
                                <div className="row container">
                                    <div className="col-3 col-md-3 m-3">
                                        {history.img ?
                                            <img src={history.img} height={349} width={236} /> :
                                            <img src={require("../../../Image/BookImage/book-luv2code-1000.png")} width={236} height={349} />
                                        }
                                    </div>
                                    <div className="col-4 col-md-4 card-body">
                                        <div className="card-text m-4">
                                            <h4>{history.author}</h4>
                                            <h2>{history.title}</h2>
                                            <p className="lead">{history.description}</p>
                                            <hr />
                                            <p>Checked out on: {history.checkoutDate.toString()}</p>
                                            <p>Checked out on: {history.returnDate.toString()}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </>
                    :
                    <>
                        <p>Current no history</p>
                    </>
                }

            </div>
            {/*mobile*/}
            <div className="d-lg-none">
                {history.length > 0 ?
                    <>
                        <h4>Recent History:</h4>
                        {history.map(history => (
                            <div className="card mt-2">
                                <div className="container">
                                    <div className="m-3">
                                        {history.img ?
                                            <img src={history.img} height={349} width={236} /> :
                                            <img src={require("../../../Image/BookImage/book-luv2code-1000.png")} width={236} height={349} />
                                        }
                                    </div>
                                    <div className="card-body">
                                        <div className="card-text m-4">
                                            <h4>{history.author}</h4>
                                            <h2>{history.title}</h2>
                                            <p className="lead">{history.description}</p>
                                            <hr />
                                            <p>Checked out on: {history.checkoutDate.toString()}</p>
                                            <p>Checked out on: {history.returnDate.toString()}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </>
                    :
                    <>
                        <p>Current no history</p>
                    </>
                }

            </div>
            {page > 1 && <Pagination currentPage={page} totalPages={totalPages} paginate={pagination}/>}
        </>

    );
}