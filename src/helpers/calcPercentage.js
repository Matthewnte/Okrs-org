const CalcPercentage = {
  calcSingleProgress: (objective) => {
    let noOfSubOjectives = 0;
    let sumOfProgress = 0;
    if (!objective.subObjectives) return objective;
    objective.subObjectives.forEach((obj) => {
      sumOfProgress += obj.progress;
      noOfSubOjectives += 1;
    });
    const progress = sumOfProgress / noOfSubOjectives;
    return progress;
  },

  calcKeyResultAverage: (objective) => {
    let noOfKeyResult = 0;
    let sumOfProgress = 0;
    objective.keyResult.forEach((result) => {
      sumOfProgress += result.currentValue;
      noOfKeyResult += 1;
    });
    const keyResultAverage = sumOfProgress / noOfKeyResult;
    return keyResultAverage;
  },

  calcAllProgress: (objectives) => {
    const updatedObjectives = objectives.map((objective) => {
      objective.progress = CalcPercentage.calcSingleProgress(objective);
      return objective;
    });
    return updatedObjectives;
  },

  calcPercentageRelevance: (objective, average) => (objective.percentageRelevance / 100) * average,

  calcSingleGroupProgress: (objective) => {
    let progress;
    if (!objective.keyResult || objective.keyResult.length === 0) return objective.progress;
    const keyResultAverage = CalcPercentage.calcKeyResultAverage(objective);
    const objectiveProgressValue = CalcPercentage.calcPercentageRelevance(
      objective,
      keyResultAverage,
    );
    if (objective.subObjectives || objective.subObjectives.length > 0) {
      const subObjectivesAverage = CalcPercentage.calcKeyResultAverage(objective.subObjectives);
      const subObjectiveProgressValue = CalcPercentage.calcPercentageRelevance(
        objective.subObjectives,
        subObjectivesAverage,
      );
      progress = (objectiveProgressValue + subObjectiveProgressValue) / 2;
    } else {
      progress = objectiveProgressValue;
    }
    return progress;
  },

  calcAllGroupProgress: (objectives) => {
    const updatedObjectives = objectives.map((objective) => {
      objective.progress = CalcPercentage.calcSingleGroupProgress(objective);
      return objective;
    });
    return updatedObjectives;
  },
};

module.exports = CalcPercentage;
