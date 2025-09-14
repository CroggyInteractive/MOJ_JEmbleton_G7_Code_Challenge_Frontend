import { Application } from 'express';
import axios from 'axios';

export default (app: Application) => {


        // app.get('/api/create-case', async (req, res) => {
        //     try {
        //         // An example of connecting to the backend (a starting point)
        //         const response = await axios.get('http://localhost:4000/get-example-case');
        //         console.log(response.data);
        //         res.render('home', { "example": response.data });
        //     } catch (error) {
        //         console.error('Error making request:', error);
        //         res.render('home', {});
        //     }
        // });



app.post('/api/create-case', async (req, res) => {
    const title = "hello"
    const caseNumber = req.body.caseNumber;
    const description = req.body.description;
    const status = req.body.status;

    const day = req.body['dueDate-day'];
    const month = req.body['dueDate-month'];
    const year = req.body['dueDate-year'];

    // const formattedDay = day.padStart(2, '0');
    // const formattedMonth = month.padStart(2, '0');

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

