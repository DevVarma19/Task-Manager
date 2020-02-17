const express = require('express')
const Task = require('../models/task')
const auth = require('../middleware/auth')
const router = new express.Router()

///create new task
router.post('/tasks', auth, async(req, res) => {
    // const task = new Task(req.body)
    const task = new Task({
        ////... is ES6 spread operator copues all the properties from body to the object.
        ...req.body,
        owner: req.user._id
    })
    try {
        await task.save()
        res.status(201).send(task)
    } catch (e) {
        res.status(400).send(e)
    }
})

///fetch all tasks
///GET /tasks?completed=false returns all the incomplete tasks
///Pagination - we used limit and skip
///GET /tasks?limit=10&skip=0 limits to 10 results if skip=0 we get the first 10. ifskip=10 we get the next 10
///GET /tasks?sortBy=createdAt:desc

router.get('/tasks', auth, async(req, res) => {
    const match = {}
    const sort = {}
    if (req.query.completed) {
        match.completed = req.query.completed === 'true'
    }

    if (req.query.sortBy) {
        const parts = req.query.sortBy.split(':')
        sort[parts[0]] = parts[1] === 'desc' ? -1 : 1 ///using terenary operator
    }

    try {
        // const tasks = await Task.find({ owner: req.user._id })
        await req.user.populate({
            path: 'tasks',
            match,
            options: {
                limit: parseInt(req.query.limit),
                skip: parseInt(req.query.skip),
                sort
                // sort: {
                //     // // createdAt: 1  //Ascending
                //     //     completed: 1 //incomplete
                //     // // completed : -1 //completed
                // }
            }
        }).execPopulate()
        res.send(req.user.tasks)
    } catch (e) {
        res.status(500).send()
    }
})

///fetch by ID
router.get('/tasks/:id', auth, async(req, res) => {
    const _id = req.params.id

    try {
        //const task = await Task.findById(_id) ///We need to find multiple params
        const task = await Task.findOne({ _id, owner: req.user._id })

        if (!task) {
            return res.status(404).send()
        }

        res.send(task)
    } catch (e) {
        res.status(500).send(e)
    }
})

///Update
router.patch('/tasks/:id', auth, async(req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['completed', 'description']
    const isValidOperation = updates.every((update) => {
        return allowedUpdates.includes(update)
    })

    if (!isValidOperation) {
        return res.status(400).send({ 'error': 'Invalid Updates!' })
    }

    try {
        const task = await Task.findOne({ _id: req.params.id, owner: req.user._id })

        if (!task) {
            return res.status(404).send()
        }
        ///returns an errror if the User is not present.
        updates.forEach((update) => {
            task[update] = req.body[update]
        })
        await task.save()

        res.send(task)
    } catch (e) {
        res.status(500).send(e)
    }
})

///delete
router.delete('/tasks/:id', auth, async(req, res) => {

    try {
        const task = await Task.findOneAndDelete({
            _id: req.params.id,
            owner: req.user._id
        })

        if (!task) {
            return res.status(404).send()
        }
        res.send(task)
    } catch (e) {
        return res.status(500).send(e)
    }

})

module.exports = router