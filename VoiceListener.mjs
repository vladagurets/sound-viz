function VoiceListener (audioCtx, {
  minDecibels = -90,
  maxDecibels = -10,
  smoothingTimeConstant = 0.9
}) {
  const analyser = audioCtx.createAnalyser()
  const distortion = audioCtx.createWaveShaper()
  const gainNode = audioCtx.createGain()
  const biquadFilter = audioCtx.createBiquadFilter()
  const convolver = audioCtx.createConvolver()

  const initAudioStuff = () => {
    analyser.minDecibels = minDecibels
    analyser.maxDecibels = maxDecibels
    analyser.smoothingTimeConstant = smoothingTimeConstant
  }

  const soundListener = () => {
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then(stream => {
        audioCtx.createMediaStreamSource(stream).connect(distortion)
        distortion.connect(biquadFilter)
        biquadFilter.connect(gainNode)
        convolver.connect(gainNode)
        gainNode.connect(analyser)
        // Play stream back
        // analyser.connect(audioCtx.destination)
      })
  }

  initAudioStuff()
  soundListener()

  return analyser
}

export default VoiceListener

