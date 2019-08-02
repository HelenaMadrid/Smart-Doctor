const express = require("express");
const router = express.Router();
const passport = require("passport");

const Patient = require("../../models/Patient");

// @route GET api/patients
// @desc Get all projects for a specific user
// @access Private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    let patientsArr = [];

    // Member projects
    // await Patient.find({})
    //   .then(patients => {
    //     patients.map(patient => {
    //       patientsArr.push(patient);
    //     });
    //   })
    //   .catch(err => console.log(err));

    const OWNER = {
      id: req.user.id,
      name: req.user.name,
      email: req.user.email
    };

    // Combine with owner projects
    await Patient.find({ owner: OWNER })
      .then(patients => {
        let finalArr = [...patients, ...patientsArr];
        res.json(finalArr);
      })
      .catch(err => console.log(err));
  }
);

// @route GET api/patients/:id
// @desc Get specific project by id
// @access Private
router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    let id = req.params.id;

    Patient.findById(id).then(patient => res.json(patient));
  }
);

// @route POST api/patients/create
// @desc Create a new project
// @access Private
router.post(
  "/create",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const OWNER = {
      id: req.user.id,
      name: req.user.name,
      email: req.user.email
    };

    const NEW_PATIENT = await new Patient({
      owner: OWNER,
      name: req.body.patientName,
      age: req.body.age,
      height: req.body.height,
      weight: req.body.weight
    });

    NEW_PATIENT.save().then(patient => res.json(patient));
  }
);

// @route PATCH api/patients/update
// @desc Update an existing project
// @access Private
router.patch(
  "/update",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    let patientFields = {};

    patientFields.name = req.body.patientName;

    Patient.findOneAndUpdate(
      { _id: req.body.id },
      { $set: patientFields },
      { new: true }
    )
      .then(patient => {
        res.json(patient);
      })
      .catch(err => console.log(err));
  }
);

// @route DELETE api/patients/delete/:id
// @desc Delete an existing project
// @access Private
router.delete(
  "/delete/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Patient.findById(req.params.id).then(patient => {
      patient.remove().then(() => res.json({ success: true }));
    });
  }
);

module.exports = router;
