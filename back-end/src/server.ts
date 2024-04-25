import bodyParser from 'body-parser';
import express from 'express';
import fs from 'fs';
import cors from 'cors';
import path from 'path';

import { v4 as uuidv4 } from 'uuid';

const app = express();
const port = process.env.PORT || 8001;

const scheduleDataJSON = fs.readFileSync(path.join(__dirname, 'schedules.json'));
const scheduleData = JSON.parse(scheduleDataJSON.toString());

const adminsDataJSON = fs.readFileSync(path.join(__dirname, 'admin.json'));
const adminsData = JSON.parse(adminsDataJSON.toString());

app.use(bodyParser.json());

app.use(cors())

// * [GET] Fetch All Schedules & Filtered Schedules
app.get('/schedules', async (req, res) => {
    let filteredSchedules = []
    let filteredSchedulesByOldestData = []
    let schedules = []

    const email = req.query.email;
    const showOldestData = req.query.showOldestData === 'true'
    const startDate = typeof req.query.startFilterDate === 'string' ? new Date(req.query.startFilterDate) : null;
    const endDate = typeof req.query.endFilterDate === 'string' ? new Date(req.query.endFilterDate) : null;
    const currentDate = new Date();

    if(email){
        schedules = scheduleData.schedules.filter(object => {
            return object.email === email;
        });
    } else {
        schedules = scheduleData.schedules;
    }

    if (showOldestData) {
        filteredSchedulesByOldestData = schedules.filter(schedule => {
            const scheduleDate = new Date(schedule.date);

            if (startDate && endDate) {
                return scheduleDate >= startDate && scheduleDate <= endDate;
            } else {
                return scheduleDate
            }
        });
    } else {
        filteredSchedulesByOldestData = schedules.filter(schedule => {
            const scheduleDate = new Date(schedule.date);

            if (startDate && endDate) {

                return scheduleDate >= currentDate && scheduleDate >= startDate && scheduleDate <= endDate
            } else {
                return scheduleDate >= currentDate
            }
        });
    }

    filteredSchedules = [...filteredSchedulesByOldestData];

    if (filteredSchedules && filteredSchedules.length > 0) {
        res.status(200).json(filteredSchedules);
    } else {
        res.status(404).json({ message: 'No schedules found!' });
    }
})

//* [ADD] Add a new schedule
app.post('/schedules', async (req, res) => {
    const scheduleField = req.body;

    const requiredFields = ['name', 'email', 'date', 'selectedOptions'];

    const missingFields = requiredFields.filter(field => !scheduleField.hasOwnProperty(field));

    if (missingFields && missingFields.length > 0) {
        return res.status(202).json({ message: `Missing required fields: ${missingFields.join(', ')}!` });
    }

    scheduleField.id = uuidv4()
    scheduleField.status = {
        value: "RECEIVED",
        label: "Recebido"
    },

        scheduleData.schedules.push(scheduleField)
    fs.writeFileSync(path.join(__dirname, 'schedules.json'), JSON.stringify(scheduleData, null, 2));
    res.status(200).json({ message: 'Schedule added successfully!', schedule: scheduleField });
})

//* [EDIT] Edit a existent schedule
app.put('/schedules/:id', async (req, res) => {
    const id = req.params.id;
    const updatedScheduleField = req.body;

    const enterpriseIndex = scheduleData.schedules.findIndex(schedule => schedule.id === id);

    if (enterpriseIndex !== -1) {
        scheduleData.schedules[enterpriseIndex] = { ...scheduleData.schedules[enterpriseIndex], ...updatedScheduleField };
        fs.writeFileSync(path.join(__dirname, 'schedules.json'), JSON.stringify(scheduleData, null, 2));
        res.status(200).json({ message: 'Schedule updated successfully!', schedule: updatedScheduleField });
    }
})

//! Admin Routes

//Filter admin users
app.get('/admin', async (req, res) => {
    const email = req.query.email;

    const filteredObject = email && adminsData.admins.filter(object => object.email === email);

    if(filteredObject && filteredObject.length !== 0){
        res.status(200).json(filteredObject);
    }else {
        res.status(404).json({ message: 'Admin access not found!' })
    }
})

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});