const express = require('express')
const sharp = require('sharp')
const multer = require('multer')
const User = require('../models/user')
const auth = require('../middleware/auth')
const { sendWelcomeEmail, sendCancelEmail } = require('../emails/account')
    // const { sendWelcomeEmail } = require('../emails/SIB')
const router = new express.Router()

router.post('/users', async(req, res) => {
    const user = new User(req.body)

    try {
        await user.save()
        sendWelcomeEmail(user.email, user.name)
        const token = await user.generateAuthToken()
        res.status(201).send({ user, token })
    } catch (e) {
        res.status(400).send(e)
    }
})

router.post('/users/login', async(req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password) ///The method is created in models.
        const token = await user.generateAuthToken()
        res.send({ user, token })
    } catch (e) {
        res.status(400).send()
    }
})

///Logout from current session
router.post('/users/logout', auth, async(req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token ///This returns a filtered array that doesn't contain the current token but contains everything else.
        })
        await req.user.save()

        res.send()
    } catch (e) {
        res.status(500).send()
    }
})

///Logout from all sessions
router.post('/users/logoutAll', auth, async(req, res) => {
    try {
        req.user.tokens = []
        await req.user.save()
        res.send()
    } catch (e) {
        res.status(500).send()
    }
})

router.get('/users/me', auth, async(req, res) => {
    res.send(req.user)
})

////The above one does the same thing.
// router.get('/users/:id', async(req, res) => {
//     const _id = req.params.id

//     try {
//         const user = await User.findById(_id)

//         if (!user) {
//             return res.status(404).send()
//         }

//         res.send(user)
//     } catch (e) {
//         res.status(500).send()
//     }
// })


///
router.patch('/users/me', auth, async(req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password', 'age']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
        updates.forEach((update) => req.user[update] = req.body[update])
        await req.user.save()
        res.send(req.user)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.delete('/users/me', auth, async(req, res) => {
    ///We can also add the code to delete all the tasks related to this user
    try {
        // const user = await User.findByIdAndDelete(req.user._id)

        // if (!user) {
        //     return res.status(404).send()
        // }
        ///replaced the above fn with this remove fn.
        await req.user.remove()
        sendCancelEmail(req.user.email, req.user.name)
        res.send(req.user) ///we no further have a standalone user so we need to use req.user
    } catch (e) {
        res.status(500).send()
    }
})

//upload profilepic
const upload = multer({
    // dest: 'avatars', we are now storing the binary data of avatars. 
    limits: {
        fileSize: 1000000
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return cb(new Error('Please upload an Image'))
        }

        cb(undefined, true)
    }
})

///used for creating and updating the profile pic
router.post('/users/me/avatar', auth, upload.single('avatar'), async(req, res) => {
    const buffer = await sharp(req.file.buffer).resize({ width: 250, height: 250 }).png().toBuffer()
        // req.user.avatar = req.file.buffer
    req.user.avatar = buffer //saving the modified image 
    await req.user.save()
    res.send()
}, (error, req, res, next) => {
    res.status(400).send({ error: error.message })
})

///used to wipe out the image
router.delete('/users/me/avatar', auth, async(req, res) => {
    req.user.avatar = undefined
    await req.user.save()
    res.send()
})

router.get('/users/:id/avatar', async(req, res) => {
    try {
        const user = await User.findById(req.params.id)

        if (!user || !user.avatar) {
            throw new Error('')
        }

        res.set('Content-Type', 'image/png') ///setting header
        res.send(user.avatar)
    } catch (e) {
        res.status(404).send()
    }
})


module.exports = router