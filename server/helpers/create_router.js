const express = require('express');
const ObjectID = require('mongodb').ObjectID;

const createRouter = function (collection) {

  const router = express.Router();

  // Index
  router.get('/', (req, res) => {
    collection
      .find()
      .toArray()
      .then((docs) => res.json(docs))
      .catch((err) => {
        console.error(err);
        res.status(500);
        res.json({ status: 500, error: err });
      });
  });

  // Show
  router.get('/:id', (req, res) => {
    const id = req.params.id;
    collection
      .findOne({ _id: ObjectID(id) })
      .then((doc) => res.json(doc))
      .catch((err) => {
        console.error(err);
        res.status(500);
        res.json({ status: 500, error: err });
      });
  });

  // Create
  router.post('/', (req, res)=>{
    const newData = req.body;
    console.log("New entry received")
    collection
      .insertOne(newData)
      .then((result) => {
        res.json(result.ops[0])
      })
      .catch((err) => {
        console.error(err);
        res.status(500);
        res.json({ status: 500, error: err });
      });    
  })

  //Destroy
  router.delete('/:id', (req, res) => {
    const id = req.params.id
    console.log("Delete request received")
    collection
    .deleteOne({_id: ObjectID(id)})
    .then((result) => {
      res.json(result)
    })
    .catch((err) => {
        console.error(err);
        res.status(500);
        res.json({ status: 500, error: err });
      });    
  })



  return router;
};

module.exports = createRouter;
