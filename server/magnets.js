'use strict';

const {map, when, propEq, evolve} = require('ramda')
const {readFileSync, writeFile} = require('fs')

const storage = 'magnets.json'
let magnets = JSON.parse(readFileSync(storage))

const isInteger = value => Number.isInteger(value)

function store () {
  writeFile(storage, JSON.stringify(magnets, null, 2), () => {})
}

module.exports = {
  addMagnet: magnet => {
    magnets.push({
      id: magnets.length + 1,
      top: Math.trunc(Math.random() * 500),
      left: Math.trunc(Math.random() * 500),
      content: magnet
    })
    store()
  },
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
      store()
    }
  }
}
