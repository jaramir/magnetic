const {map, when, propEq, evolve} = require('ramda')

let magnets = [
  {id: 1, top: 200, left: 160, content: 'vita'},
  {id: 2, top: 203, left: 200, content: 'felicitá'},
  {id: 3, top: 199, left: 260, content: 'momenti'}
]

const isInteger = value => Number.isInteger(value)

module.exports = {
  getMagnets: () => magnets,
  setMagnet: data => {
    if (isInteger(data.id) && isInteger(data.top) && isInteger(data.left)) {
      magnets = map(
        when(
          propEq(data.id, 'id'),
          evolve({
            top: () => data.top,
            left: () => data.left
          })
        ), magnets)
    }
  }
}
