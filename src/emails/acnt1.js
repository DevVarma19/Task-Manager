const sgMail = require('@sendgrid/mail')

const sendgridAPIKey = '<SENDGRID_API_KEY>'

sgMail.setApiKey(sendgridAPIKey)

sgMail.send({
    to: 'sai.kakarlapudi@gmail.com',
    from: 'helloMyan@co.in',
    subject: 'This is my first creation!',
    text: 'I hope this one actually get to you.'
})