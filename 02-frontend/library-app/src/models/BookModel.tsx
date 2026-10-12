class BookModel {
    constructor(
        public id: number,
        public title: string,
        public deleted: boolean,
        public author?: string,
        public description?: string,
        public copies?: number,
        public copiesAvailable?: number,
        public category?: string,
        public image?: string
    ) {}
}
export default BookModel;