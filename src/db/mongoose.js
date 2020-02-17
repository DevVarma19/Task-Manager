///REST API - representational state transfer - Application programming interface
///API allows us to build SW applications.
///REST API allows users to access and modify the resources.

///Every REST API operation is defined with HTTP method and path(URL).
///Create - POST/URL
///Read   - GET/URL
///Update - PATCH/URL
///Delete - DELETE/URL

///HTTP structure is a text. It sends a request and gets a response
// ///Data validation - ex : age must be greater than 18.
// ///Data sanitization - ex : removing empty spaces.


const mongoose = require('mongoose')

///connectionURL with database name as ending and URL parsers as args
mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true //This creates indexes and allows us to quickly access the data in DB.
})