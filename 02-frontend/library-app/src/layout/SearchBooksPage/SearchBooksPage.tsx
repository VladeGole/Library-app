import { useEffect, useState } from "react";
import BookModel from "../../models/BookModel";
import { SpinerLoading } from "../Utils/SpinerLoading";
import { SearchBooks } from "./component/SearchBooks";
import { Pagination } from "../Utils/Pagination";

export const SearchBooksPage = () => {
    const [books, setBooks] = useState<BookModel[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [booksPerPages, setBooksPerPages] = useState(5);
    const [totalAmountOfBooks, setTotalAmountOfBooks] = useState(0);
    const [search, setSearch] = useState('');
    const [searchUrl, setSearchUrl] = useState('');
    const [bookCategory, setBookCategory] = useState('Book category')

    useEffect(() => {

        const fetchBooks = async () => {

            const baseUrl: string = "http://localhost:8080/api/v1/books";

            let url: string = '';

            if (searchUrl === '') {
                url = `${baseUrl}?page=${currentPage - 1}&size=${booksPerPages}`;
            } else {
                let searchWithPage = searchUrl.replace('<pageNumber>', `${currentPage - 1}`);
                url = baseUrl + searchWithPage;
            }

            const response = await fetch(url);

            if (!response.ok) {
                throw new Error("Something went wrong");
            }

            const responseJson = await response.json();

            setTotalAmountOfBooks(responseJson.totalElements);
            setTotalPages(responseJson.totalPages);

            const responseData = responseJson.content;

            const loadedData: BookModel[] = [];

            for (const key in responseData) {
                loadedData.push(
                    {
                        id: responseData[key].id,
                        title: responseData[key].title,
                        author: responseData[key].author,
                        description: responseData[key].description,
                        copies: responseData[key].copies,
                        copiesAvailable: responseData[key].copiesAvailable,
                        category: responseData[key].category,
                        image: responseData[key].image,
                        deleted: responseData[key].deleted
                    }
                )
            }

            setBooks(loadedData);
            setIsLoading(false);
            window.scrollTo(0, 0);
        }
        fetchBooks().catch((error: any) => {
            setIsLoading(false);
            setHttpError(error.message);
        })
    }, [currentPage, searchUrl])

    if (isLoading) {
        return (
            <SpinerLoading />
        );
    }

    if (httpError) {
        return (
            <div>{httpError}</div>
        );
    }

    const setUrlHandle = () => {
        setCurrentPage(1);
        if (search === '') {
            setSearchUrl('');
        } else {
            setSearchUrl(`?search=${search}&page=<pageNumber>&size=${booksPerPages}`)
        }
    }

    const setCategoryOfBooks = (value: string) => {
        setCurrentPage(1);
        if (value.toLowerCase() === 'be' ||
            value.toLowerCase() === 'fe' ||
            value.toLowerCase() === 'data' ||
            value.toLowerCase() === 'devops'
        ) {
            setBookCategory(value);
            setSearchUrl(`?search=${value}&page=<pageNumber>&size=${booksPerPages}`);
        } else {
            setBookCategory("All");
            setSearchUrl("");
        }
    }

    const lastIndexOfBook = currentPage * booksPerPages;
    const firstIndexOfBook = lastIndexOfBook - booksPerPages;
    let item = currentPage * booksPerPages >= totalAmountOfBooks ? totalAmountOfBooks : currentPage * booksPerPages;
    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    return (
        <div className="container">
            <div className="row mt-5">
                <div className="col-6">
                    <div className="d-flex">
                        <input className="form-control me-2" type="search" placeholder="Search" aria-label="search" onChange={e => setSearch(e.target.value)} />
                        <button className="btn btn-outline-success" onClick={() => setUrlHandle()}>Search</button>
                    </div>
                </div>
                <div className="col-4">
                    <div className="dropdown">
                        <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown">
                            {bookCategory}
                        </button>
                        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                            <li onClick={() => setCategoryOfBooks("All")}>
                                <a className="dropdown-item" href="#">All</a>
                            </li>
                            <li onClick={() => setCategoryOfBooks("BE")}>
                                <a className="dropdown-item" href="#">Backend</a>
                            </li>
                            <li onClick={() => setCategoryOfBooks("FE")}>
                                <a className="dropdown-item" href="#">Frontend</a>
                            </li>
                            <li onClick={() => setCategoryOfBooks("DEVOPS")}>
                                <a className="dropdown-item" href="#">Dev Ops</a>
                            </li>
                        </ul>
                    </div>
                </div>
                {totalAmountOfBooks > 0 ?
                    <>
                        <div className="mt-3">
                            <h5>Number of results: {totalAmountOfBooks}</h5>
                            <p>{firstIndexOfBook + 1} to {item} of {totalAmountOfBooks} item</p>
                        </div>
                        {books.map(book => (
                            <SearchBooks book={book} key={book.id} />
                        ))}
                        <Pagination currentPage={currentPage} totalPages={totalPages} paginate={paginate} />
                    </>
                    :
                    <div className="m-5">
                        <h3>Can`t find what you are looking for?</h3>
                        <a className="btn btn-primary text-white fw-5" href="#">Library services</a>
                    </div>
                }
            </div>
        </div>
    );

}