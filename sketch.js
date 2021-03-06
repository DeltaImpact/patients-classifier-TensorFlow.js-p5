let patients;
let patientsLabelList = ["Болен", "Здоров"];
let normalizedPatients = [];
let patientsLabels = [];
let patientWithLowestValues, patientWithHighestValues;
let model;
let xs, ys;
let patientHeightSlider,
  patientWeightSlider,
  patientLowerPressureSlider,
  patientUpwardPressureSlider,
  patientTemperatureSlider,
  patientPulseSlider,
  patientWhiteBloodCellsSlider,
  patientESRSlider,
  patientMyoglobinSlider,
  patientCholesterolSlider,
  patientHemoglobinSlider,
  patientNeutrophilsSlider,
  patientPlateletsSlider,
  patientHematocritSlider;

let labelP;
let lossP, epochP;
let modelEpoch;

let colorHealthy = "#859900";
let colorIll = "#dc322f";

function preload() {
  patients = loadJSON("patients.json");
}

function setup() {
  createCanvas(1000, 1500);
  textSize(15);
  noStroke();
  patientWithLowestValues = { ...patients.entries[0] };
  patientWithHighestValues = { ...patients.entries[0] };
  for (let patient of patients.entries) {
    Object.keys(patient).forEach(function(key, index) {
      let value = patient[key];
      if (value < patientWithLowestValues[key]) {
        patientWithLowestValues[key] = value;
      }
      if (value > patientWithHighestValues[key])
        patientWithHighestValues[key] = value;
    });
  }
  console.log("Минимальные значения", patientWithLowestValues);
  console.log("Максимальные значения", patientWithHighestValues);

  let distanceBetweenSliders = 30;
  lossP = createP("loss");
  lossP.position(20, 10);
  epochP = createP("epoch");
  epochP.position(lossP.x, lossP.y + distanceBetweenSliders);

  patientHeightSlider = createSlider(
    patientWithLowestValues["Рост"],
    patientWithHighestValues["Рост"],
    patientWithLowestValues["Рост"]
  );
  patientHeightSlider.position(
    epochP.x,
    epochP.y + distanceBetweenSliders + 10
  );
  patientWeightSlider = createSlider(
    patientWithLowestValues["Вес"],
    patientWithHighestValues["Вес"],
    patientWithLowestValues["Вес"]
  );
  patientWeightSlider.position(
    patientHeightSlider.x,
    patientHeightSlider.y + distanceBetweenSliders
  );
  patientLowerPressureSlider = createSlider(
    patientWithLowestValues["Давление нижн."],
    patientWithHighestValues["Давление нижн."],
    patientWithLowestValues["Давление нижн."]
  );
  patientLowerPressureSlider.position(
    patientWeightSlider.x,
    patientWeightSlider.y + distanceBetweenSliders
  );
  patientUpwardPressureSlider = createSlider(
    patientWithLowestValues["Давление верх."],
    patientWithHighestValues["Давление верх."],
    patientWithLowestValues["Давление верх."]
  );
  patientUpwardPressureSlider.position(
    patientLowerPressureSlider.x,
    patientLowerPressureSlider.y + distanceBetweenSliders
  );
  patientTemperatureSlider = createSlider(
    patientWithLowestValues["Температура"] * 10,
    patientWithHighestValues["Температура"] * 10,
    patientWithLowestValues["Температура"] * 10
  );
  patientTemperatureSlider.position(
    patientUpwardPressureSlider.x,
    patientUpwardPressureSlider.y + distanceBetweenSliders
  );
  patientPulseSlider = createSlider(
    patientWithLowestValues["Пульс"],
    patientWithHighestValues["Пульс"],
    patientWithLowestValues["Пульс"]
  );
  patientPulseSlider.position(
    patientTemperatureSlider.x,
    patientTemperatureSlider.y + distanceBetweenSliders
  );
  patientWhiteBloodCellsSlider = createSlider(
    patientWithLowestValues["Лейкоциты"],
    patientWithHighestValues["Лейкоциты"],
    patientWithLowestValues["Лейкоциты"]
  );
  patientWhiteBloodCellsSlider.position(
    patientPulseSlider.x,
    patientPulseSlider.y + distanceBetweenSliders
  );
  patientESRSlider = createSlider(
    patientWithLowestValues["СОЭ"],
    patientWithHighestValues["СОЭ"],
    patientWithLowestValues["СОЭ"]
  );
  patientESRSlider.position(
    patientWhiteBloodCellsSlider.x,
    patientWhiteBloodCellsSlider.y + distanceBetweenSliders
  );
  patientMyoglobinSlider = createSlider(
    patientWithLowestValues["Миоглобин"],
    patientWithHighestValues["Миоглобин"],
    patientWithLowestValues["Миоглобин"]
  );
  patientMyoglobinSlider.position(
    patientESRSlider.x,
    patientESRSlider.y + distanceBetweenSliders
  );
  patientCholesterolSlider = createSlider(
    patientWithLowestValues["Холестирин"],
    patientWithHighestValues["Холестирин"],
    patientWithLowestValues["Холестирин"]
  );
  patientCholesterolSlider.position(
    patientMyoglobinSlider.x,
    patientMyoglobinSlider.y + distanceBetweenSliders
  );
  patientHemoglobinSlider = createSlider(
    patientWithLowestValues["Гемоглобин"],
    patientWithHighestValues["Гемоглобин"],
    patientWithLowestValues["Гемоглобин"]
  );
  patientHemoglobinSlider.position(
    patientCholesterolSlider.x,
    patientCholesterolSlider.y + distanceBetweenSliders
  );
  patientNeutrophilsSlider = createSlider(
    patientWithLowestValues["Нейтрофилы"],
    patientWithHighestValues["Нейтрофилы"],
    patientWithLowestValues["Нейтрофилы"]
  );
  patientNeutrophilsSlider.position(
    patientHemoglobinSlider.x,
    patientHemoglobinSlider.y + distanceBetweenSliders
  );
  patientPlateletsSlider = createSlider(
    patientWithLowestValues["Тромбоциты"],
    patientWithHighestValues["Тромбоциты"],
    patientWithLowestValues["Тромбоциты"]
  );
  patientPlateletsSlider.position(
    patientNeutrophilsSlider.x,
    patientNeutrophilsSlider.y + distanceBetweenSliders
  );
  patientHematocritSlider = createSlider(
    patientWithLowestValues["Гематокрит"],
    patientWithHighestValues["Гематокрит"],
    patientWithLowestValues["Гематокрит"]
  );
  patientHematocritSlider.position(
    patientPlateletsSlider.x,
    patientPlateletsSlider.y + distanceBetweenSliders
  );

  labelP = createP("label");
  labelP.position(patientHematocritSlider.x, patientHematocritSlider.y + 10);

  for (let patient of patients.entries) {
    let normalizedPatient = [
      patient["Рост"] / patientWithHighestValues["Рост"],
      patient["Вес"] / patientWithHighestValues["Вес"],
      patient["Давление нижн."] / patientWithHighestValues["Давление нижн."],
      patient["Давление верх."] / patientWithHighestValues["Давление верх."],
      patient["Температура"] / patientWithHighestValues["Температура"],
      patient["Пульс"] / patientWithHighestValues["Пульс"],
      patient["Лейкоциты"] / patientWithHighestValues["Лейкоциты"],
      patient["СОЭ"] / patientWithHighestValues["СОЭ"],
      patient["Миоглобин"] / patientWithHighestValues["Миоглобин"],
      patient["Холестирин"] / patientWithHighestValues["Холестирин"],
      patient["Гемоглобин"] / patientWithHighestValues["Гемоглобин"],
      patient["Нейтрофилы"] / patientWithHighestValues["Нейтрофилы"],
      patient["Тромбоциты"] / patientWithHighestValues["Тромбоциты"],
      patient["Гематокрит"] / patientWithHighestValues["Гематокрит"]
    ];
    normalizedPatients.push(normalizedPatient);
    patientsLabels.push(patient["Здоров"]);
  }

  xs = tf.tensor2d(normalizedPatients);
  let labelsTensor = tf.tensor1d(patientsLabels, "int32");

  ys = tf.oneHot(labelsTensor, 9).cast("float32");
  labelsTensor.dispose();

  model = tf.sequential();
  const hidden = tf.layers.dense({
    units: 16,
    inputShape: [14],
    activation: "sigmoid"
  });
  const output = tf.layers.dense({
    units: 9,
    activation: "softmax"
  });
  model.add(hidden);
  model.add(output);

  const LEARNING_RATE = 0.25;
  const optimizer = tf.train.sgd(LEARNING_RATE);

  model.compile({
    optimizer: optimizer,
    loss: "categoricalCrossentropy",
    metrics: ["accuracy"]
  });

  train();
}

