const express = require('express');

const server = express();

server.listen(4000, () => {
  console.log('*** listening on port 4000');
});

// global middlware section
server.use(express.json());

server.get('/', (req, res) => {
  res.send('hello world');
});

server.get('/now', (req, res) => {
  res.send(new Date().toISOString());
});

// Add record to the db

server.post('/hubs', (req, res) => {
  const hubInfo = req.body;

  db.add(hubInfo)
    .then(hub => {
      res.status(201).json({success:true, hub});
    })
    .catch(err => {
      res.status(500).json({success:false, err});
    })
})

// Delete records

server.delete('/hubs/:id', (req, res) => {
  const {id} = req.params;

  db.remove(id)
    .then(deleted => {
      if (deleted) {
        res.status(204).end();
      } else {
        res.status(404).json({success: false, message: 'id not found'});
      }
    })
    .catch(err => {
      res.status(500).json({success: false, err});
    });
})

// Modify a record
server.put('/hubs/:id', (req, res) => {
  const {id} = req.params;
  const changes = req.body;

  dbupdate(id, changes)
    .then(updated => {
      if (updated) {
        res.status(200).json({success: true, updates});
      } else {
        res.status(404).json({success: false, })
      }
    })
})