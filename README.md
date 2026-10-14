📚 Library App – an online book rental application

Library App is a web application for renting books over the internet – like a library, only without the trip and the queue. A user opens the site, finds a book, rents it with one click, and later returns it or extends the loan with just a few more clicks.

🎯 What problem does it solve?

Older online bookstores and library systems are often slow and cluttered. They may also show a book as available when it has actually already been rented out. Library App addresses this:

✅ Fast, clear search – books can be searched by title and category.
✅ Accurate stock levels – the app always knows how many copies are free and won't let anyone rent a book that is out of stock.
✅ Secure sign-in – passwords and logins are handled by a specialised service (Auth0), so we never store passwords ourselves.
✅ A dedicated admin panel – only administrators can add, edit and delete books.
👥 Who can do what?
Role	What they can do
Guest (not signed in)	Browse the catalogue, search for books, read reviews
Member (signed in)	Everything a guest can, plus: rent books, return them, extend loans, leave reviews, message support, view their own history
Administrator	Add new books, change the number of copies, delete books, and reply to user messages
🖼️ What the app looks like

Home page

The entry point of the app: a title, a slogan, a button to explore the most popular books, a slider with the newest books, and information about support.

<img width="1913" height="945" alt="homepage2" src="https://github.com/user-attachments/assets/a39470d3-0d61-4175-9be2-8dac75f771af" />
<img width="1899" height="952" alt="homepage1" src="https://github.com/user-attachments/assets/b4c8aaa9-ef04-4762-a777-f6c67d53d176" />


Navigation – on desktop and on mobile

The app adapts to the screen size. On smaller screens the menu turns into a "hamburger" button.

Desktop	Mobile
Show Image	Show Image
Search and book catalogue

The user types part of a title, picks a category (e.g. FE, BE, Data, DevOps) and gets a list of results. Results are shown page by page (pagination), so the site stays fast even with a large number of books.

Show Image Show Image

Single book page

Shows the cover, title, author, description, ratings and the number of available copies. This is where a book is rented, and below it are reviews from other readers. A signed-in user can also leave their own rating and comment.

Desktop	Mobile
Show Image	Show Image
My shelf (rented books and history)

Each member's personal space. Tabs separate current loans from the history of all returned books. By clicking Manage Loan, the user can:

🔁 extend the loan for another 7 days (Renew loan for 7 days),
📥 return the book (Return book).

Show Image Show Image

Messages and support

If a user has a question or a problem, they can write to the administrators. Next to each question it shows whether a reply has arrived or is still pending (Pending response from administrator).

Show Image

Sign-in

Sign-in is handled through an Auth0 page – with an e-mail and password or a Google account. Protected pages (shelf, messages, administration) are not available to signed-out users; the system sends them to the sign-in page automatically.

Show Image

Admin panel

Only a user with the admin role can see it; everyone else is sent back to the home page. The panel has three parts:

Add a new book – title, author, category, description, quantity and cover image.
Change quantity and delete – increase or decrease the number of copies and remove a book from the catalogue.
User messages – view questions and send replies.

Show Image Show Image

⚙️ How it all works (in plain words)

The app has three parts that work together, much like a restaurant:

  USER                DINING ROOM (Frontend)    KITCHEN (Backend)           PANTRY (Database)
  in a browser  --->  React application   --->  Java / Spring Boot   --->   MySQL
  "I want a book"     what you see on           checks rules,               stores all books,
                      the screen                permissions and stock       loans and messages
Frontend (React) – what the user sees and clicks.
Backend (Java + Spring Boot) – the "brain" of the app: checks whether copies are available, whether the user is signed in, and whether they are allowed to perform the requested action.
Database (MySQL) – stores all data permanently.

The frontend never talks to the database directly, only through the backend. This keeps the database credentials hidden, which is safer.

What is stored in the database?
Table	What it contains
book	Books: title, author, description, total and available copies, category, image
checkout	Current loans: who rented which book and until when
history	Archive of returned books
review	Ratings (1–5) and comments
messages	User questions and administrator replies

Show Image

🧰 Technologies used
Part	Technology
Backend	Java, Spring Boot, Spring Security, Spring Data JPA
Frontend	React, TypeScript, Bootstrap 5
Database	MySQL
Sign-in and roles	Auth0 (OAuth2 / JWT tokens)
Communication	REST API (JSON)
🔌 REST API overview (for developers)
<details> <summary>Click to show endpoints</summary>

Books – /api/v1/books

GET /api/v1/books – list of books (pagination, search by title/category)
GET /api/v1/books/{id} – book details
PUT /api/v1/books/secure/checkout – rent a book
PUT /api/v1/books/secure/return – return a book
PUT /api/v1/books/secure/renew/loan – extend a loan
GET /api/v1/books/secure/checkout/count – number of the user's active loans

Reviews – /api/v1/reviews

POST /api/v1/reviews/secure – new review
GET /api/v1/reviews/{bookId} – reviews for a book
GET /api/v1/reviews/secure/exists/book/{bookId} – whether the user has already reviewed the book
DELETE /api/v1/reviews/{bookId} – delete a review

Administration – /api/v1/admins (administrators only)

POST /api/v1/admins/secure/book – add a book
PATCH /api/v1/admins/secure/increase/book/{id} – +1 copy
PATCH /api/v1/admins/secure/decrease/book/{id} – −1 copy

Messages – /api/v1/messages

POST /api/v1/messages/secure/create – new message
GET /api/v1/messages/secure/all – the user's messages
GET /api/v1/messages/secure/close – closed (answered) messages
PUT /api/v1/messages/secure/admin/message – administrator's reply

All routes containing /secure/ require a signed-in user (JWT token).
