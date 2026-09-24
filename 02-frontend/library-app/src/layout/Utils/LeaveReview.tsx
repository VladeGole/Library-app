import { useState } from "react"
import Review from "../../models/Review";
import { StarsReview } from "./StarsReview";

export const LeaveReview: React.FC<{submitReview: any}> = (props) => {

    const [startStar, setStartStar] = useState(0);
    const [display, setDisplay] = useState(false);
    const [reviewDescription, setReviewDescription] = useState('');

    function starValue(rating: number) {
        setStartStar(rating);
        setDisplay(true);
    }

    return (
        <div>
            <div className="dropdown">
                <h5 className="dropdown-toggle" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-haspopup="true"
                    aria-expanded="false">Leave a review ?</h5>
                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    <a onClick={() => starValue(0)} className="dropdown-item">0 star</a>
                    <a onClick={() => starValue(.5)} className="dropdown-item">.5 star</a>
                    <a onClick={() => starValue(1)} className="dropdown-item">1 star</a>
                    <a onClick={() => starValue(1.5)} className="dropdown-item">1.5 star</a>
                    <a onClick={() => starValue(2)} className="dropdown-item">2 star</a>
                    <a onClick={() => starValue(2.5)} className="dropdown-item">2.5 star</a>
                    <a onClick={() => starValue(3)} className="dropdown-item">3 star</a>
                    <a onClick={() => starValue(3.5)} className="dropdown-item">3.5 star</a>
                    <a onClick={() => starValue(4)} className="dropdown-item">4 star</a>
                    <a onClick={() => starValue(4.5)} className="dropdown-item">4.5 star</a>
                    <a onClick={() => starValue(5)} className="dropdown-item">5 star</a>
                </div>
            </div>
            <StarsReview rating={startStar} size={30}></StarsReview>
            {display &&
                <form method="POST" action="#">
                    <hr />
                    <div className="mb-2">
                        <label className="form-label">Description</label>
                        <textarea className="form-control" placeholder="Optional" rows={3}
                            onChange={e => setReviewDescription(e.target.value)}></textarea>
                    </div>
                    <button type="button" className="btn btn-primary" onClick={() => props.submitReview(startStar, reviewDescription)}>Submit</button>
                </form>

            }
        </div>
    )
}