// The default language for the interface
var epemLang = 'fr'

const epemText = {
  'Add_service': {
    'fr': 'Ajouter un service',
  },
  'Bringing_key': {
    'fr': 'Ramener la ou les clés',
  },
  'Confirm_New': {
    'fr': "Créer une nouvelle estimation détruira l'estimation actuelle. Voulez-vous vraiment recommencer à neuf?",
  },
  'Distance_to_destination': {
    'fr': "Distance de transport à l'aller :",
  },
  'Initial_visit': {
    'fr': 'Visite initiale',
  },
  'New_quote': {
    'fr': 'Nouvelle estimation',
  },
  'Pet_sitting': {
    'fr': 'Gardiennage à votre domicile',
  },
  'Pet_transport': {
    'fr': 'Accompagnement et transport',
  },
  'Pet_treatment': {
    'fr': 'Soins sur demande',
  },
  'Pet_walk': {
    'fr': 'Promenade pour votre animal',
  },
  'Quote': {
    'fr': 'Soumission',
  },
  'Select_services': {
    'fr': 'Sélection de services',
  },
  'Select_staff_members': {
    'fr': 'Sélection de gardiennes et gardiens',
  },
  'Service_start_date': {
    'fr': 'Premier jour',
  },
  'Service_start_time': {
    'fr': 'Heure de début',
  },
  'Service_type': {
    'fr': 'Type de service'
  },
  'Service_until_date': {
    'fr': 'Dernier jour',
  },
  'Service_until_time': {
    'fr': 'Heure de fin',
  },
  'Training_dog': {
    'fr': 'Entraînement de votre chien',
  },
}

function tr(key) {
  return epemText[key][epemLang]
}
