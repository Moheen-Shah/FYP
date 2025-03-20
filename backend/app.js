

const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');
const resisdentRouter = require('./Router/resisdentRouter')
const addedResisdentRouter = require('./Router/addedResisdentRouter')
const adminRouter = require('./Router/adminRouter')
const staffRouter  = require('./Router/staffRouter')
const activityRouter = require('./Router/activityRouter')
const assignmentRoutes = require('./Router/assignmentRouter')

const doctorRoutes = require('./Router/doctorRouter')
const app = express()
 



app.use(express.json())
app.use(express.static('./public'))
app.use(cors());
app.use(bodyParser.json());


app.use('/api/v1/resisdents',resisdentRouter);
app.use('/api/v1/added-resisdents',addedResisdentRouter);
app.use('/api/v1/admins',adminRouter)
app.use('/api/v1/staff',staffRouter)
app.use('/api/v1/activities',activityRouter)
app.use('/api/v1/assignments', assignmentRoutes);
app.use('/api/v1/doctors', doctorRoutes);




module.exports = app     