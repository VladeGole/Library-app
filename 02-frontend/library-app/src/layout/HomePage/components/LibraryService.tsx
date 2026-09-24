import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";

export const LibraryService = () => {

    const {isAuthenticated} = useAuth0();

    return (
        <div className="container my-5">
            <div className="row p-3 border shadow-lg align-items-center">
                <div className="col-lg-7 p-5">
                    <h1 className="display-4 fw-bold">Cant find what you are looking for?</h1>
                    <p className="lead">
                        If you cannot find what you are looking for, send our library admin's
                        personal message
                    </p>
                    <div className="d-grid gap-2 justify-content-md-start">
                        {isAuthenticated?
                        <Link type="button" className="btn btn-primary text-white" to="/message">Library services</Link>
                        :
                        <Link className="btn btn-primary" to="/login">Sign up</Link>
                        }
                    </div>
                </div>
                <div className="col-lg-4 my-2 offset-lg-1 col-image-main"></div>
            </div>
        </div>
    );
}