import { Link } from "react-router-dom";
import Review from "../../../models/Review";
import { Reviews } from "./Reviews";

export const LatestReview: React.FC<{ reviews: Review[], mobile: boolean, bookId: number | undefined }> = (props) => {
    return (
        <div className="container ms-3">
            <div className={props.mobile ? "mt-2" : "row"}>
                <div className={props.mobile ? "mt-1" : "col-2"}>
                    <h2>Latest Review:</h2>
                </div>
                {props.reviews.length > 0 ?
                <div className="col">
                    {props.reviews.slice(0, 3).map((review) => (
                        <Reviews review={review} />
                    ))}
                    <div className="m-2">
                        <Link type="button" className="btn btn-primary text-white" to={`/reviewList/${props.bookId}`}>Reach all reviews</Link>
                    </div>
                </div>
                :
                <div className="col mt-3">
                    <p className="lead">Currently there are no reviews for this books</p>
                </div>
                }
            </div>
        </div>
    );
}