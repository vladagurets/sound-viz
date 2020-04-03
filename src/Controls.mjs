import { BAR_VIEW, VIEWS } from './constants.js'

class Controls {
  containerClass = 'controls'

  constructor(onSwitchView) {
    this.selectedView = BAR_VIEW
    this.onSwitchView = onSwitchView

    this.initControls()
  }
  
  initControls = () => {
    const container = document.createElement('div')
    container.classList.add(this.containerClass)

    for (const view of VIEWS) {
      const button = document.createElement('button')
    
      button.innerText = view
      button.onclick = () => this.switchView(view)

      if (view === this.selectedView) {
        button.classList.add('active')
      }

      container.appendChild(button)
    }

    document.body.appendChild(container)
    this.updateButtons()
  }

  updateButtons = () => {
    const buttons = document.body.querySelectorAll(`.${this.containerClass} > button`)
    for (const button of buttons) {
      if (button.innerText === this.selectedView) {
        button.classList.add('active')
      } else {
        button.classList.remove('active')
      }
    }
  }

  switchView = view => {
    this.selectedView = view
    this.updateButtons()
    this.onSwitchView(view) 
  }
}

export default Controls
