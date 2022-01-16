const epem_text = {
  'Distance_to_destination': {
    'fr': "Distance de transport à l'aller :",
  },
  'New_quote': {
    'fr': 'Nouvelle soumission',
  },
  'Quote': {
    'fr': 'Soumission',
  },
  'Select_services': {
    'fr': 'Sélection de services',
  },
  'With_main_distance': {
    'fr': 'Étant donné un déplacement de ',
  },
}

var epem_lang = 'fr'

function tr(key) {
  return epem_text[key][epem_lang]
}
