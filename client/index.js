import { createRoot } from "react-dom/client";
import { App } from './App'
import { StrictMode } from 'react'

document.body.style.backgroundColor = "rgb(" +
  Math.trunc(Math.random() * 255) + "," +
  Math.trunc(Math.random() * 255) + "," +
  Math.trunc(Math.random() * 255) + ")"

const container = document.getElementById("app")
const root = createRoot(container)
root.render(<StrictMode><App /></StrictMode>)
