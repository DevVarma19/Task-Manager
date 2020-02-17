const nodemailer = require('nodemailer')

var transporter = nodemailer.createTransport({
    service: 'sendinblue',
    auth: {
        user: 'varma.mandapati.1@gmail.com',
        pass: 'YHQxECBSRbGLfmaD'
    }
})

const sendEmailWelcome = (email, name) => {

    var mailOptions = {
        from: 'Darwin@upwork.in',
        to: email,
        subject: 'Acceptance for your proposal on UPWORK.',
        text: `Hello ${name}`
            //html:
    };

    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            console.log(error);

            return res.status(404).send({
                error: 'Unable to send mail.'
            })
        } else {
            console.log('Email sent : ' + info.response);

            return res.send({
                info: "Email sent to : " + email
            })
        }
    });
}

module.exports = {
    sendEmailWelcome
}


//////////////////////////////////////////////////////////////////////
// var mailOptions = {
//     from: 'Darwin@upwork.in',
//     to: 'sai.kakarlapudi@gmail.com',
//     subject: 'Acceptance for your proposal on UPWORK.',
//     text: 'Hello'
//         //html:
// };
// transporter.sendMail(mailOptions, function(error, info) {
//     if (error) {
//         console.log(error);
//     } else {
//         console.log('Email sent : ' + info.response);

//         return res.send({
//             info: "Email sent"
//         })
//     }
// });