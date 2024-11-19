import { useEffect, useState } from 'react'
import { nanoid } from 'nanoid'
import Confetti from 'react-confetti'
import Die from './components/Die/Die'
import './App.css'

function App() {
  const [dice, setDice] = useState(allNewDice)
  const [tenzies, setTenzies] = useState(false)

  useEffect(() => {
    const allDicesHeld = dice.every(die => die.isHeld)
    const firstDieValue = dice[0].value
    const allSameValue = dice.every(die => die.value === firstDieValue)
    if (allDicesHeld && allSameValue) {
      setTenzies(true)
    }
  }, [dice])

  function generateNewDie() {
    return {
      value: Math.floor(Math.random() * 6 + 1),
      isHeld: false,
      id: nanoid(),
    }
  }

  function allNewDice() {
    const newDice = []
    for (let i = 0; i < 10; i++) {
      newDice.push(generateNewDie())
    }
    return newDice
  }

  function holdDice(id) {
    setDice(oldDice => {
      return oldDice.map((die) => {
        return die.id === id ? { ...die, isHeld: !die.isHeld } : die
      })
    })
  }

  function rollDices() {
    if (!tenzies) {
      setDice(oldDice => {
        return oldDice.map((die) => {
          return die.isHeld === true ? die : generateNewDie()
        })
      })
    } else {
      setTenzies(false)
      setDice(allNewDice)
    }
  }

  const diceElements = dice.map((die) => {
    return (
      <Die
        key={die.id}
        value={die.value}
        isHeld={die.isHeld}
        holdDice={() => holdDice(die.id)}
      />
    )
  })

  return (
    <main className='container'>
      {tenzies && <Confetti />}
      <div className='game'>
        <h1 className='title'>Tenzies</h1>
        <p className='description'>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
        <div className='dices'>
          {diceElements}
        </div>
        <button className='roll-button' onClick={rollDices}>{tenzies ? "New Game" : "Roll"}</button>
      </div>
    </main>
  )
}

export default App