async function train() {
  // This is leaking https://github.com/tensorflow/tfjs/issues/457
  await model.fit(xs, ys, {
    shuffle: true,
    validationSplit: 0.1,
    epochs: 1500,
    callbacks: {
      onEpochEnd: (epoch, logs) => {
        lossP.html("Логлосс: " + logs.loss.toFixed(5));
        epochP.html("Поколение: " + (epoch + 1));
        modelEpoch = epoch;
      },
      onBatchEnd: async (batch, logs) => {
        await tf.nextFrame();
      },
      onTrainEnd: () => {
        console.log("finished");
      }
    }
  });
}

function getNormalizedSlidersValues() {
  let patientHeight =
    patientHeightSlider.value() / patientWithHighestValues["Рост"];
  let patientWeight =
    patientWeightSlider.value() / patientWithHighestValues["Вес"];
  let patientLowerPressure =
    patientLowerPressureSlider.value() /
    patientWithHighestValues["Давление нижн."];
  let patientUpwardPressure =
    patientUpwardPressureSlider.value() /
    patientWithHighestValues["Давление верх."];
  let patientTemperature =
    patientTemperatureSlider.value() /
    10 /
    patientWithHighestValues["Температура"];
  let patientPulse =
    patientPulseSlider.value() / patientWithHighestValues["Пульс"];
  let patientWhiteBloodCells =
    patientWhiteBloodCellsSlider.value() /
    patientWithHighestValues["Лейкоциты"];
  let patientESR = patientESRSlider.value() / patientWithHighestValues["СОЭ"];
  let patientMyoglobin =
    patientMyoglobinSlider.value() / patientWithHighestValues["Миоглобин"];
  let patientCholesterol =
    patientCholesterolSlider.value() / patientWithHighestValues["Холестирин"];
  let patientHemoglobin =
    patientHemoglobinSlider.value() / patientWithHighestValues["Гемоглобин"];
  let patientNeutrophils =
    patientNeutrophilsSlider.value() / patientWithHighestValues["Нейтрофилы"];
  let patientPlatelets =
    patientPlateletsSlider.value() / patientWithHighestValues["Тромбоциты"];
  let patientHematocrit =
    patientHematocritSlider.value() / patientWithHighestValues["Гематокрит"];

  return [
    [
      patientHeight,
      patientWeight,
      patientLowerPressure,
      patientUpwardPressure,
      patientTemperature,
      patientPulse,
      patientWhiteBloodCells,
      patientESR,
      patientMyoglobin,
      patientCholesterol,
      patientHemoglobin,
      patientNeutrophils,
      patientPlatelets,
      patientHematocrit
    ]
  ];
}

