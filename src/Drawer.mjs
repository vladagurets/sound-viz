import Bar from './drawers/Bar.mjs'
import Wave from './drawers/Wave.mjs'
import { BAR_VIEW, WAVE_VIEW } from './constants.js'

class Drawer {
  types = {
    [BAR_VIEW]: Bar,
    [WAVE_VIEW]: Wave
  }

  constructor(analyser) {
    this.analyser = analyser
    this.type = BAR_VIEW
    this.animationFrame = null
    this.draw()
  }
  
  drawContainer = children => {
    if (!Array.isArray(children)) {
      children = [children]
    }
  
    const container = document.createElement('div')
    container.classList.add('canvases')

    for (const child of children) {
      container.appendChild(child)
    }

    document.body.prepend(container)
  }

  resetDOM = () => {
    window.cancelAnimationFrame(this.animationFrame)
    const container = document.querySelector('.canvases')
    container && container.remove()
  }

  requestAnimationFrame = cb => {
    this.animationFrame = window.requestAnimationFrame(cb)
  }

  cancelAnimationFrame = () => {
    window.cancelAnimationFrame(this.animationFrame)
    this.animationFrame = null
  }

  draw = () => {
    this.resetDOM()
    this.drawContainer(this.types[this.type].call(this))
  }

  changeFig = type => {
    this.type = type
    this.draw()
  }
}

export default Drawer
