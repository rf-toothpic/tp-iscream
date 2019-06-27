
// /**
//  *
//  * VoteButton
//  *
//  */
//
import React from 'react'
import { Button } from '@material-ui/core'
// import PropTypes from 'prop-types';
import styled from 'styled-components'

function getRandomInt (max) {
  return Math.floor(Math.random() * Math.floor(max))
}

let Emojis = ['👏', '🤪', '🌈', '🥳', '🍍', '🤤', '🍦', '🍧', '🐮', '🍭']
const fsize = {
  value: '100'
}

class Emoji extends React.Component {

  state={x:0,y:0}
  constructor (props) {
    super(props)
    const { face, startx, starty, flour, fs, flyUpMax, isAlive = true, fa } = props

    this.isAlive = isAlive
    this.face = face
    this.x = startx
    this.y = starty
    this.flourLevel = flour
    this.fa = fa
    this.fs = fs
    this.increment = -Math.floor((Math.random() * flyUpMax) + 10)
    this.xincrement = Math.floor((Math.random() * 10) + 1)
    this.xincrement *= Math.floor(Math.random() * 2) === 1 ? 1 : -1

    this.refresh = this.refresh.bind(this)
  }

  refresh () {
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
    } else {
      this.x = null
      this.y = null
    }

    this.setState({ x: this.x, y: this.y })
  }

  remove(){
    this.setState({removed:true})
  }

  render () {
    const { x, y, removed } = this.state
    return removed ? null : <span ref={this.element} style={{ position: 'absolute', fontSize: `${this.fs}px`, color: 'white', transform: `translate(${x}px,${y}px)` }} />
  }
}

const MonButon = styled(Button)`
               .center {
                 position: absolute;
                 top: 50%;
                 left: 50%;
                 transform: translate(-50%, -50%);
                 height: 100px;
                 width: 200px;
                 background:red;
                 color:white;
               }`

// eslint-disable-next-line no-empty-pattern
function VoteButton ({ onSubmit }) {
  const button = React.useRef()

  const [flyingMen, setFlyingMen] = React.useState([])

  const goB = () => {
    let fontsize = fsize.value
    let xv = (button.current.getBoundingClientRect().left + button.clientWidth / 2) - (fontsize / 2)
    let yv = (button.current.getBoundingClientRect().top + button.clientHeight / 2) - (fontsize / 2)
    let fl = button.current.getBoundingClientRect().top + 100
    for (let j = 0; j < 8; j++) {
      let index = getRandomInt(10)
      let face = Emojis[index]
      for (let i = 0; i < 10; i++) {
        let coolGuy = { face, startX: xv, startY: yv, flour: fl, fs: fontsize, flyUpMax: 12, }
        flyingMen.push(coolGuy)
      }
    }
    setFlyingMen([...flyingMen])
  }


  // Rendering
  const doButton = () => {
    for (let i = 0; i < flyingMen.length; i++) {
      if (flyingMen[i].isAlive === true) {
        flyingMen[i].refresh()
      } else {
        flyingMen[i].remove()
        flyingMen.splice(i, 1)
      }
    }
    // eslint-disable-next-line no-undef
    requestAnimationFrame(doButton)
    // setFlyingMen(flyingMen)
  }

  const submit = (e) => {
    e.preventDefault()
    // doButton()
    // setTimeout(()=>onSubmit(), 1000)
    onSubmit()
  }

  React.useEffect(()=>{
    goB()
  })

  return <>
    <div>
      <MonButon onClick={submit} ref={button} type='button' color="primary" variant="contained">Voteywotey</MonButon>
      {/*{flyingMen.map(man => React.createElement(Emoji, man))}*/}
    </div>
  </>
}

VoteButton.propTypes = {}

export default VoteButton
