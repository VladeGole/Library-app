import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react"
import { SpinerLoading } from "../../Utils/SpinerLoading";
import ShelfPageModel from "../../../models/ShelfPageModel";
import { Link } from "react-router-dom";
import { LoansModel } from "./LoansModel";

export const Loans = () => {
    const [loans, setLoans] = useState<ShelfPageModel[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState(null);
    const [checkout, setCheckout] = useState(false);
    const { isAuthenticated, getAccessTokenSilently } = useAuth0();

    async function returnBookFunction(bookId: number) {
        if (isAuthenticated) {
            const url = `http://localhost:8080/api/v1/books/secure/returnBook/${bookId}`;
            console.log("URL", url);
            const accesToken = await getAccessTokenSilently();
            const requestOptions = {
                method: "PATCH",
                headers: {
                    Authorization: `Bearer ${accesToken}`,
                    "Content-type": "application/json"
                }
            }
            const response = await fetch(url, requestOptions);
            if (!response.ok) {
                const errorText = await response.text();
                console.log("Error:", errorText);
                throw new Error("Something went wrong");
            }
            setCheckout(!checkout);
        }
    }

    async function returnBookDateFunction(bookId: number) {
        if (isAuthenticated) {
            const url = `http://localhost:8080/api/v1/books/secure/returnBookDate/${bookId}`;
            const accesToken = await getAccessTokenSilently();
            const requestOptions = {
                method: "PATCH",
                headers: {
                    Authorization: `Bearer ${accesToken}`,
                    "Content-type": "application/json"
                }
            }
            const response = await fetch(url, requestOptions);
            if (!response.ok) {
                throw new Error("Something went wrong");
            }
            setCheckout(!checkout);
        }
    }


    useEffect(() => {
        const fetchLoans = async () => {
            if (isAuthenticated) {
                const accesToken = await getAccessTokenSilently();
                const url = "http://localhost:8080/api/v1/books/secure/countLoans";
                const requestOptions = {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${accesToken}`,
                        "Content-type": "application/json"
                    }
                }
                const response = await fetch(url, requestOptions);
                if (!response.ok) {
                    throw Error("Something went wrong");
                }
                const responseJson = await response.json();
                setLoans(responseJson);
            }
            setIsLoading(false);
        }
        fetchLoans().catch((error: any) => {
            setHttpError(error.message);
        })
    }, [isAuthenticated, getAccessTokenSilently, checkout])

    if (isLoading) {
        return (
            <SpinerLoading />
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
                {loans.length > 0 ?
                    <>
                        <h5 className="mt-2">Current Loans:</h5>
                        {loans.map(loans => (
                            <div key={loans.book.id}>
                                <div className="row mt-3 mb-3">
                                    <div className="col-4 col-md-4 container">
                                        {loans.book.image ?
                                            <img src={loans.book.image} width={236} height={349} alt="#" />
                                            :
                                            <img src={require("../../../Image/BookImage/book-luv2code-1000.png")} width={236} height={349} />
                                        }
                                    </div>

                                    <div className="col-4 col-md-4">
                                        <div className="card container">
                                            <div className="card-body">
                                                <h4 className="card-title">Loan Options</h4>
                                                {loans.leftDays > 0 &&
                                                    <p className="text-secondary">Due in {loans.leftDays}</p>
                                                }
                                                {loans.leftDays < 0 &&
                                                    <p className="text-secondary">Past due by {loans.leftDays}</p>
                                                }
                                                {loans.leftDays === 0 &&
                                                    <p className="text-secondary">Today</p>
                                                }
                                                <div className="list-group">
                                                    <button className="list-group-item list-group-item-action"
                                                        aria-current="true" data-bs-toggle="modal" data-bs-target={`#modal${loans.book.id}`}>Manage Loan
                                                    </button>
                                                    <Link to="/search" className="list-group-item list-group-item-action">Search more books?</Link>
                                                </div>
                                            </div>
                                            <hr />
                                            <div>
                                                <p>Help other find their adventure by reviewing your loan</p>
                                                <Link className="btn btn-primary mb-3" to={`/checkout/${loans.book.id}`}>Leave review</Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <hr />
                            </div>
                        ))}
                    </>
                    :
                    <>
                        <h3>Current no loans</h3>
                        <Link className="btn btn-primary" to={"/search"}>Search book</Link>
                    </>

                }

            </div>

            {/*mobile*/}
            <div className="d-lg-none me-4">
                {loans.length > 0 ?
                    <>
                        <h5 className="mt-2">Current Loans:</h5>
                        {loans.map(loans => (
                            <div key={loans.book.id}>

                                <div className="d-flex justify-content-center align-items-center">
                                    {loans.book.image ?
                                        <img src={loans.book.image} width={236} height={349} alt="#" />
                                        :
                                        <img src={require("../../../Image/BookImage/book-luv2code-1000.png")} width={236} height={349} />
                                    }
                                </div>

                                <div className="d-flex justify-content-center align-items-center mt-2">
                                    <div className="card">
                                        <div className="card-body">
                                            <h4 className="card-title">Loan Options</h4>
                                            {loans.leftDays > 0 &&
                                                <p className="text-secondary">Due in {loans.leftDays}</p>
                                            }
                                            {loans.leftDays < 0 &&
                                                <p className="text-secondary">Past due by {loans.leftDays}</p>
                                            }
                                            {loans.leftDays === 0 &&
                                                <p className="text-secondary">Today</p>
                                            }
                                            <div className="list-group">
                                                <button className="list-group-item list-group-item-action"
                                                    aria-current="true" data-bs-toggle="modal" data-bs-target={`#modal${loans.book.id}`}>Manage Loan
                                                </button>
                                                <Link to="/search" className="list-group-item list-group-item-action">Search more books?</Link>
                                            </div>
                                        </div>
                                        <hr />
                                        <div className="p-2">
                                            <p>Help other find their adventure by reviewing your loan</p>
                                            <Link className="btn btn-primary mb-3" to={`/checkout/${loans.book.id}`}>Leave review</Link>
                                        </div>
                                    </div>
                                </div>
                                <hr />
                            </div>
                        ))}
                    </>
                    :
                    <>
                        <h3>Current no loans</h3>
                        <Link className="btn btn-primary" to={"/search"}>Search book</Link>
                    </>
                }
            </div>

            {loans.map(loan => (
                <LoansModel
                    key={`loan-modal-${loan.book.id}`}
                    returnBook={returnBookFunction}
                    shelfPageModel={loan}
                    returnBookDate={returnBookDateFunction}
                />
            ))}
        </>
    );
}