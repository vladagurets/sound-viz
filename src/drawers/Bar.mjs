export default function () {
  const barColors = generasteBarColors()

  const canvasWidth = 400
  const canvasHeight = 100
  const barSize = 5

  const canvases = [
    document.createElement('canvas'),
    document.createElement('canvas'),
    document.createElement('canvas'),
    document.createElement('canvas')
  ]
  const contexts = canvases.map(c => c.getContext('2d'))

  for (const canvas of canvases) {
    canvas.classList.add('bar-canvas')
    canvas.width = canvasWidth
    canvas.height = canvasHeight
  }

  this.analyser.fftSize = 512
  const bufferLengthAlt = this.analyser.frequencyBinCount
  const dataArrayAlt = new Uint8Array(bufferLengthAlt)

  const drawFrame = () => {
    this.requestAnimationFrame(drawFrame)

    this.analyser.getByteFrequencyData(dataArrayAlt)

    for (const context of contexts) {
      context.clearRect(0, 0, canvasWidth, canvasHeight)
    }

    const barWidth = (canvasWidth / bufferLengthAlt) * barSize
    let x = 0

    for(let i = 0; i < bufferLengthAlt; i++) {
      const barHeight = dataArrayAlt[i]

      for (const context of contexts) {
        context.fillStyle = `rgba(${barHeight + 100}, ${barColors[barHeight]}, 50, ${barHeight / 100})`
        context.fillRect(x, canvasHeight - barHeight / 2, barWidth, barHeight / 2)
      }

      x += barWidth + 5
    }
  }

  drawFrame()

  return canvases
}

function generasteBarColors () {
  const colors = {}
  new Array(200).fill(0).forEach((e, i) => {
    colors[i] = i
  })
  return colors
}