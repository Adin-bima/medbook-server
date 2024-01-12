const usersRouter = require('../routes/usersRoutes');
const medicationRouter = require('../routes/medicationRoutes')
const hospitalRouter = require("../routes/hospitalRoutes")
const adminRouter = require('../routes/adminRoutes')

function run(app){
  app.use('/users', usersRouter);
  app.use('/admin', adminRouter)
  app.use('/hospitals', hospitalRouter)
  app.use('/medications', medicationRouter)
}

module.exports = {run}