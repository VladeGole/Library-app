import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";

export const Heros = () => {

    const {isAuthenticated} = useAuth0();

    return (
        <div>
            <div className="d-none d-lg-block">
                <div className="row g-0">
                    <div className="col-lg-6">
                        <div className="col-image-left"></div>
                    </div>
                    <div className="col-lg-4 container d-flex justify-content-center align-items-center">
                        <div className="ms-5">
                            <h1>What have you been reading?</h1>
                            <p className="lead">
                                The library team would love to know what you have been reading.
                                Whether it is to learn a new skill or grow within one,
                                we will be able to provide the top content for you!
                            </p>
                            {isAuthenticated?
                            <Link type="button" className="btn btn-primary text-white" to="/search">Explore books</Link>
                            :
                            <Link className="btn btn-primary text-white" to="/login">Sign in</Link>
                            }
                        </div>
                    </div>
                </div>
                <div className="row g-0">
                    <div className="col-4 container d-flex justify-content-center align-items-center">
                        <div>
                            <h1>Our collection is always changing!</h1>
                            <p className='lead'>
                                Try to check in daily as our collection is always changing!
                                We work nonstop to provide the most accurate book selection possible
                                for our Luv 2 Read students! We are diligent about our book selection
                                and our books are always going to be our
                                top priority.
                            </p>
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="col-image-right"></div>
                    </div>
                </div>
            </div>
            
            {/*Mobile*/}
            <div className="d-lg-none">
                <div className="container">
                    <div>
                        <div className="col-image-left"></div>
                    </div>
                    <div className="m-2">
                        <h1>What have you been reading?</h1>
                        <p className="lead">
                            The library team would love to know what you have been reading.
                            Whether it is to learn a new skill or grow within one,
                            we will be able to provide the top content for you!
                        </p>
                        {isAuthenticated?
                        <Link type="button" className="btn btn-primary text-white" to="/search">Explore books</Link>
                        :
                        <Link className="btn btn-primary btn-lg text-white" to="/login">Sign in</Link>
                        }
                    </div>
                    <div>
                        <div className="col-image-right"></div>
                        <div>
                            <h1>Our collection is always changing!</h1>
                            <p className='lead'>
                                Try to check in daily as our collection is always changing!
                                We work nonstop to provide the most accurate book selection possible
                                for our Luv 2 Read students! We are diligent about our book selection
                                and our books are always going to be our
                                top priority.
                            </p> 
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}