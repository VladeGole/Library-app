import { use, useEffect, useState } from "react";
import BookModel from "../../models/BookModel";
import { StarsReview } from "../Utils/StarsReview";
import { SpinerLoading } from "../Utils/SpinerLoading";
import Review from "../../models/Review";
import { LatestReview } from "./component/LatestReview";
import { CheckoutAndReviewsBox } from "./component/CheckoutAndReviewsBox";
import { useAuth0 } from "@auth0/auth0-react";
import ReviewRequestModel from "../../models/ReviewRequestModel";

export const BookCheckoutPage = () => {
    const [book, setBook] = useState<BookModel>();
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState(null);

    // Review state
    const [review, setReview] = useState<Review[]>([]);
    const [totalStars, setTotalStars] = useState(0);

    //Checkout count per User
    const [countLoaned, setCountLoaned] = useState(1);
    const [isLoadingCountLoaned, setIsLoadingCountLoaned] = useState(true);

    //CheckoutBook
    const [isCheckout, setIsCheckout] = useState(false);
    const [isCheckoutLoading, setIsCheckoutLoading] = useState(true);

    // Review left check
    const[isReviewLeft, setIsReviewLeft] = useState(false);
    const[isLoadingReviewLeft, setIsLoadingReviewLeft] = useState(true);

    const { isAuthenticated, getAccessTokenSilently } = useAuth0();

    const bookId = (window.location.pathname).split("/")[2];

    useEffect(() => {

        const fetchBooks = async () => {
            const baseUrl = `http://localhost:8080/api/v1/books/${bookId}`

            const response = await fetch(baseUrl);

            if (!response.ok) {
                throw new Error("Something went wrong");
            }

            const responseJson = await response.json();

            const loadedData: BookModel = {
                id: responseJson.id,
                title: responseJson.title,
                author: responseJson.author,
                description: responseJson.description,
                copies: responseJson.copies,
                copiesAvailable: responseJson.copiesAvailable,
                category: responseJson.category,
                image: responseJson.image,
                deleted: responseJson.deleted
            }

            setBook(loadedData);
            setIsLoading(false);
        }
        fetchBooks().catch((error: any) => {
            setIsLoading(false);
            setHttpError(error.message);
        })
    }, [isCheckout])

    useEffect(() => {

        const fetchReview = async () => {
            const url = `http://localhost:8080/api/v1/reviews/${bookId}`;

            const response = await fetch(url);

            if (!response.ok) {
                throw new Error("Something went wrong")
            }

            const responseJson = await response.json();

            const responseData = responseJson.content;

            let stars = 0

            const loadedData: Review[] = responseData.map((item: Review) => {
                stars = stars + item.rating;
                return {
                    id: item.id,
                    localDateTime: item.localDateTime,
                    userEmail: item.userEmail,
                    rating: item.rating,
                    bookId: item.bookId,
                    reviewDescription: item.reviewDescription
                }
            })

            if (loadedData) {
                const round = (Math.round(stars / loadedData.length * 2) / 2).toFixed(1);
                setTotalStars(Number(round));
            }

            setReview(loadedData);
            setIsLoading(false);
        }
        fetchReview().catch((error: any) => {
            setIsLoading(false);
            setHttpError(error.message)
        })
    }, [isAuthenticated, getAccessTokenSilently, isReviewLeft])

    useEffect(() => {
        const fetchCountLoaned = async () => {
            if (isAuthenticated) {
                const accessToken = await getAccessTokenSilently();
                const url = "http://localhost:8080/api/v1/books/secure/checkout/count"

                const requestOptions = {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                        "Content-Type": "application/json"
                    }
                }
                const response = await fetch(url, requestOptions);

                if (!response.ok) {
                    throw new Error("Something went wrong")
                }

                const responseJson = await response.json();
                setCountLoaned(responseJson);
            }
            setIsLoadingCountLoaned(false);
        }
        fetchCountLoaned().catch((error: any) => {
            setHttpError(error.message);
        })
    }, [isAuthenticated, getAccessTokenSilently, ])

    useEffect(() => {
        const fetchIsCheckout = async () => {
            if (isAuthenticated) {
                const accessToken = await getAccessTokenSilently();
                const url = `http://localhost:8080/api/v1/books/secure/isCheckout/${bookId}`;

                const requireOptions = {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                        "Content-type": "application/json"
                    }
                }
                const response = await fetch(url, requireOptions);
                if (!response.ok) {
                    throw new Error("Something went wrong");
                }

                const responseJson = await response.json();
                setIsCheckout(responseJson);
            }
            setIsCheckoutLoading(false);
        }
        fetchIsCheckout().catch((error: any) => {
            setHttpError(error.message)
        })
    }, [isAuthenticated, getAccessTokenSilently, isCheckout])

    useEffect(() => {
        const fetchIsReviewLeft = async () => {
            if (isAuthenticated) {
            const accessToken = await getAccessTokenSilently();
            const url = `http://localhost:8080/api/v1/reviews/secure/exists/book/${bookId}`;

            const requestOptions = {
                "method" : "GET",
                headers : {
                "Authorization": `Bearer ${accessToken}`,
                "Content-Type": "application/json"
                }
            }
            const response = await fetch(url, requestOptions);

            if (!response.ok) {
                throw new Error("Something went wrong");
            }

            const responseJson = await response.json();
            setIsReviewLeft(responseJson)
            }
            setIsLoadingReviewLeft(false);
        }
        fetchIsReviewLeft().catch((error: any) => {
            setHttpError(error.message)
        })
    }, [isAuthenticated, getAccessTokenSilently])

    async function checkoutBook() {
        const accessToken = await getAccessTokenSilently();
        const url = `http://localhost:8080/api/v1/books/secure/checkout/${bookId}`;

        const requestOptions = {
            method: 'PATCH',
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            }
        };
        const checkoutResponse = await fetch(url, requestOptions);
        if (!checkoutResponse.ok) {
            throw new Error('Something went wrong!');
        }
        setIsCheckout(true);
    }


    async function submitReview(starInput: number, reviewDescription: string) {
        let bookId: number = 0;
        if (book?.id) {
            bookId = book.id
        }

        const reviewRequestModel = new ReviewRequestModel(bookId, starInput, reviewDescription)
        const url = "http://localhost:8080/api/v1/reviews/secure";
        const accessToken = await getAccessTokenSilently();
        const requestOptions = {
            method: "POST",
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(reviewRequestModel)
        };
        const returnResponse = await fetch(url, requestOptions);
        if (!returnResponse.ok) {
            throw Error("Something went wrong");
        }
        setIsReviewLeft(true);
    }


    if (isLoading || isLoadingCountLoaned || isLoadingReviewLeft || isCheckoutLoading) {
        return (
            <SpinerLoading />
        );
    }

    if (httpError) {
        return (
            <div className="conatiner m-5">{httpError}</div>
        );
    }

    return (
        <div>
            <div className="container d-none d-lg-block">
                <div className="row mt-5">
                    <div className="col-lg-2">
                        {book?.image ?
                            <img src={book.image} width={226} height={349} alt="#" />
                            :
                            <img src={require("../../Image/BookImage/book-luv2code-1000.png")} width={226} height={349} alt="#" />
                        }
                    </div>
                    <div className="col-lg-4 container">
                        <div className="ms-2">
                            <h2>{book?.title}</h2>
                            <h4 className="text-primary">{book?.author}</h4>
                            <p className="lead">{book?.description}</p>
                            <StarsReview rating={totalStars} size={32} />
                        </div>
                    </div>
                    <CheckoutAndReviewsBox book={book} mobile={false} currentLoanedCount={countLoaned}
                        isCheckout={isCheckout} isAuthenticated={isAuthenticated} checkoutFun={checkoutBook} isReviewLeft={isReviewLeft}
                        submitReview={submitReview}/>
                </div>
                <hr />
                <div>
                    <LatestReview reviews={review} mobile={false} bookId={book?.id}/>
                </div>
            </div>
            {/*Mobile */}
            <div className="container d-lg-none mt-1">
                <div className="d-flex justify-content-center align-items-center">
                    {book?.image ?
                        <img src={book.image} width={200} height={300} alt="#" />
                        :
                        <img src={require("../../Image/BookImage/book-luv2code-1000.png")} width={100} height={100} alt="#" />
                    }
                </div>
                <div className="m-3">
                    <h2>{book?.title}</h2>
                    <h4 className="text-primary">{book?.author}</h4>
                    <p className="lead">{book?.description}</p>
                    <StarsReview rating={totalStars} size={32} />
                </div>
                <div className="mb-2">
                    <LatestReview reviews={review} mobile={true} bookId={book?.id}/>
                </div>
            </div>
        </div>
    );
}