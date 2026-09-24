class HistoryModel {
    constructor(
        public id: number,
        public author: string,
        public title: string,
        public img: string,
        public description: string,
        public checkoutDate: Date,
        public returnDate: Date
    ) { }
}
export default HistoryModel;