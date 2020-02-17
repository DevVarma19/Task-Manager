const sgMail = require('@sendgrid/mail')

const sendgridAPIKey = '<SENDGRID_API_KEY>'

sgMail.setApiKey(sendgridAPIKey)

sgMail.send({
    to: 'varma.mandapati.1@gmail.com',
    from: 'varma.mandapati.1@gmail.com',
    subject: 'This is my first creation!',
    text: 'I hope this one actually get to you.'
})