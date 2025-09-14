import { Application } from "express";

export default function (app: Application): void {
    app.get('/create-case', async (req, res) => {
        res.render('create-case', {} );
    })
}