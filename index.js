const express = require('express');
const Lessons = require('./models/dbHelpers')


const server = express();

server.use(express.json());

const PORT = 3000;

server.get('/', (req, res) => {
    res.json({ message: "this is a server"})
});

server.post('/api/lessons', (req, res) => {
    Lessons.add(req.body)
    .then(lesson => {
        res.status(200).json(lesson);
    })
    .catch(error => {
        res.status(500).json({ message: "cannot add lesson" });
    });
});

server.get('/api/lessons', (req, res) => {
    Lessons.find()
    .then(lessons => {
     res.status(200).json(lessons)   
    })
    .catch(error => {
        res.status(500).json({ message: "Unable to retrieve lessons"});
    })
})

server.get('/api/lessons/:id', (req, res) => {
    const { id } = req.params;
    Lessons.findById(id)
    .then(lesson => {
        if (lesson) {
            res.status(200).json(lesson)
        } else {
            res.status(404).json({ message: "Record not found"})
        }
    })
    .catch(error => {
        res.status(500).json({ message: "unable to do the work"})
    });
});

server.delete('/api/lessons/:id', (req, res) => {
    const { id } = req.params;
    Lessons.remove(id)
    .then(count => {
        if (count > 0) {
            res.status(200).json({ message: "Deleted"})
        } else {
            res.status(404).json({ message: "Unable to locate record"})
        }
    })
    .catch(error => {
        res.status(500).json({ message: "Unable to delete"})
    }); 
});

server.patch('/api/lessons/:id', (req, res) => {
    const { id } = req.params
    const changes = req.body

    Lessons.update(id, changes)
    .then(lesson => {
        if (lesson) {
            res.status(200).json(lesson)
        } else {
            res.status(404).json({ message: "record not found"})
        }
    })
    .catch(error => {
        res.status(500).json({ message: "cannot perform the action"})
    })
})


server.listen(PORT, () => {
    console.log(`The server is listening on port: ${PORT}`);
});