import _ from 'lodash'

export const positionsMapping = {
  'top center': 'top',
  'top left': 'top-start',
  'top right': 'top-end',

  'bottom center': 'bottom',
  'bottom left': 'bottom-start',
  'bottom right': 'bottom-end',

  'right center': 'right',
  'left center': 'left',
}

export const positions = Object.keys(positionsMapping)

export const placementMapping = Object.entries(positionsMapping).reduce((acc, [key, val]) => { acc[val] = key; return acc; }, {});
