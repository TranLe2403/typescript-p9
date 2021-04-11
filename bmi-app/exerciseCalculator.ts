type DailyHours = number[];

interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

interface ExerciseCalculator {
  target: number;
  hours: number[];
}

const exerciseCalculatorArguments = (
  args: Array<string>
): ExerciseCalculator => {
  if (args.length < 4) throw new Error("Not enough arguments");

  let target: number;
  const hoursArr: number[] = [];
  if (!isNaN(Number(args[2]))) {
    target = Number(args[2]);
  } else {
    throw new Error("Provided values were not numbers!");
  }

  for (let i = 3; i < args.length; i++) {
    if (!isNaN(Number(args[i]))) {
      hoursArr.concat(Number(args[i]));
    } else {
      throw new Error("Provided values were not numbers!");
    }
  }

  return {
    target: target,
    hours: hoursArr,
  };
};

export const exerciseCalculator = (
  target: number,
  hourArr: DailyHours
): Result => {
  const totalHours = hourArr.reduce((acc, val) => acc + val);
  const aveHours = totalHours / hourArr.length;
  const noTrainingDays = hourArr.filter((item) => item === 0);

  return {
    periodLength: hourArr.length,
    trainingDays: hourArr.length - noTrainingDays.length,
    success: aveHours >= target,
    rating: target,
    ratingDescription: "not too bad but could be better",
    target: target,
    average: aveHours,
  };
};

try {
  const { target, hours } = exerciseCalculatorArguments(process.argv);
  console.log(exerciseCalculator(target, hours));
} catch (e) {
  console.log("Something went wrong, error message: ", e.message);
}
