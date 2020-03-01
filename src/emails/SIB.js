const nodemailer = require('nodemailer')

var transporter = nodemailer.createTransport({
    service: 'sendinblue',
    auth: {
        user: 'varma.freelance.01@gmail.com',
        pass: 'YHQxECBSRbGLfmaD'
    }
})

// const sendEmailWelcome = (email, name) => {

//     var mailOptions = {
//         from: 'Darwin@upwork.in',
//         to: email,
//         subject: 'Acceptance for your proposal on UPWORK.',
//         text: `Hello ${name}`
//             //html:
//     };

//     transporter.sendMail(mailOptions, function(error, info) {
//         if (error) {
//             console.log(error);

//             return res.status(404).send({
//                 error: 'Unable to send mail.'
//             })
//         } else {
//             console.log('Email sent : ' + info.response);

//             return res.send({
//                 info: "Email sent to : " + email
//             })
//         }
//     });
// }

// module.exports = {
//     sendEmailWelcome
// }


//////////////////////////////////////////////////////////////////////
var mailOptions = {
    from: 'varma.freelance.01@gmail.co.in',
    to: 'varma.mandapati.1@gmail.com',
    subject: 'Interview for semester and credit transfer',
    html: '<p>Dear Killamsetty Ganesh,</p><br><p>This is to inform you that you have been rejected for the interview that was conducted for the Study abroad and credit transfer program dated on : 19th Feb 2020</p><br><br><p>Your performance was not upto the mark.</p><br><br><br><p>Manu Aggarwal</p><br><p>Team of Internationl Relations</p>'
};
transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
        console.log(error);
    } else {
        console.log('Email sent : ' + info.response);

        return res.send({
            info: "Email sent"
        })
    }
});