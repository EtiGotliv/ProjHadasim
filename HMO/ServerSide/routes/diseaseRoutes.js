const express = require('express')
const router = express.Router()
const diseaseController = require('../controllers/diseaseController')

router.route('/')
     .get(diseaseController.getAllDisease) //read
     .post(diseaseController.createNewDisease) //craete
     .patch(diseaseController.updateDisease) //update
     .delete(diseaseController.deleteDisease) //delete

module.exports = router