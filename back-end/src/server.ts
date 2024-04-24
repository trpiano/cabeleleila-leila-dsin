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

// Fetch All Schedules & Filtered Schedules
app.get('/schedules', async (req, res) => {
    const { email } = req.body;

    const filteredObjects = email && scheduleData.schedules.filter(object => object.email === email);

    if(filteredObjects){
        res.status(200).json(filteredObjects);
    } else if(scheduleData.schedules) {
        res.status(200).json(scheduleData.schedules);
    }else {
        res.status(404).json({ message: 'Schedules not found!' })
    }
})

//Add a new schedule
app.post('/schedules', async (req, res) => {
    const scheduleField = req.body;

    const requiredFields = ['name', 'email', 'date', 'selectedOptions'];

    const missingFields = requiredFields.filter(field => !scheduleField.hasOwnProperty(field));

    if (missingFields.length > 0) {
        return res.status(400).json({ message: `Missing required fields: ${missingFields.join(', ')}!` });
    }

    scheduleField.id = uuidv4()
    scheduleField.status = "RECEIVED"

    scheduleData.schedules.push(scheduleField)
    fs.writeFileSync(path.join(__dirname, 'schedules.json'), JSON.stringify(scheduleData, null, 2));
    res.status(200).json({ message: 'Schedule added successfully!', schedule: scheduleField });
})

//Edit a existent schedule
app.put('/schedules', async (req, res) => {
    const updatedScheduleField = req.body;

    const enterpriseIndex = scheduleData.schedules.findIndex(schedule => schedule.id === updatedScheduleField.id);

    if(!updatedScheduleField.status){
        updatedScheduleField.status = "CHANGED"
    }

    if (enterpriseIndex !== -1) {
        scheduleData.schedules[enterpriseIndex] = { ...scheduleData.schedules[enterpriseIndex], ...updatedScheduleField };
        fs.writeFileSync(path.join(__dirname, 'schedules.json'), JSON.stringify(scheduleData, null, 2));
        res.status(200).json({ message: 'Schedule updated successfully!', schedule: updatedScheduleField });
    }
})

//Filter admin users
app.get('/admin', async (req, res) => {
    const { email } = req.body;

    const filteredObject = email && adminsData.admins.filter(object => object.email === email);

    if(filteredObject){
        res.status(200).json(filteredObject);
    }else {
        res.status(404).json({ message: 'Admin access not found!' })
    }
})

//Add a admin to access list
app.post('/admin', async (req, res) => {
    const adminField = req.body;

    const adminFieldData = {
        name: adminField.name,
        email: adminField.email,
    }

    adminsData.admins.push(adminFieldData)
    fs.writeFileSync(path.join(__dirname, 'admin.json'), JSON.stringify(adminsData, null, 2));
    res.status(200).json({ message: 'Admin added successfully!', admin: adminFieldData });
})

//Delete a existent admin
app.delete('/admin', async (req, res) => {
    const { email } = req.body;

    const adminIndex = adminsData.admins.findIndex(admin => admin.email === email);

    if (adminIndex !== -1) {
        adminsData.admins.splice(adminIndex, 1);
        fs.writeFileSync(path.join(__dirname, 'admin.json'), JSON.stringify(adminsData, null, 2));
        res.status(200).json({ message: 'Admin deleted successfully' });
      } else {
        res.status(404).json({ message: 'Admin not found' });
      }
})

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
  });