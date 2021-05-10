const express = require('express');
const Lessons = require('../models/dbHelpers')

const router = express.Router();

server.delete('/:id', (req, res) => {
    const { id } = req.params

    Lessons.removeMessage(id)
    .then(count => {
        if (count > 0) {
            res.status(200).json({ message: `Message with id ${id} successfully blown up!`})
        } else {
            res.status(404).json({ message: "unable to locate message"})
        }
    })
    .catch(err => {
        res.status(500).json({ message: 'Error deleting message'})
    })
})

module.exports = router;