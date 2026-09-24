import BookModel from "./BookModel";

class ShelfPageModel {
    constructor(
    public book: BookModel,
    public leftDays: number
    ) { }
}
export default ShelfPageModel;