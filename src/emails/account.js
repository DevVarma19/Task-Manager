const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRID_API_KEY)
    // sgMail.setApiKey(<SENDGRID_API_KEY>)
    // sgMail.send({
    //     to: 'varma.dev.01@gmail.com',
    //     from: 'varma.mandapati.1@gmail.com',
    //     subject: 'This is my first creation',
    //     text: 'I hope this one actually get to you'
    // })

const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'varma.mandapati.1@gmail.com',
        subject: 'Thanks for joining in!',
        text: `Welcome to the app, ${name}. Let me know how you get along with the app.` //usinh `` we can easily insert the variables
            //html: ''
    })
}

const sendCancelEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'varma.mandapati.1@gmail.com',
        subject: 'Good Bye!',
        text: `Thank you for using our services ${name}. Could you tell us what we have done to keep to onboard.`
    })
}

module.exports = {
    sendWelcomeEmail,
    sendCancelEmail
}