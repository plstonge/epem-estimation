const distance_properties = {
  min: 0,
  max: 400,
  default: 0,
}

const service_types = [
  {id: 0, name: tr('Initial_visit')},
  {id: 1, name: tr('Pet_sitting')},
  {id: 2, name: tr('Pet_walk')},
  {id: 3, name: tr('Pet_transport')},
  {id: 4, name: tr('Pet_treatment')},
  {id: 5, name: tr('Training_dog')},
  {id: 99, name: tr('Bringing_key')},
]

const pricing = [
  {
    valid_period: {
      first_day: new Date('2022-01-01T00:00:00'),
       last_day: new Date('2023-01-31T23:59:59'),
    },
    high_season: [
      spring_break = {
        first_day: new Date('2022-02-19T00:00:00'),
         last_day: new Date('2022-03-13T23:59:59'),
      },
      summer_time = {
        first_day: new Date('2022-06-20T00:00:00'),
         last_day: new Date('2022-09-10T23:59:59'),
      },
      end_new_year = {
        first_day: new Date('2022-12-20T00:00:00'),
         last_day: new Date('2023-01-10T23:59:59'),
      },
    ],
    special_dates: {
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
    services: {
      0: {  // Initial_visit
        half_hour: {low: 20.00, high: 20.00}, full_hour: {low: 20.00, high: 20.00}, xtra_hour:  0.00,
      },
      1: {  // Pet_sitting
        half_hour: {low: 28.00, high: 33.00}, full_hour: {low: 49.00, high: 55.00}, xtra_hour: 20.00,
      },
      2: {  // Pet_walk
        half_hour: {low: 28.00, high: 33.00}, full_hour: {low: 49.00, high: 55.00}, xtra_hour: 30.00,
      },
      3: {  // Pet_transport
        half_hour: {low: 28.00, high: 33.00}, full_hour: {low: 49.00, high: 55.00}, xtra_hour: 20.00,
      },
      4: {  // Pet_treatment
        half_hour: {low: 28.00, high: 33.00}, full_hour: {low: 49.00, high: 55.00}, xtra_hour: 30.00,
      },
      5: {  // Training_dog
        half_hour: {low: 28.00, high: 33.00}, full_hour: {low: 49.00, high: 55.00}, xtra_hour: 35.00,
      },
      99: {  // Bringing_key
        half_hour: {low:  0.00, high:  0.00}, full_hour: {low:  0.00, high:  0.00}, xtra_hour:  0.00,
      },
    },
    transport_fee: {
      minimum: 3.20,
      per_km: 0.59,
    },
  },
]
