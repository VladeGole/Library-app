import Review from "../../../models/Review";
import { StarsReview } from "../../Utils/StarsReview";

export const Reviews: React.FC<{ review: Review }> = (props) => {

    const data = new Date(props.review.localDateTime);
    console.log(data);

    const longMonth = data.toLocaleString('en-us', { month: 'long' });
    const dayDate = data.getDate();
    const yearDate = data.getFullYear();

    const dateRender = longMonth + " " + dayDate + " " + yearDate;

    return (
        <div>
            <h4>{props.review.userEmail}</h4>
            <div className="row">
                <div className="col-5 mb-1">
                    {dateRender}
                </div>
                <div className="col">
                    <StarsReview rating={props.review.rating} size={10} />
                </div>
                <div>
                    <p className="fst-italic">{props.review.reviewDescription}</p>
                </div>
            </div>
            <hr/>
        </div>
    );
}