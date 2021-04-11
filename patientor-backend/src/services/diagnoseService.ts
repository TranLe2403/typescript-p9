import diagnoses from "../../data/diagnoses";
import { Diagnose } from "../types/Diagnose";

const getEntries = (): Diagnose[] => {
  return diagnoses;
};

export default {
  getEntries,
};
