const express = require("express");
const router = express.Router();
const Era = require("../models/Era");

//Връща всички Ери
router.get('/get/all', async (req,res) => {
    try {
        const eras = await Era.find({}).populate('lessons').lean();
        res.status(200).json(eras);
    } catch(err) {
        res.status(500).json(err);
    }
});

//Връща Ера с дадено ID
router.get("/get/:eraId", async (req, res) => {
    try {
        const era = await Era.findById(req.params.eraId).populate('lessons').lean();
        res.status(200).json(era);
    } catch (err) {
        res.status(500).json(err);
    }
});

//Коментирано е, защото вече не е нужно да се създават ери
//Създава Ера
// router.post("/create", async (req, res) => {
//     const era = new Era(req.body);

//     try {
//         const savedEra = await era.save();
//         res.status(200).json({eraId: savedEra._id});
//     } catch(err) {
//         res.status(500).json(err);
//     }
// });

//Обновява информацията в Ера с дадено ID
router.patch("/update/:eraId", async(req, res) => {
    try {
        const updatedEra = await Era.updateOne(
            { _id: req.params.eraId},
            { $set: req.body }
        );
        res.status(200).json({eraId: `${req.params.eraId}`, message: 'Записът е успешно обновен.'})
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;