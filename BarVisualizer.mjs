function BarVisualizer (canvas, analyser, {
  canvasWidth = 400,
  canvasHeight = 100,
  barSize = 10
}) {
  const canvasCtx = canvas.getContext("2d")

  function draw() {
    const bufferLengthAlt = analyser.frequencyBinCount
    const dataArrayAlt = new Uint8Array(bufferLengthAlt)

    canvasCtx.clearRect(0, 0, canvasWidth, canvasHeight)

    const drawAlt = function() {
      requestAnimationFrame(drawAlt)

      analyser.getByteFrequencyData(dataArrayAlt)

      canvasCtx.fillStyle = 'rgb(11, 11, 11)'
      canvasCtx.fillRect(0, 0, canvasWidth, canvasHeight)

      const barWidth = (canvasWidth / bufferLengthAlt) * barSize
      let barHeight
      let x = 0

      for(let i = 0; i < bufferLengthAlt; i++) {
        barHeight = dataArrayAlt[i]

        canvasCtx.fillStyle = 'rgb(' + (barHeight + 100) + ',50,50)'
        canvasCtx.fillRect(x, canvasHeight - barHeight / 2, barWidth, barHeight / 2)

        x += barWidth + 3
      }
    }

    drawAlt()
  }

  function initCanvas () {
    canvas.width = canvasWidth
    canvas.height = canvasHeight
  }

  initCanvas()
  draw()
}

export default BarVisualizer