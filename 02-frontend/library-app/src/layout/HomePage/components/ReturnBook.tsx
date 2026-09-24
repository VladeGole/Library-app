import React from "react";
import BookModel from "../../../models/BookModel";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

export const ReturnBook: React.FC<{book: BookModel}> = (props) => {
    console.log("Book image:", props.book.image);

    return (
        <div className="col-xs-6 col-sm col-md-4 col-lg-3 mb-3">
            <div className="text-center">
                {props.book.image? 
                <img src={props.book.image} alt=""></img> :
                <img src={require("./../../../Image/BookImage/book-luv2code-1000.png")} alt=""></img>
                }
                <h6 className="mt-2">Book</h6>
                <p>Luv2Code</p>
                <Link className="btn main-color text-white" to={`/checkout/${props.book.id}`} >Reserve</Link>
            </div>
        </div>
    );
}
