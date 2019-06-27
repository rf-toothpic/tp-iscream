
// /**
//  *
//  * VoteButton
//  *
//  */
//
import React, { useRef } from 'react'
// import { Button } from '@material-ui/core'
// import PropTypes from 'prop-types';
import styled from 'styled-components'

function getRandomInt (max) {
  return Math.floor(Math.random() * Math.floor(max))
}

class Emoji extends React.Component {

  constructor (props) {
    super(props)
    const {face, startx, starty, flour, fs, flyUpMax, Ref} = this.props

    this.isAlive = true
    this.face = face
    this.x = startx
    this.y = starty
    this.flourLevel = flour
    this.increment = -Math.floor((Math.random() * flyUpMax) + 10)
    this.xincrement = Math.floor((Math.random() * 10) + 1)
    this.xincrement *= Math.floor(Math.random() * 2) === 1 ? 1 : -1
    this.element = document.createElement('div')
    this.element.innerHTML = face
    this.element.style.position = 'absolute'
    this.element.style.fontSize = fs + 'px'
    this.element.style.color = 'white'
  }

}

function Emoji ({  }) {
  this.isAlive = true
  this.face = face
  this.x = startx
  this.y = starty
  this.flourLevel = flour
  this.increment = -Math.floor((Math.random() * flyUpMax) + 10)
  this.xincrement = Math.floor((Math.random() * 10) + 1)
  this.xincrement *= Math.floor(Math.random() * 2) === 1 ? 1 : -1
  this.element = document.createElement('div')
  this.element.innerHTML = face
  this.element.style.position = 'absolute'
  this.element.style.fontSize = fs + 'px'
  this.element.style.color = 'white'
  Ref.appendChild(this.element)

  this.refresh = function () {
    if (this.isAlive) {
      // ------Y axis-----

      this.y += this.increment
      this.x += this.xincrement
      this.increment += 0.25

      if (this.y >= this.flourLevel) {
        if (this.increment <= 5) {
          this.isAlive = false
        }
        this.increment = -this.increment + 5
      }

      this.element.style.transform = 'translate(' + this.x + 'px, ' + this.y + 'px)'
    } else {
      this.element.style.transform = 'translate(px, px)'
    }
  }
}

const MonButon = styled.button`
               .center {
                 position: absolute;
                 top: 50%;
                 left: 50%;
                 transform: translate(-50%, -50%);
               }`

let Emojis = ['👏', '🤪', '🌈', '🥳', '🍍', '🤤', '🍦', '🍧', '🐮', '🍭']
const fsize = {
  value: '100'
}

// eslint-disable-next-line no-empty-pattern
function VoteButton ({ }) {
  const flyingMen = []
  const textRef = useRef()
  const buttonRef = useRef()
  const fontRef = useRef()

  let button = buttonRef && buttonRef.current
  let text = textRef && textRef.current
  let font = fontRef && fontRef.current

  // Emoji objectS

  // button.addEventListener("click", goB);

  const goB = () => {
    let fontsize = fsize.value
    let xv = (button.getBoundingClientRect().left + button.clientWidth / 2) - (fontsize / 2)
    let yv = (button.getBoundingClientRect().top + button.clientHeight / 2) - (fontsize / 2)
    let fl = button.getBoundingClientRect().top + 100
    for (let j = 0; j < 8; j++) {
      let index = getRandomInt(10)
      let face = Emojis[index]
      for (let i = 0; i < 10; i++) {
        let coolGuy = new Emoji(face, xv, yv, fl, fontsize, 12)
        flyingMen.push(coolGuy)
      }
    }
  }

  // Rendering
  const doButton = () => {
    for (let i = 0; i < flyingMen.length; i++) {
      if (flyingMen[i].isAlive === true) {
        flyingMen[i].refresh()
      } else {
        flyingMen[i].element.remove()
        flyingMen.splice(i, 1)
      }
    }
    // eslint-disable-next-line no-undef
    requestAnimationFrame(doButton)
  }

  doButton()

  return <>

    <div ref={text}>
      <MonButon onClick={goB()} ref={button} >Voteywotey</MonButon>
      <div ref={font} /><div />
    </div></>
}

VoteButton.propTypes = {}

export default VoteButton;
