import express from "express";
import patientService from "../services/patientService";
import toNewEntry from "../utils/entries";
import toNewPatient from "../utils/patients";

const router = express.Router();

router.get("/", (_req, res) => {
  res.send(patientService.getNonSensitiveEntries());
});

router.post("/", (req, res) => {
  try {
    const newPatient = toNewPatient(req.body);

    const addedEntry = patientService.addPatient(newPatient);
    res.json(addedEntry);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

router.get("/:id", (req, res) => {
  const patientDetail = patientService.findById(req.params.id);

  if (patientDetail) {
    res.send(patientDetail);
  } else {
    res.sendStatus(404);
  }
});

router.post("/:id/entries", (req, res) => {
  try {
    const newEntries = toNewEntry(req.body);

    const addedEntry = patientService.addEntry(req.params.id, newEntries);
    res.json(addedEntry);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

export default router;
