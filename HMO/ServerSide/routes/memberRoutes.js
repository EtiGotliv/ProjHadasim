const express = require('express')
const router = express.Router()
const memberController = require('../controllers/memberController')

router.route('/')
     .get(memberController.getAllMember) //read
     .post(memberController.createNewMember) //craete

router.route('/byIdentifyMember/:identityMember')
     .get(memberController.getMemberByIdentifyNumber) //read

router.route('/byCity/:city')
     .get(memberController.getMemberByCity) //read

router.route('/:id_')
     .get(memberController.getMemberById) //read
     .patch(memberController.updateMember) //update
     .delete(memberController.deleteMember) //delete

  
module.exports = router