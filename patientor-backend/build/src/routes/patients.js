"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const patientService_1 = __importDefault(require("../services/patientService"));
const entries_1 = __importDefault(require("../utils/entries"));
const patients_1 = __importDefault(require("../utils/patients"));
const router = express_1.default.Router();
router.get("/", (_req, res) => {
    res.send(patientService_1.default.getNonSensitiveEntries());
});
router.post("/", (req, res) => {
    try {
        const newPatient = patients_1.default(req.body);
        const addedEntry = patientService_1.default.addPatient(newPatient);
        res.json(addedEntry);
    }
    catch (e) {
        res.status(400).send(e.message);
    }
});
router.get("/:id", (req, res) => {
    const patientDetail = patientService_1.default.findById(req.params.id);
    if (patientDetail) {
        res.send(patientDetail);
    }
    else {
        res.sendStatus(404);
    }
});
router.post("/:id/entries", (req, res) => {
    try {
        const newEntries = entries_1.default(req.body);
        const addedEntry = patientService_1.default.addEntry(req.params.id, newEntries);
        res.json(addedEntry);
    }
    catch (e) {
        res.status(400).send(e.message);
    }
});
exports.default = router;
