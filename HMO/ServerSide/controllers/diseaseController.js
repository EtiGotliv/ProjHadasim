const Diseas = require('../models/Disease')
//const Vaccin = require('../models/Vaccin')
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')


// @desc Get all diseases
// @route GET /diseases
// @access Private
const getAllDisease = asyncHandler(async (req, res) => {
    const disea = await Diseas.find().lean()
    if (!disea?.length) {
        return res.status(400).json({ message: 'No vaccinatins found' })
    }
    res.json(disea)
})

// @desc Create new disease
// @route GET /disease
// @access Private
const createNewDisease = asyncHandler(async (req, res) => {
    const { id,
        identityMember,
        positiveResultDate,
        recoveryDate, } = req.body;

    // Confirm data
    if (!id || !identityMember|| !positiveResultDate) {
        return res.status(400).json({ message: 'Date of onset of illness must be' });
    }
    // Check if member with the same identity card already exists
    const existingDisease = await Diseas.findOne({ identityMember, _id: { $ne: id } }).lean().exec();
    if (existingDisease) {
        return res.status(409).json({ message: 'Duplicate Disease (based on identity card)' });
    }
    // Create and store new member 
    const diseasess = await Diseas.create({
        identityMember,
        positiveResultDate,
        recoveryDate
    });

    if (diseasess) {//created
        res.status(201).json({ message: `New Disease of ${identityMember} created` });
    } else {
        res.status(400).json({ message: 'Invalid Disease data received' });
    }

})

// @desc Update a disease
// @route PATCH /disease
// @access Private
const updateDisease = asyncHandler(async (req, res) => {
    const { id,
        identityMember,
        positiveResultDate,
        recoveryDate, } = req.body;


    // Confirm data
    if (!id || !identityMember|| !positiveResultDate) {
        return res.status(400).json({ message: 'Date of onset of illness must be' });
    }
    // Does the user exist to update?
    const dise = await Vaccin.findById(id).exec()
    if (!dise) {
        return res.status(400).json({ message: 'Diease Not Found' });
    }

    // Check if member with the same identity card already exists
    const existingDisease = await Diseas.findOne({ identityMember, _id: { $ne: id } }).lean().exec();
    if (existingDisease) {
        return res.status(409).json({ message: 'Duplicate disease (based on identity card)' });
    }

    // Check if memberId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'Invalid disease ID' });
    }

    // Allow updates to the original user 
    if (existingDisease && existingDisease?._id.toString() !== id) {
        return res.status(409).json({ message: 'Duplicate disease' })
    }

    // Find the member by ID
    let disease = await Diseas.findById(id);
    if (!disease) {
        return res.status(404).json({ message: 'Disease not found' })
    }

    // Update member fields
    disease.identityMember = identityMember
    disease.positiveResultDate = positiveResultDate
    disease.recoveryDate = recoveryDate

    // Save updated member
    disease = await disease.save();
    res.json({ message: `Disease with the ID ${vdisease.identityMember} updated` })
})


// @desc Delete a disease
// @route DELETE /disease
// @access Private
const deleteDisease= asyncHandler(async (req, res) => {
    const { id } = req.body

    // Confirm data
    if (!id) {
        return res.status(400).json({ message: 'Disease ID Required' })
    }

    // Does the user exist to delete?
    const disease = await Diseas.findById(id).exec()

    if (!disease) {
        return res.status(400).json({ message: 'Disease not found' })
    }

    const result = await disease.deleteOne()

    const reply = `Disease ${disease.id}  deleted`

    res.json(reply)
})

module.exports = {
    getAllDisease,
    createNewDisease,
    updateDisease,
    deleteDisease
}
