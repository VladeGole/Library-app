import { Link } from "react-router-dom";
import BookModel from "../../../models/BookModel";

export const SearchBooks: React.FC<{ book: BookModel }> = (props) => {
    return (
        <div className="card m-2 bg-body rounded">
            <div className="row g-0">
                <div className="col-md-2 mt-4">
                    <div className="d-none d-lg-block">
                        {props.book.image ?
                            <img src={props.book.image} alt="" width='123' height='196' /> :
                            <img src={require("../../../Image/BookImage/book-luv2code-1000.png")} alt="logo" width='123' height='196' />
                        }
                    </div>
                    <div className="d-lg-none d-flex justify-content-center align-items-center">
                        {props.book.image ?
                            <img src={props.book.image} alt="" width='123' height='196' /> :
                            <img src={require("../../../Image/BookImage/book-luv2code-1000.png")} alt="logo" width='123' height='196' />
                        }
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="card-body">
                        <h4>{props.book.author}</h4>
                        <h2>{props.book.title}</h2>
                        <p>{props.book.description}</p>
                    </div>
                </div>
                <div className="col-4 d-flex justify-content-center align-items-center">
                    <Link className="btn btn-primary text-white" to={`/checkout/${props.book.id}`}>View details</Link>
                </div>
            </div>
        </div>
    );

}