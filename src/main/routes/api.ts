import { Application } from 'express';
import axios from 'axios';

export default (app: Application) => {

app.post('/api/create-case', async (req, res) => {
    const title = "hello"
    const caseNumber = req.body.caseNumber;
    const description = req.body.description;
    const status = req.body.status;

    const day = req.body['dueDate-day'];
    const month = req.body['dueDate-month'];
    const year = req.body['dueDate-year'];

    const dueDate = `${year}-${month}-${day}T00:00:00`;
    console.log("Setting case details with data:", `${title} - ${caseNumber} - ${description} - ${status} - ${dueDate}`);

    try {
        console.log("Trying to create a new case");
        const response = await axios.post('http://localhost:4000/create', {
            title: title,
            caseNumber: caseNumber,
            description: description,
            status: status,
            dueDate: dueDate
        });

        if (response.status === 200) {
            const caseResponse = response.data.id;
            console.log("Case created", caseResponse);
            res.redirect(`/show-case/${caseResponse}`);
        } else {
            console.log("Case creation error");
            res.redirect('/error');
        }
    } catch (error) {
        console.log("Case creation error in catch");
        console.log(error);
        res.redirect('/error');
    }
});
}

