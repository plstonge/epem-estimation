// The default language for the interface
var epemLang = 'fr'

const epemText = {
  'Add_service': {
    'fr': '+ Ajouter un service',
  },
  'Confirm_New': {
    'fr': "Créer une nouvelle estimation détruira l'estimation actuelle. Voulez-vous vraiment recommencer à neuf?",
  },
  'Delete': {
    'fr': "X Supprimer",
  },
  'Distance_to_destination': {
    'fr': "Distance de transport à l'aller :",
  },
  'Duplicate': {
    'fr': "** Dupliquer",
  },
  'Freq_12h': {
    'fr': "Deux fois (2x) par jour",
  },
  'Freq_1d': {
    'fr': "Une fois par jour",
  },
  'Freq_2d': {
    'fr': "Une fois aux deux (2) jours",
  },
  'Freq_3d': {
    'fr': "Une fois aux trois (3) jours",
  },
  'Freq_1w': {
    'fr': "Une fois aux sept (7) jours",
  },
  'Freq_2w': {
    'fr': "Une fois aux 14 jours",
  },
  'Freq_1m': {
    'fr': "Une fois aux 30 jours",
  },
  'Initial_visit': {
    'fr': 'Visite initiale (obligatoire pour les nouveaux clients ou après un déménagement)',
  },
  'New_quote': {
    'fr': 'Nouvelle facturation',
  },
  'Type_dog_training': {
    'fr': 'Entraînement du chien',
  },
  'Type_sitting': {
    'fr': 'Gardiennage',
  },
  'Type_transport': {
    'fr': 'Accompagnement et transport',
  },
  'Type_treatment': {
    'fr': 'Soins sur demande',
  },
  'Type_walk': {
    'fr': 'Promenade',
  },
  'Returning_key': {
    'fr': 'Visite finale (frais de transport pour ramener la ou les clés)',
  },
  'Select_services': {
    'fr': 'Sélection des services',
  },
  'Select_staff_members': {
    'fr': 'Sélection de gardiennes et gardiens',
  },
  'Service_duration': {
    'fr': 'Durée (h:mm)',
  },
  'Service_frequency': {
    'fr': 'Fréquence',
  },
  'Service_start_date': {
    'fr': 'Premier jour',
  },
  'Service_type': {
    'fr': 'Type de service',
  },
  'Service_until_date': {
    'fr': 'Dernier jour',
  },
}

function tr(key) {
  return epemText[key][epemLang]
}
