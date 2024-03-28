const express = require('express')
const router = express.Router()
const vaccinController = require('../controllers/vaccinController')


router.route('/')
     .get(vaccinController.getAllVaccin) //read
     .post(vaccinController.createNewVaccin) //craete
     .patch(vaccinController.updateVaccin) //update
     .delete(vaccinController.deleteVaccin) //delete

router.route('/byIdentifyMember/:identityMember')
     .get(vaccinController.getAllVaccinByIdentityMember) //read


module.exports = router