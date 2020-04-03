class VoiceListener {
  constructor(audioCtx, opts = {}) {
    this.audioCtx = audioCtx
    this.minDecibels = opts.minDecibels || -90
    this.maxDecibels = opts.maxDecibels || -10
    this.smoothingTimeConstant = opts.smoothingTimeConstant || 0.9

    this.analyser = audioCtx.createAnalyser()
    this.distortion = audioCtx.createWaveShaper()
    this.gainNode = audioCtx.createGain()
    this.biquadFilter = audioCtx.createBiquadFilter()
    this.convolver = audioCtx.createConvolver()

    this.initAudioStuff()
    this.startStreaming()
  }
  
  initAudioStuff = () => {
    this.analyser.minDecibels = this.minDecibels
    this.analyser.maxDecibels = this.maxDecibels
    this.analyser.smoothingTimeConstant = this.smoothingTimeConstant
  }

  startStreaming = () =>
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then(stream => {
        this.audioCtx.createMediaStreamSource(stream).connect(this.distortion)
        this.distortion.connect(this.biquadFilter)
        this.biquadFilter.connect(this.gainNode)
        this.convolver.connect(this.gainNode)
        this.gainNode.connect(this.analyser)
      })
}

export default VoiceListener

