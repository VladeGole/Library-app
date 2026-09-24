import ShelfPageModel from "../../../models/ShelfPageModel";

export const LoansModel: React.FC<{ shelfPageModel: ShelfPageModel, returnBook: any, returnBookDate: any }> = (props) => {

    return (
        <div className="modal fade" id={`modal${props.shelfPageModel.book.id}`}
            aria-hidden="true" aria-labelledby="modelCenterTitle">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Loans</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <div className="container">
                            <div className="row mt-2">
                                <div className="col-2">
                                    {props.shelfPageModel.book.image ?
                                        <img src={props.shelfPageModel.book.image} width={56} height={87} />
                                        :
                                        <img src={require("../../../Image/BookImage/book-luv2code-1000.png")} />
                                    }
                                </div>
                                <div className="col-6">
                                    <h4>{props.shelfPageModel.book.author}</h4>
                                    <h4>{props.shelfPageModel.book.title}</h4>
                                </div>
                            </div>
                            <hr />
                            {props.shelfPageModel.leftDays > 0 &&
                                <p className="text-secondary">Due in {props.shelfPageModel.leftDays}</p>
                            }
                            {props.shelfPageModel.leftDays < 0 &&
                                <p className="text-secondary">Past due by {props.shelfPageModel.leftDays}</p>
                            }
                            {props.shelfPageModel.leftDays === 0 &&
                                <p className="text-secondary">Today</p>
                            }
                            <div className="list-group">
                                <button onClick={() => {props.returnBook(props.shelfPageModel.book.id)}} type="button" data-bs-dismiss="modal" className="list-group-item list-group-item-action">
                                    Return book
                                </button>
                                <button onClick={() => props.returnBookDate(props.shelfPageModel.book.id)} disabled={props.shelfPageModel.leftDays < 0} type="button" className={props.shelfPageModel.leftDays < 0 ? "list-group-item list-group-item-action inactiveLink" :
                                    "list-group-item list-group-item-action"
                                }>
                                    {props.shelfPageModel.leftDays < 0 ? "Late dues cannot be renewed" : "Renew loan for 7 days"}
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>
    )
} 