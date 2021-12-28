export const pixelSize = 2

const pixelColors = [
  '#f2f0e5',
  '#b8b5b9',
  '#868188',
  '#646365',
  '#4b80ca',
  '#68c2d3',
  '#a2dcc7',
  '#ede19e',
  '#d3a068',
  '#b45252',
  '#6a536e',
  '#80493a',
  '#a77b5b',
  '#e5ceb4',
  '#c2d368',
  '#8ab060',
  '#567b79',
  '#7b7243',
  '#b2b47e',
  '#edc8c4',
  '#cf8acb',
  '#5f556a',
  // '#f0e5bb', // yellow
  // '#fcedb3', // yellow
  // '#fabb93', // orange
  // '#d16a45', // orange-red
  // '#cf5a4a', // red
  // '#5992e3', // blue
  // '#c7deff', // white-blue
  // '#f0bbde', // pink
]

export function getRandomColor(): string {
  const roll = Math.random()
  if (roll > 0.75) {
    return '#f2f0e5'
  }
  return pixelColors[(((roll * 4) / 3) * pixelColors.length) >> 0]
}
