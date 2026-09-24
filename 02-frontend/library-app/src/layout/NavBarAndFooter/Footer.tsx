import { NavLink } from "react-router-dom";

export const Footer = () => {
    return (
        <div className="main-color">
            <footer className="container d-flex flex-wrap justify-content-between align-items-centerjustify-content-between align-items-center py-5">
                <p className="col-md-4 mb-0 text-white">@Example Library App, Inc</p>
                <ul className="nav col-md-4 justify-content-end">
                    <li className="nav-item">
                        <NavLink to='/home' className="nav-link text-white px-2">Home</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to='/search' className="nav-link text-white px-2">Search</NavLink>
                    </li>
                    <li className="nav-item">
                        <a href="#" className="nav-link text-white px-2">Books</a>
                    </li>
                </ul>
            </footer>
        </div>
    );
}