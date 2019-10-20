const router = require('express').Router();
const libValidation = require('../middleware/devLib-middlware');
const DevLib = require('../../database/dbAccessFiles/devLib-model');

router.get('/', (req, res) => {
  DevLib.find()
  .then(libs => res.status(200).json({data: libs}))
  .catch(() => res.status(500).json({message: "The DB was unable to get a list of devLibs"}))
})

router.post('/', libValidation.validateLib, (req, res) => {
  const newLib = req.body;
  DevLib.insertLib(newLib)
  .then(devLib => res.status(201).json({data: devLib}))
  .catch(() => res.status(500).json({message: "The DB was unable to create the record"}))
})

router.put('/', libValidation.validateLib, (req, res) => {
  const updatedLib = req.body;
  DevLib.updateLib(updatedLib)
  .then(devLib => res.status(200).json({data: devLib}))
  .catch((err) => res.status(500).json({message: "The DB was unable to update the record", err:  err.message}))
})

router.delete('/', libValidation.validateDeleteLib, (req, res) =>{
  res.status(200).json({message: "hitting the devLib DELETE route"})
})

module.exports = router;