function draw() {
  background(255, 255, 255);
  text(
    "Рост " + patientHeightSlider.value(),
    patientHeightSlider.x + patientHeightSlider.width,
    patientHeightSlider.y + 10
  );
  text(
    "Вес " + patientWeightSlider.value(),
    patientWeightSlider.x + patientWeightSlider.width,
    patientWeightSlider.y + 10
  );
  text(
    "Давление нижн " + patientLowerPressureSlider.value(),
    patientLowerPressureSlider.x + patientLowerPressureSlider.width,
    patientLowerPressureSlider.y + 10
  );
  text(
    "Давление верх. " + patientUpwardPressureSlider.value(),
    patientUpwardPressureSlider.x + patientUpwardPressureSlider.width,
    patientUpwardPressureSlider.y + 10
  );

  text(
    "Температура " + patientTemperatureSlider.value() / 10,
    patientTemperatureSlider.x + patientTemperatureSlider.width,
    patientTemperatureSlider.y + 10
  );
  text(
    "Пульс " + patientPulseSlider.value(),
    patientPulseSlider.x + patientPulseSlider.width,
    patientPulseSlider.y + 10
  );
  text(
    "Лейкоциты " + patientWhiteBloodCellsSlider.value(),
    patientWhiteBloodCellsSlider.x + patientWhiteBloodCellsSlider.width,
    patientWhiteBloodCellsSlider.y + 10
  );
  text(
    "СОЭ " + patientESRSlider.value(),
    patientESRSlider.x + patientESRSlider.width,
    patientESRSlider.y + 10
  );
  text(
    "Миоглобин " + patientMyoglobinSlider.value(),
    patientMyoglobinSlider.x + patientMyoglobinSlider.width,
    patientMyoglobinSlider.y + 10
  );
  text(
    "Холестирин " + patientCholesterolSlider.value(),
    patientCholesterolSlider.x + patientCholesterolSlider.width,
    patientCholesterolSlider.y + 10
  );
  text(
    "Гемоглобин " + patientHemoglobinSlider.value(),
    patientHemoglobinSlider.x + patientHemoglobinSlider.width,
    patientHemoglobinSlider.y + 10
  );
  text(
    "Нейтрофилы " + patientNeutrophilsSlider.value(),
    patientNeutrophilsSlider.x + patientNeutrophilsSlider.width,
    patientNeutrophilsSlider.y + 10
  );
  text(
    "Тромбоциты " + patientPlateletsSlider.value(),
    patientPlateletsSlider.x + patientPlateletsSlider.width,
    patientPlateletsSlider.y + 10
  );
  text(
    "Гематокрит " + patientHematocritSlider.value(),
    patientHematocritSlider.x + patientHematocritSlider.width,
    patientHematocritSlider.y + 10
  );

  strokeWeight(2);
  stroke(255);

  tf.tidy(() => {
    const input = tf.tensor2d(getNormalizedSlidersValues());
    let results = model.predict(input);
    let argMax = results.argMax(1);
    let index = argMax.dataSync()[0];
    if (index == 1) {
      fill(color(colorHealthy));
    }

    if (index == 0) {
      fill(color(colorIll));
    }

    rect(
      0,
      patientHeightSlider.y - 7,
      lossP.x - 10,
      labelP.y +
        labelP.height -
        patientHeightSlider.y +
        patientHeightSlider.height
    );
    fill(0, 0, 0);
    labelP.html(patientsLabelList[index]);
  });

  let healthyGroupX = 400;
  let illGroupX = 600;
  let GroupUnderscoreWidth = 100;
  let GroupUnderscoreHeight = 5;
  text("Здоровые", healthyGroupX, patientHeightSlider.y + 10);
  fill(color(colorHealthy));
  let healthyGroupHeader = rect(
    healthyGroupX,
    patientHeightSlider.y + 15,
    GroupUnderscoreWidth,
    GroupUnderscoreHeight
  );
  fill(0, 0, 0);
  text("Больные", illGroupX, patientHeightSlider.y + 10);
  fill(color(colorIll));
  let illGroupHeader = rect(
    illGroupX,
    patientHeightSlider.y + 15,
    GroupUnderscoreWidth,
    GroupUnderscoreHeight
  );
  fill(0, 0, 0);

  if (modelEpoch > 10) {
    tf.tidy(() => {
      const input = tf.tensor2d(normalizedPatients);
      let results = model.predict(input);
      let argMax = results.argMax(1);
      let index = argMax.dataSync();

      let isValid = true;
      for (let entity of index) {
        if (entity != 0 && entity != 1) {
          isValid = false;
        }
      }

      let distanceBetweenElementsOfList = 20;
      let illGroupLastIndex = 0,
        healthyGroupLastIndex = 0;

      if (isValid) {
        index.forEach(function(item, index, arr) {
          let patient = patients.entries[index];
          let patientHealth = patient["Здоров"];
          let patientPredictedHealth = item;
          if (patientHealth == 1) {
            fill(color(colorHealthy));
          }
          if (patientHealth == 0) {
            fill(color(colorIll));
          }

          if (patientPredictedHealth == 1) {
            rect(
              healthyGroupX,
              patientHeightSlider.y +
                15 +
                15 +
                healthyGroupLastIndex * distanceBetweenElementsOfList,
              5,
              distanceBetweenElementsOfList
            );

            text(
              index,
              healthyGroupX + 8,
              patientHeightSlider.y +
                15 +
                15 +
                15 +
                healthyGroupLastIndex * distanceBetweenElementsOfList
            );
            healthyGroupLastIndex++;
          }

          if (patientPredictedHealth == 0) {
            rect(
              illGroupX,
              patientHeightSlider.y +
                15 +
                15 +
                illGroupLastIndex * distanceBetweenElementsOfList,
              5,
              distanceBetweenElementsOfList
            );
            text(
              index,
              illGroupX + 8,
              patientHeightSlider.y +
                15 +
                15 +
                15 +
                illGroupLastIndex * distanceBetweenElementsOfList
            );
            illGroupLastIndex++;
          }

          fill(0, 0, 0);
        });
      }
    });
  }
}
