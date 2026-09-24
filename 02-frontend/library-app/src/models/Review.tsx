class Review {
    constructor(
        public id: number,
        public userEmail: string,
        public localDateTime: Date,
        public rating: number,
        public bookId: number,
        public reviewDescription: string
    ) { }
}
export default Review;