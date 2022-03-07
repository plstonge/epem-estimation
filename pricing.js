const distanceProperties = {
  min: 0,
  max: 400,
  default: 0,
}

const serviceTypes = [
  {id: 1, name: tr('Pet_sitting')},
  {id: 2, name: tr('Pet_walk')},
  {id: 3, name: tr('Pet_transport')},
  {id: 4, name: tr('Pet_treatment')},
  {id: 5, name: tr('Training_dog')},
]

const serviceHours = {
  start: 6,
  end: 22,
  times: [],
}
for (let hour = serviceHours.start; hour < serviceHours.end; hour++) {
  for (let minutes = 0; minutes < 60; minutes += 15) {
    serviceHours.times.push({
      id: hour * 60 + minutes,
      name: hour.toString() + ':' + minutes.toString().padStart(2, '0')
    })
  }
}
serviceHours.times.push({
  id: serviceHours.end * 60, name: serviceHours.end.toString() + ':00'
})


const pricing = [
  {
    validPeriod: {
      firstDay: new Date('2022-01-01T00:00:00'),
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
