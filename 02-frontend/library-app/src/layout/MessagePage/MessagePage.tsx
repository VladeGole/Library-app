import { Message } from "./component/Message"
import { PostNewMessage } from "./component/PostNewMessage"

export const MessagePage = () => {
    return (
        <div className="m-5">
            <nav className="nav nav-tabs" id="myTab" role="tablist">
                <button className="nav-item nav-link active" id="nav-question" data-bs-toggle="tab" data-bs-target="#question" role="tab" aria-selected="true">
                    Submit Question
                </button>
                <button className="nav-item nav-link" id="nav-response" data-bs-toggle="tab" data-bs-target="#response" role="tab" aria-selected="false">
                    Q/A response/panding
                </button>
            </nav>
            <div className="tab-content" id="nav-tabContent">
                <div className="tab-pane fade show active" id="question" aria-labelledby="nav-question">
                    <PostNewMessage/>
                </div>
                <div className="tab-pane fade" id="response" aria-labelledby="nav-response">
                    <Message/>
                </div>
            </div>
        </div>
    )
}