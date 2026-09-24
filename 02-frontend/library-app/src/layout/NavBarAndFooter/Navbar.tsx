import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { SpinerLoading } from "../Utils/SpinerLoading";
import { MessagePage } from "../MessagePage/MessagePage";

export const Navbar = () => {
    const [roles, setRoles] = useState<string[] | null>(null)
    const [isLoading, setIsLoading] = useState(true);
    const { isAuthenticated, loginWithRedirect, logout, getIdTokenClaims } = useAuth0();

    useEffect(() => {
        const fetchRoles = async () => {
            const claims = await getIdTokenClaims();
            const roles = claims?.['https://devla2-react-library.com/roles'] || [];
            setRoles(roles);
            setIsLoading(false)
        }
        fetchRoles();
    }, [isAuthenticated, getIdTokenClaims])

    if (isLoading) {
        return(
            <SpinerLoading/>
        )
    }


    const handleLogin = () => {
        loginWithRedirect();
    };

    const handleLogout = () => {
        logout({ logoutParams: { returnTo: window.location.origin } })
    };

    return (
        <nav className='navbar navbar-expand-lg navbar-dark main-color py-3'>
            <div className='container-fluid'>
                <span className='navbar-brand'>Luv2</span>
                <button className='navbar-toggler' type='button'
                    data-bs-toggle='collapse' data-bs-target='#navbarNavDropdown'
                    aria-controls='navbarNavDropdown' aria-expanded='false'
                    aria-label='Toggle Navigation'
                >
                    <span className='navbar-toggler-icon'></span>
                </button>
                <div className='collapse navbar-collapse' id='navbarNavDropdown'>
                    <ul className='navbar-nav'>
                        <li className='nav-item'>
                            <NavLink className='nav-link' to='/home'>Home</NavLink>
                        </li>
                        <li className='nav-item'>
                            <NavLink className='nav-link' to='/search'>Search Books</NavLink>
                        </li>
                        { isAuthenticated &&
                        <li>
                            <NavLink className="nav-link" to="/shelf">Shelf</NavLink>
                        </li>
                        }

                        { isAuthenticated &&
                        <li>
                            <NavLink className="nav-link" to="/message">Message</NavLink>
                        </li>
                        }
                    </ul>
                    {!isAuthenticated ?
                        <ul className='navbar-nav ms-auto'>
                            <li className='nav-item m-1'>
                                <button type='button' className='btn btn-outline-light' onClick={handleLogin}>Sign in</button>
                            </li>
                        </ul>
                        :
                        <ul className='navbar-nav ms-auto'>
                            <li className='nav-item m-1'>
                                <button type='button' className='btn btn-outline-light' onClick={handleLogout}>Logout</button>
                            </li>
                        </ul>
                    }
                </div>
            </div>
        </nav>
    );
}
