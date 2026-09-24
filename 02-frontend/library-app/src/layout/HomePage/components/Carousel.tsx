import { useEffect, useState } from "react";
import { ReturnBook } from "./ReturnBook";
import BookModel from "../../../models/BookModel";
import { SpinerLoading } from "../../Utils/SpinerLoading";

export const Carousel = () => {

    const [books, setBooks] = useState<BookModel[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState(null);

    useEffect(() => {
        const fetchBooks = async () => {
            const baseUrl: string = "http://localhost:8080/api/v1/books"

            const url: string = `${baseUrl}?page=0&size=9`;

            const response = await fetch(url);

            if (!response.ok) {
                throw new Error("Something went wrong")
            }

            const responseJson = await response.json();

            const responseData = responseJson.content;

            const loadedData: BookModel[] = []

            for (const key in responseData) {
                loadedData.push({
                    id: responseData[key].id,
                    title: responseData[key].title,
                    author: responseData[key].author,
                    description: responseData[key].description,
                    copies: responseData[key].copies,
                    copiesAvailable: responseData[key].copiesAvailable,
                    category: responseData[key].category,
                    image: responseData[key].image,
                    deleted: responseData[key].deleted
                });
            }

            setBooks(loadedData);
            setIsLoading(false);
        };
        fetchBooks().catch((error: any) => {
            setIsLoading(false);
            setHttpError(error.message)
        })
    }, [])

    if (isLoading) {
        return (
            <SpinerLoading />
        );
    }

    if (httpError) {
        return (
            <div className="conatiner m-5">{httpError}</div>
        );
    }

    return (
        <div className="mt-5">
            <div className="homepage-carousel-title">
                <h3>Find your next "I stayed up too late reading" book.</h3>
            </div>
            <div id="carouselExampleControls" className="carousel carousel-dark slide mt-5
                d-none d-lg-block" data-bs-interval='false'>
                {/*desktop */}
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <div className="row d-flex justify-content-center align-items-center">
                            {books.slice(0, 3).map(book => (
                                <ReturnBook book={book} key={book.id} />
                            ))}
                        </div>
                    </div>
                    <div className="carousel-item">
                        <div className="row d-flex justify-content-center align-items-center">
                            {books.slice(3, 5).map(book => (
                                <ReturnBook book={book} key={book.id} />
                            ))}
                        </div>
                    </div>
                </div>
                <button className="carousel-control-prev" type="button"
                    data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="sr-only">Previous</span>
                </button>
                <button className="carousel-control-next" type="button"
                    data-bs-target="#carouselExampleControls" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="sr-only">Next</span>
                </button>
            </div>
            {/*mobile*/}
            <div className="d-lg-none">
                <div className="row d-flex justify-content-center align-items-center">
                    {books.length > 0 && <ReturnBook book={books[0]} key={books[0].id} />}
                </div>
            </div>
            <div className="homepage-carousel-title">
                <a className="btn text-white">Show more details</a>
            </div>
        </div>
    );
}