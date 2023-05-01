import { useEffect, useState } from 'react'
import { io } from 'socket.io-client'
import { Magnet } from './Magnet'
import { evolve, map, propEq, when } from 'ramda'

let socket

const MAX_TOP = 3000;
const MAX_LEFT = 6000;

const limit = move => ({
  id: move.id,
  top: Math.trunc(Math.max(0, Math.min(move.top, MAX_TOP))),
  left: Math.trunc(Math.max(0, Math.min(move.left, MAX_LEFT)))
})

export function App () {
  const [magnets, setMagnets] = useState([])

  const mergeMagnet = magnet => {
    setMagnets(map(when(propEq(magnet.id, 'id'),
      evolve({
        top: () => magnet.top,
        left: () => magnet.left
      }))))
  }

  useEffect(() => {
    socket = io()
    socket.on('magnet', mergeMagnet)
    socket.on('magnets', setMagnets)
    window.add = magnet => socket.emit('add', magnet)
    return () => {
      socket.disconnect()
    }
  }, [])

  const onMove = move => {
    const limitedMove = limit(move)
    mergeMagnet(limitedMove)
    socket.emit('magnet', limitedMove)
  }

  return (
    <main className="main">
      {magnets.map(magnet =>
        <Magnet
          key={magnet.id}
          id={magnet.id}
          top={magnet.top}
          left={magnet.left}
          onMove={onMove}
        >{magnet.content}</Magnet>
      )}
    </main>
  )
}
