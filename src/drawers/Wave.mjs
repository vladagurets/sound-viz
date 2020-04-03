export default function () {
  const canvasWidth = document.body.clientWidth
  const canvasHeight = 200

  const canvas = document.createElement('canvas')
  const context = canvas.getContext('2d')

  canvas.width = canvasWidth
  canvas.height = canvasHeight

  this.analyser.fftSize = 2048
  const bufferLength = this.analyser.fftSize
  const dataArray = new Uint8Array(bufferLength)
  
  const drawFrame = () => {
    this.requestAnimationFrame(drawFrame)

    this.analyser.getByteTimeDomainData(dataArray)

    context.clearRect(0, 0, canvasWidth, canvasHeight)

    const gradient = context.createLinearGradient(0, canvas.height / 2, canvas.width,canvas.height / 2);

    for (const c of generasteLineColors()) {
      gradient.addColorStop(c.point, c.color);
    }
  
    context.lineWidth = 3
    context.strokeStyle = gradient

    context.beginPath()

    const sliceWidth = canvasWidth * 1 / bufferLength
    let x = 0

    for(let i = 0; i < bufferLength; i++) {
      const v = dataArray[i] / 128.0
      const y = v * canvasHeight / 2

      if(i === 0) {
        context.moveTo(x, y)
      } else {
        context.lineTo(x, y)
      }

      x += sliceWidth
    }

    context.lineTo(canvas.width, canvas.height / 2)
    context.stroke()
  }

  drawFrame()

  return canvas
}

function generasteLineColors () {
  return new Array(200).fill(0).map((e, i) => ({
    point: i / 200,
    color: `rgba(200, ${i}, 50, 1)`
  }))
}