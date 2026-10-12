import {useAuth0} from "@auth0/auth0-react"
import {useState} from "react"
import {Redirect} from "react-router-dom";
import {AdminMessages} from "./component/AdminMessages";
import {AddNewBook} from "./component/AddNewBook";
import {ChangeQuantityOfBooks} from "./component/ChangeQuantityOfBooks";

export const ManageLibraryPage = () => {

    const {isAuthenticated, user} = useAuth0();
    const [changeQuantityOfBooksClick, setChangeQuantityOfBooksClick] = useState(false);
    const [messagesClick, setMessagesClick] = useState(false);

    const roles = user?.["https://library-app.com/roles"] as string[] | undefined;

    if (!isAuthenticated) {
        return (
            <Redirect to="/home"/>
        );
    }

    if (!roles?.includes("admin")) {
        return (
            <Redirect to="/home"/>
        );
    }

    function addBookClickFunction() {
        setChangeQuantityOfBooksClick(false);
        setMessagesClick(false);
    }

    function changeQuantityOfBooksClickFunction() {
        setChangeQuantityOfBooksClick(true);
        setMessagesClick(false);
    }

    function messagesClickFunction() {
        setChangeQuantityOfBooksClick(false);
        setMessagesClick(true);
    }

    return (
        <div className="container">
            <div className="m-5">
                <h2>Manage Library</h2>
                <nav className="nav nav-tabs" id="nav-tab" role="tablist">
                    <button onClick={addBookClickFunction} className="nav-item nav-link active" id="nav-tab-addBook"
                            data-bs-toggle="tab" role="tab" data-bs-target="#addNewBook" aria-selected="true">
                        Add new book
                    </button>
                    <button onClick={changeQuantityOfBooksClickFunction} className="nav-item nav-link"
                            id="nav-tab-quantity" data-bs-toggle="tab" role="tab"
                            data-bs-target="#changeQuantity" aria-selected="false">
                        Change quantity
                    </button>
                    <button onClick={messagesClickFunction} className="nav-item nav-link" id="nav-tab-message"
                            data-bs-toggle="tab" role="tab" data-bs-target="#message" aria-selected="false">
                        Message
                    </button>
                </nav>
                <div className="tab-content" id="nav-tabContent">
                    <div className="tab-pane fade show active" id="addNewBook" aria-labelledby="nav-tab-addBook">
                        <AddNewBook/>
                    </div>
                    <div className="tab-pane fade" id="changeQuantity" aria-labelledby="nav-tab-quantity">
                        {changeQuantityOfBooksClick ? <ChangeQuantityOfBooks/> : <></>}
                    </div>
                    <div className="tab-pane fade" id="message" aria-labelledby="nav-tab-message">
                        {messagesClick ? <AdminMessages/> : <></>}
                    </div>
                </div>
            </div>
        </div>
    );
}