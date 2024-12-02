/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState, useRef, useEffect } from 'react'
import { Button } from './index'
import { CiPlay1, CiPause1 } from 'react-icons/ci'
import PropTypes from 'prop-types'
import { Mon } from '../assets/images/index'

const AudioPlayer = ({ audioSrc, image }) => {
    const [playing, setPlaying] = useState(false)
    const [currentTime, setCurrentTime] = useState(0)
    const [duration, setDuration] = useState(0)

    const audioRef = useRef(null)

    const formatTime = (time) => {
        if (isNaN(time)) return '00:00'
        const minutes = Math.floor(time / 60)
        const seconds = Math.floor(time % 60)
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
    }

    const handleSeek = (e) => {
        audioRef.current.currentTime = e.target.value
        setCurrentTime(e.target.value)
    }

    const handleTimeUpdate = () => {
        setCurrentTime(audioRef.current.currentTime)
        setDuration(audioRef.current.duration)
    }
    const Pause = () => {
        audioRef.current.pause()
        setPlaying(false)
    }
    const Play = () => {
        audioRef.current.play()
        setPlaying(true)
    }
    const handlePlayPause = () => {
        if (playing) {
            Pause()
        } else {
            Play()
        }
    }

    useEffect(() => {
        const audio = audioRef.current
        const handleAudioEnd = () => setPlaying(false)

        audio.addEventListener("timeupdate", handleTimeUpdate)
        audio.addEventListener("ended", handleAudioEnd)

        return () => {
            audio.removeEventListener("timeupdate", handleTimeUpdate)
            audio.removeEventListener("ended", handleAudioEnd)
        }
    }, [])

    return (
        <div className='grid grid-cols-3 space-x-2 w-full'>
            <div className='flex flex-row gap-2'>
                <div className='w-20 h-16'>
                    <img
                        className='w-full h-full object-cover'
                        alt='image' src={image || Mon}
                    />
                </div>
                <span>{audioSrc.split('/').pop().split('.')[0]}</span>
            </div>
            <div className='flex items-center justify-center space-x-1 w-full px-2'>
                <p>{formatTime(currentTime)}</p>
                <input
                    type='range'
                    min='0'
                    max={duration || 0}
                    value={currentTime}
                    onChange={handleSeek}
                    className='w-full'
                />
                <p>{formatTime(duration)}</p>
                <audio ref={audioRef} src={audioSrc} />
            </div>
            <div className='flex items-center justify-end'>
                <Button
                    onClick={handlePlayPause}
                >
                    {playing ? <CiPause1 /> : <CiPlay1 />}
                </Button>
            </div>
        </div>
    )
}

export default AudioPlayer

AudioPlayer.propTypes = {
    audioSrc: PropTypes.node,
}