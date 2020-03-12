const express = require('express');
const db = require('./data/hubs-model.js')

const server = express();

server.listen(4000, () => {
  console.log("listening on port 4000...");
});

server.use(express.json());

// HTTP method
// URI : scheme://host_name:port/path?parameter_list

server.get('/', (req, res) => {
  res.send('hello world!');
});

server.get('/favicon.ico', (req, res) => {res.status(204); });

// R - Read (CRUD)
server.get('/hubs', (req, res) => {
  db.find()
    .then(hubs => {
      res.status(200).json({hubs});
    })
    .catch(err => {
      res.status(500).json({success:false, err});
    });
});

// C - Create (CRUD)
server.post('/hubs', (req, res) => {
  const hubInfo = res.body;
  console.log(hubInfo);

  db.add(hubInfo)
    .then(hub => {
      res.status(201).json({success:true, hub})
    })
    .catch(err => {
      res.status(500).json({success:false, err})
    })
});

// Delete /hubs/5
server.delete('/hubs/:id', (req, res) => {
  // const id = req.params.id;
  const {id} =req.params;

  db.remove(id)
    .then(deleted => {
      if (deleted) {
        res.status(204).end();
      } else {
        res.status(404).json({success:false, message:"id not found"});
      }
    })
    .catch(err => {
      res.status(500).json({success:false, err})
    })
})

server.put('/hubs/:id', (req, res) => {

});

server.patch('/hubs/:id', (req, res) => {

});


