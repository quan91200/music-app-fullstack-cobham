/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState, useRef, useEffect } from 'react'
import { CiPlay1, CiPause1 } from 'react-icons/ci'
import PropTypes from 'prop-types'
import { Button, Volume } from './index'
import { Mon } from '../assets/images/index'
import useToggle from '../hook/useToggle'

const AudioPlayer = ({ audioSrc, image }) => {
    const [playing, setPlaying] = useToggle(false)
    const [currentTime, setCurrentTime] = useState(0)
    const [duration, setDuration] = useState(0)
    const [hoverTime, setHoverTime] = useState(null)
    const [volume, setVolume] = useState(0.5)

    const audioRef = useRef(null)
    const progressBarRef = useRef(null)

    const formatTime = (time) => {
        if (isNaN(time)) return '00:00'
        const minutes = Math.floor(time / 60)
        const seconds = Math.floor(time % 60)
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
    }

    const handleSeek = (e) => {
        const rect = progressBarRef.current.getBoundingClientRect()

        const clickX = e.clientX - rect.left
        const seekTime = (clickX / rect.width) * duration
        audioRef.current.currentTime = seekTime
        setCurrentTime(seekTime)
    }

    const handleHover = (e) => {
        const rect = progressBarRef.current.getBoundingClientRect()
        const hoverX = e.clientX - rect.left
        const hoverTime = (hoverX / rect.width) * duration
        setHoverTime(hoverTime)
    }

    const handleLeave = () => {
        setHoverTime(null)
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

        audio.addEventListener('timeupdate', handleTimeUpdate)
        audio.addEventListener('ended', handleAudioEnd)

        return () => {
            audio.removeEventListener('timeupdate', handleTimeUpdate)
            audio.removeEventListener('ended', handleAudioEnd)
        }
    }, [])

    return (
        <div className='grid grid-cols-3 space-x-2 w-full'>
            <div className='flex flex-row gap-2'>
                <div className='w-20 h-16'>
                    <img
                        className='w-full h-full object-cover'
                        alt='image'
                        src={image || Mon}
                    />
                </div>
                <span>{audioSrc.split('/').pop().split('.')[0]}</span>
            </div>
            <div className='flex items-center justify-center space-x-1 w-full px-2'>
                <span className='text-white'>{formatTime(currentTime)}</span>
                <div
                    className="
                        relative w-full h-1 bg-gray-400 rounded cursor-pointer group 
                        hover:h-2"
                    ref={progressBarRef}
                    onClick={handleSeek}
                    onMouseMove={handleHover}
                    onMouseLeave={handleLeave}
                >
                    <div
                        className="
                            absolute top-0 left-0 h-full rounded bg-white 
                            group-hover:bg-green-500 transition-all"
                        style={{ width: `${(currentTime / duration) * 100}%` }}
                    />
                    <div
                        className="
                            absolute top-1/2 transform -translate-y-1/2 -translate-x-1/2 
                            bg-white rounded-full transition-all group-hover:scale-[1.7]"
                        style={{
                            left: `${(currentTime / duration) * 100}%`,
                            width: "8px",
                            height: "8px",
                        }}
                    />
                    {hoverTime !== null && (
                        <div
                            className="
                                absolute top-[-25px] text-xs text-gray-700 
                                bg-white p-1 rounded shadow"
                            style={{
                                left: `${(hoverTime / duration) * 100}%`,
                                transform: "translateX(-50%)",
                            }}
                        >
                            <span>{formatTime(hoverTime)}</span>
                        </div>
                    )}
                </div>

                <span className='text-white'>{formatTime(duration)}</span>
                <audio ref={audioRef} src={audioSrc} />
            </div>
            <div className='flex items-center justify-end'>
                <Button onClick={handlePlayPause}>
                    {playing ? <CiPause1 /> : <CiPlay1 />}
                </Button>
                <Volume volume={volume} onVolumeChange={setVolume} />
            </div>
        </div>
    )
}

export default AudioPlayer

AudioPlayer.propTypes = {
    audioSrc: PropTypes.string.isRequired,
    image: PropTypes.string,
}