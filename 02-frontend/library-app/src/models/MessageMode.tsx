class MessageModel {
    constructor(
    public id: number,
    public title: string,
    public question: string,
    public adminEmail?: string,
    public response?: string,
    public close?: boolean
    ) {}
}
export default MessageModel;