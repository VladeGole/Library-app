import { Link } from "react-router-dom";
import BookModel from "../../../models/BookModel";
import { LeaveReview } from "../../Utils/LeaveReview";

export const CheckoutAndReviewsBox: React.FC<{
    book: BookModel | undefined, mobile: boolean,
    currentLoanedCount: number, isCheckout: boolean, isAuthenticated: boolean
    checkoutFun: any, isReviewLeft: boolean, submitReview: any}> = (props) => {


    function renderButton() {
        if (props.isAuthenticated) {
            if (props.currentLoanedCount < 5 && !props.isCheckout) {
                return (<button onClick={() => props.checkoutFun()} type="button" className="btn btn-success">Checkout</button>)
            } else {
                return (<p><b>There is not this book or you already checkout</b></p>);
            }
        } else {
            return (<Link type="button" className="btn btn-success" to={"/login"}>Sign in</Link>)
        }
    }

    function rednerReviewLeft() {
        if (props.isAuthenticated && !props.isReviewLeft) {
            return(<LeaveReview submitReview={props.submitReview}></LeaveReview>)
        } else if (props.isAuthenticated && props.isReviewLeft) {
            return(<p><b>Thanks for your review</b></p>)
        } 
    }

    

    return (
        <div className={props.mobile ? 'card d-flex mt-5' : 'card col-3 container d-flex mb-5 align-self-center'}>
            <div className='card-body container'>
                <div className='mt-3'>
                    <p>
                        <b>{props.currentLoanedCount}/5 </b>
                        books checked out
                    </p>
                    <hr />
                    {props.book && props.book.copiesAvailable && props.book.copiesAvailable > 0 ?
                        <h4 className='text-success'>
                            Available
                        </h4>
                        :
                        <h4 className='text-danger'>
                            Wait List
                        </h4>
                    }
                    <div className='row'>
                        <p className='col-6 lead'>
                            <b>{props.book?.copies} </b>
                            copies
                        </p>
                        <p className='col-6 lead'>
                            <b>{props.book?.copiesAvailable} </b>
                            available
                        </p>
                    </div>
                </div>
                {renderButton()}
                <hr />
                <p className='mt-3'>
                    This number can change until placing order has been complete.
                </p>
                {rednerReviewLeft()}
            </div>
        </div>
    );
}