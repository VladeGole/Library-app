export class BookRequestDto {
    constructor(
        public title: string,
        public author: string,
        public description: string,
        public copies: number,
        public category: string,
        public image?: string
    ) {}
}