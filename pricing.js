const distanceProperties = {
  min: 0,
  max: 400,
  default: 10,
}

const serviceHours = {
  start: 6,
  end: 22,
}

const serviceTypes = [
  {id: 1, name: tr('Type_sitting')},
  {id: 2, name: tr('Type_walk')},
  {id: 3, name: tr('Type_transport')},
  {id: 4, name: tr('Type_treatment')},
  {id: 5, name: tr('Type_dog_training')},
]

const serviceDurations = []
for (let duration = 30;
     duration <= (serviceHours.end - serviceHours.start) * 60;
     duration += 15) {
  const hours = Math.trunc(duration / 60)
  const minutes = duration % 60
  serviceDurations.push({
    id: duration,
    name: hours.toString() + ':' + minutes.toString().padStart(2, '0')
  })
}

const serviceFreqs = [
  {id: 12, name: tr('Freq_12h')},
  {id: 24, name: tr('Freq_1d')},
  {id: 48, name: tr('Freq_2d')},
  {id: 72, name: tr('Freq_3d')},
  {id: 168, name: tr('Freq_1w')},
  {id: 336, name: tr('Freq_2w')},
  {id: 720, name: tr('Freq_1m')},
]

const pricing = [
  {
    validPeriod: {
      firstDay: new Date('2022-03-01T00:00:00'),
       lastDay: new Date('2023-01-31T23:59:59'),
    },
    highSeason: [
      springBreak = {
        firstDay: new Date('2022-02-19T00:00:00'),
         lastDay: new Date('2022-03-13T23:59:59'),
      },
      summerTime = {
        firstDay: new Date('2022-06-20T00:00:00'),
         lastDay: new Date('2022-09-10T23:59:59'),
      },
      endNewYear = {
        firstDay: new Date('2022-12-20T00:00:00'),
         lastDay: new Date('2023-01-10T23:59:59'),
      },
    ],
    specialDates: {
      '2022': {
        '04': ['15', '16', '17', '18'],        // Pâques
        '05': ['21', '22', '23'],              // Fête des Patriotes
        '06': ['23', '24', '25', '26', '30'],  // St-Jean-Baptiste
        '07': ['01', '02', '03', '04'],        // Fête du Canada
        '09': ['02', '03', '04', '05'],        // Fête du travail
        '10': ['08', '09', '10'],              // Action de grâce
        '12': ['23', '24', '25', '26', '30', '31'],  // Noël
      },
      '2023': {
        '01': ['01', '02', '03'],  // Jour de l'an
      },
    },
    initialVisit: 20.00,
    returningKey: 0.00,
    services: {
      1: {  // Pet_sitting
        halfHour: {low: 28.00, high: 33.00}, fullHour: {low: 49.00, high: 55.00}, xtraHour: 20.00,
      },
      2: {  // Pet_walk
        halfHour: {low: 28.00, high: 33.00}, fullHour: {low: 49.00, high: 55.00}, xtraHour: 30.00,
      },
      3: {  // Pet_transport
        halfHour: {low: 28.00, high: 33.00}, fullHour: {low: 49.00, high: 55.00}, xtraHour: 20.00,
      },
      4: {  // Pet_treatment
        halfHour: {low: 28.00, high: 33.00}, fullHour: {low: 49.00, high: 55.00}, xtraHour: 30.00,
      },
      5: {  // Training_dog
        halfHour: {low: 28.00, high: 33.00}, fullHour: {low: 49.00, high: 55.00}, xtraHour: 35.00,
      },
    },
    transportFee: {
      minimum: 3.20,
      perKm: 0.59,
    },
  },
]
