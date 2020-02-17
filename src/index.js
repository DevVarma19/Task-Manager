const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const app = express()
const port = process.env.PORT

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

app.listen(port, () => {
    console.log('Server is up on port : ' + port)
})




///////////////////////////testspace--------------------------
// const Task = require('./models/task')
// const User = require('./models/user')
// const main = async() => {
//     // const task = await Task.findById('5e36bc2134342888ecb81fdf')
//     // await task.populate('owner').execPopulate() /// It goes and find the owner of the task and now task.owner returns entire profile as an object.
//     // console.log(task.owner)

//     const user = await User.findById('5e36b9e17a5fa35d708e1578')
//     await user.populate('tasks').execPopulate()
//     console.log(user.tasks)

// }
// main()

// const pet = {
//     name: 'Hal'
// }

// pet.toJSON = function() {
//     return {}
// }

// console.log(JSON.stringify(pet))

// const jwt = require('jsonwebtoken')

// const myFunction = async() => {
//     const token = jwt.sign({ _id: 'abc123' }, 'Thisismynewcourse', { expiresIn: '7 days' })
//         ///takes object 1 para, string 2 para. returns a base64 encoded JSON string.
//         ///1 part - Header - contains meta info 
//         ///2 part - body/payload - contains the data we provided. ex: _id. This when decoded returns a JSON obj containing the _id we passed and iat('Issued at') timestamp.
//         ///3 part - signature - used to verify the token later. 
//     console.log(token)

//     const data = jwt.verify(token, 'Thisismynewcourse')
//     console.log(data)
// }

// myFunction()


///adding file upload
// const multer = require('multer')
// const upload = multer({
//     dest: 'images', ///name for the folder where all the uploads will store
//     limits: {
//         fileSize: 1000000
//     },
//     fileFilter(req, file, cb) {

//         // cb(new Error('File must be a PDF'))
//         // cb(undefined, true) //saying nothing went wrong and accept the upload
//         // cb(undefined, false) //reject the upload

//         ///checking for a PDF file
//         // if (!file.originalname.endsWith('.pdf')) {
//         //     return cb(new Error('Please upload a PDF'))
//         // }

//         // cb(undefined, true)

//         if (!file.originalname.match(/\.(doc|docx)$/)) {
//             return cb(new Error('Please upload a Word Document'))
//         }

//         cb(undefined, true)

//     }
// })

// // const errorMiddleware = (req, res, next) => {
// //     throw new Error('From my middleware');
// // }
// app.post('/upload', upload.single('upload'), (req, res) => {
//     res.send()
// }, (error, req, res, next) => {
//     res.status(400).send({ error: error.message })
// })