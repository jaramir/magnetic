import { useEffect, useRef } from 'react'

export function Magnet (props) {
  const dragging = useRef(false)
  const offset = useRef({y: 0, x: 0})

  const dragStart = event => {
    dragging.current = true
    offset.current = {
      y: event.pageY - props.top,
      x: event.pageX - props.left
    }
  }

  const drag = event => {
    if (!dragging.current) return
    props.onMove({
      id: props.id,
      top: event.pageY - offset.current.y,
      left: event.pageX - offset.current.x
    })
  }

  const dragEnd = () => {
    if (!dragging.current) return
    dragging.current = false
    offset.current = {y: 0, x: 0}
  }

  useEffect(() => {
    window.addEventListener('pointermove', drag)
    window.addEventListener('pointerup', dragEnd)
    return () => {
      window.removeEventListener('pointermove', drag)
      window.removeEventListener('pointerup', dragEnd)
    }
  }, [])

  return <div
    className="magnet"
    onPointerDown={dragStart}
    style={{
      top: props.top + 'px',
      left: props.left + 'px',
      userSelect: 'none'
    }}>
    {props.children}
  </div>
}
