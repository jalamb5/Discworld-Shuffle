import React from 'react'
import ReactDOM from 'react-dom/client'
import Board from './board.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <h1>Discworld Memory Game</h1>
    <h2>Score: </h2>
    <Board />
  </React.StrictMode>,
)
