import express from "express";
import { calculateBmi } from "./bmiCalculator";
import { exerciseCalculator } from "./exerciseCalculator";

const app = express();

app.use(express.json());

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  const notHasEnoughParams = !req.query.height || !req.query.weight;

  if (notHasEnoughParams) {
    res.status(400);
    res.send({ error: "malformatted parameters" });
    return;
  }

  const height = Number(req.query.height);
  const weight = Number(req.query.weight);

  res.send({
    weight: weight,
    height: height,
    bmi: calculateBmi(height, weight),
  });
});

app.post("/exercises", (req, res) => {
  const { target, hours }: { target: number; hours: number[] } = req.body;

  const hasEnoughParams: boolean = !!target && !!hours;

  if (!hasEnoughParams) {
    res.status(400);
    res.send({ error: "malformatted parameters" });
    return;
  }

  const result = exerciseCalculator(target, hours);
  res.send(result);
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
