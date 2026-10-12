import {Loans} from "./component/Loans"

export const Shelf = () => {

    return (
        <div className="container m-5">
            <nav>
                <div className="nav nav-tabs" id="nav-tab" role="tablist">
                    <button className="nav-item nav-link active" id="nav-loans-tab" data-bs-toggle="tab"
                            data-bs-target="#nav-loans" role="tab" aria-controls="nav-loans" aria-selected="true">Loans
                    </button>
                    <button className="nav-item nav-link" id="nav-history-tab" data-bs-toggle="tab"
                            data-bs-target="#nav-history" role="tab" aria-controls="nav-history"
                            aria-selected="false">History
                    </button>
                </div>
            </nav>
            <div className="tab-content" id="nav-tabContent">
                <div className="tab-pane fade show active" id="nav-loans" aria-labelledby="nav-loans-tab">
                    <Loans/>
                </div>
                <div className="tab-pane fade" id="nav-history" aria-labelledb></div>
            </div>
        </div>
    )
}