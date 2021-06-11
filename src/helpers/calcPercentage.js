const CalcPercentage = {
  calcKeyResultAverage: (objective) => {
    if (objective.keyResults) {
      const total = objective.keyResults.reduce(
        (result, keyResult) => result + parseInt(keyResult.currentValue, 10),
        0,
      );
      return total / objective.keyResults.length;
    }
  },

  percentageRelevanceProgress: (objective) => {
    const keyResultAverageArray = objective.subObjectives.map((subObjective) => {
      const keyResultAverage = CalcPercentage.calcKeyResultAverage(subObjective);
      return CalcPercentage.calcPercentageRelevance(subObjective, keyResultAverage);
    });

    console.log(keyResultAverageArray);
    return keyResultAverageArray.reduce((a, b) => a + b, 0) / keyResultAverageArray.length;
  },

  calcAllProgress: (objectives) => {
    const updatedObjectives = objectives.map((objective) => {
      objective.progress = CalcPercentage.calcSingleProgress(objective);
      return objective;
    });
    return updatedObjectives;
  },

  calcPercentageRelevance: (objective, average) => (objective.percentageRelevance / 100) * average,

  getSubObjectiveProgress: (objective) => {
    const keyResultAverage = CalcPercentage.calcKeyResultAverage(objective);

    const subObjectiveAverage =
      objective.subObjectives.reduce((result, subObjective) => result + subObjective.progress, 0) /
      objective.subObjectives.length;

    console.log({ keyResultAverage }, { subObjectiveAverage });
    const progress = (keyResultAverage + subObjectiveAverage) / 2;
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
