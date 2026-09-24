import { use, useEffect, useState } from "react"
import Review from "../../../models/Review";
import { Reviews } from "./Reviews";
import { SpinerLoading } from "../../Utils/SpinerLoading";
import { useParams } from "react-router-dom";
import { Pagination } from "../../Utils/Pagination";

export const ReviewListPage = () => {

    const [review, setReview] = useState<Review[]>([]);
    const [httpError, setHttpError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const { bookId } = useParams<{ bookId: string }>();

    const [reviewsPerPage] = useState(5);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalAmountOfReviews, setTotalAmountOfReviews] = useState(0);
    const [totalPage, setTotalPage] = useState(0);

    useEffect(() => {

        const fetchReview = async () => {
            const url = `http://localhost:8080/api/v1/reviews/${bookId}?page=${currentPage - 1}&size=${reviewsPerPage}`;

            const response = await fetch(url);

            if (!response.ok) {
                const error = await response.text();
                console.log(error);
                throw new Error("Something went wrong")
            }

            const responseJson = await response.json();

            const responseData = responseJson.content;

            setTotalAmountOfReviews(responseJson.totalElements);
            setTotalPage(responseJson.totalPages);

            const loadedData: Review[] = responseData.map((item: Review) => {
                return {
                    id: item.id,
                    localDateTime: item.localDateTime,
                    userEmail: item.userEmail,
                    rating: item.rating,
                    bookId: item.bookId,
                    reviewDescription: item.reviewDescription
                }
            })

            setReview(loadedData);
            setIsLoading(false);
        }
        fetchReview().catch((error: any) => {
            setIsLoading(false);
            setHttpError(error.message)
        })
    }, [])

    if (isLoading) {
        return (<SpinerLoading />)
    }

    if (httpError) {
        return (
            <div className="conatiner m-5">{httpError}</div>
        );
    }

    const lastIndexOfReviews: number = currentPage * reviewsPerPage;
    const firstIndexOfReviews: number = lastIndexOfReviews - reviewsPerPage;
    const lastItem: number = currentPage * reviewsPerPage <= totalAmountOfReviews ? currentPage * reviewsPerPage : totalAmountOfReviews;

    function paginate(currentPage: number) {
        setCurrentPage(currentPage);
    }

    return (
        <div className="container mt-5">
            <h2>Comments: ({totalAmountOfReviews})</h2>
            <p>{firstIndexOfReviews + 1} to {lastItem} of {totalAmountOfReviews}</p>
            <div className="row">
                {
                    review.map(review => {
                        return <Reviews review={review} />
                    })
                }
            </div>
            {totalPage > 1 && <Pagination currentPage={currentPage} totalPages={totalPage} paginate={paginate}/>}
        </div>
    )

}