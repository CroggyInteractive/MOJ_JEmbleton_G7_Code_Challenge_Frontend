import { Application } from "express";
import axios from "axios";

export default function (app: Application): void {
    app.get('/show-case/:id', async (req, res) => {
        const id = req.params.id;
        try {
            console.log("Fetching case with id", id);
            const response = await axios.get(`http://localhost:4000/get-case/${id}`);
            if(response.status === 200) {
                res.render("show-case", {"case": response.data, isOK: true});
            } else {
                res.render("show-case", {"case": response.data, isOK: false});
            }
            console.log("Successfully saved case with CaseDetails: response", response);
        } catch(error) {
        if (error.response && error.response.status === 404) {
        res.render("case-not-found", {"caseId": id});
        } else {
            console.error('Error:',  error);
        }
        }
    });
}