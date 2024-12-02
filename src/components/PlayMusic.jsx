import React, { useCallback, useEffect, useState, useRef } from 'react'
import { useWavesurfer } from '@wavesurfer/react'

const formatTime = (seconds) => [seconds / 60, seconds % 60]
    .map((v) => `0${Math.floor(v)}`
        .slice(-2)).join(':')

const PlayMusic = ({ audioFile }) => {
    const containerRef = useRef(null)
    const [muted, setMuted] = useState(false)
    const [volume, setVolume] = useState(0.5)

    const { wavesurfer, isPlaying, currentTime } = useWavesurfer({
        container: containerRef,
        height: 70,
        cursorColor: 'transparent',
        waveColor: 'rgb(200, 0, 100)',
        progressColor: 'rgb(100, 0, 100)',
        normalize: true,
        barWidth: 2,
        barGap: 4
    })

    useEffect(() => {
        if (wavesurfer && audioFile) {
            wavesurfer.load(audioFile)
        }
    }, [wavesurfer, audioFile])

    const onPlayPause = useCallback(() => {
        wavesurfer && wavesurfer.playPause()
    }, [wavesurfer])

    const handleVolumeChange = (newVolume) => {
        setVolume(newVolume)
        wavesurfer.current.setVolume(newVolume)
        setMuted(newVolume === 0)
    }

    const handleMute = () => {
        setMuted(!muted)
        wavesurfer.current.setVolume(muted ? volume : 0)
    }
    return (
        <div>
            <div className="w-full px-3" ref={containerRef} />
        </div>
    )
}

export default PlayMusic