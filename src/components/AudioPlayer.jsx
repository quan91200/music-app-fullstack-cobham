/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState, useRef, useEffect } from "react"
import {
    CiPlay1,
    CiPause1,
    CiVolumeMute,
    CiVolume,
    CiVolumeHigh,
} from "react-icons/ci"
import { RxTrackNext, RxTrackPrevious } from "react-icons/rx"
import PropTypes from "prop-types"
import { Button } from "./index"
import { Mon } from "../assets/images/index"
import useToggle from "../hook/useToggle"

const AudioPlayer = ({ audioSrc, image }) => {
    const [playing, setPlaying] = useToggle(false)
    const [currentTime, setCurrentTime] = useState(0)
    const [duration, setDuration] = useState(0)
    const [hoverAudioTime, setHoverAudioTime] = useState(null)
    const [volume, setVolume] = useState(0.5)
    const [hoverVolume, setHoverVolume] = useState(null)
    const [isMuted, toggleMute] = useToggle(false)
    const [previousVolume, setPreviousVolume] = useState(volume)
    const [currentTrackIndex, setCurrentTrackIndex] = useState(0)

    const audioRef = useRef(null)
    const progressBarRef = useRef(null)
    const volumeRef = useRef(null)

    // Format thời gian giây -> phút:giây
    const formatTime = (time) => {
        if (isNaN(time)) return "00:00"
        const minutes = Math.floor(time / 60)
        const seconds = Math.floor(time % 60)
        return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`
    }

    // Xử lý hover thanh audio
    const handleAudioHover = (e) => {
        const rect = progressBarRef.current.getBoundingClientRect()
        const hoverX = e.clientX - rect.left
        const hoverTime = (hoverX / rect.width) * duration
        setHoverAudioTime(hoverTime)
    }

    const handleAudioLeave = () => setHoverAudioTime(null)

    const handleSeek = (e) => {
        const rect = progressBarRef.current.getBoundingClientRect()
        const clickX = e.clientX - rect.left
        const seekTime = (clickX / rect.width) * duration
        audioRef.current.currentTime = seekTime
        setCurrentTime(seekTime)
    }

    // Xử lý hover thanh volume
    const handleVolumeHover = (e) => {
        const rect = volumeRef.current.getBoundingClientRect()
        const hoverX = e.clientX - rect.left
        const hoverVolume = Math.min(Math.max(hoverX / rect.width, 0), 1)
        setHoverVolume(hoverVolume)
    }

    const handleVolumeLeave = () => setHoverVolume(null)

    const handleVolumeChange = (e) => {
        const rect = volumeRef.current.getBoundingClientRect()
        const clickX = e.clientX - rect.left
        const newVolume = Math.min(Math.max(clickX / rect.width, 0), 1)
        setVolume(newVolume)
        if (newVolume > 0 && isMuted) toggleMute()
    }

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = isMuted ? 0 : volume
        }
    }, [volume, isMuted])

    const handleMuteToggle = () => {
        if (isMuted) {
            setVolume(previousVolume || 0.5)
        } else {
            setPreviousVolume(volume)
            setVolume(0)
        }
        toggleMute()
    }

    const handleTimeUpdate = () => {
        setCurrentTime(audioRef.current.currentTime)
        setDuration(audioRef.current.duration)
    }

    const handlePlayPause = () => {
        if (playing) {
            audioRef.current.pause()
            setPlaying(false)
        } else {
            audioRef.current.play()
            setPlaying(true)
        }
    }

    // Play next track
    const nextTrack = () => {
        const nextIndex = (currentTrackIndex + 1) % audioSrc.length
        setCurrentTrackIndex(nextIndex)
        audioRef.current.src = audioSrc[nextIndex].src
        setPlaying(true)
        console.log(nextIndex)
    }

    // Play previous track
    const previousTrack = () => {
        const prevIndex = (currentTrackIndex - 1 + audioSrc.length) % audioSrc.length
        setCurrentTrackIndex(prevIndex)
        audioRef.current.src = audioSrc[prevIndex].src
        audioRef.current.play()
        setPlaying(true)
        console.log(prevIndex)
    }

    useEffect(() => {
        const audio = audioRef.current
        const handleAudioEnd = () => {
            setPlaying(false)
            nextTrack()
        }

        audio.addEventListener("timeupdate", handleTimeUpdate)
        audio.addEventListener("ended", handleAudioEnd)

        return () => {
            audio.removeEventListener("timeupdate", handleTimeUpdate)
            audio.removeEventListener("ended", handleAudioEnd)
        }
    }, [currentTrackIndex, audioSrc])

    return (
        <div className="grid grid-cols-3 space-x-2 w-full">
            <div className="flex flex-row gap-2">
                <div className="w-20 h-16">
                    <img
                        className="w-full h-full object-cover"
                        alt="image"
                        src={image || Mon}
                    />
                </div>
                <span>{audioSrc.split("/").pop().split(".")[0]}</span>
                <div className="flex items-center justify-center space-x-2">
                    <Button onClick={previousTrack}><RxTrackPrevious /></Button>
                    <Button onClick={handlePlayPause}>
                        {playing ? <CiPause1 /> : <CiPlay1 />}
                    </Button>
                    <Button onClick={nextTrack}><RxTrackNext /></Button>
                </div>
            </div>

            <div className="flex items-center justify-center space-x-1 w-full px-2">
                <span className="text-white">{formatTime(currentTime)}</span>
                <div
                    className="relative w-full h-1 bg-gray-400 rounded cursor-pointer group hover:h-2"
                    ref={progressBarRef}
                    onClick={handleSeek}
                    onMouseMove={handleAudioHover}
                    onMouseLeave={handleAudioLeave}
                >
                    <div
                        className="absolute top-0 left-0 h-full bg-white rounded transition-all group-hover:bg-green-400"
                        style={{ width: `${(currentTime / duration) * 100}%` }}
                    />
                    <div
                        className="
                            absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full 
                            transition-transform"
                        style={{
                            left: `${(currentTime / duration) * 100}%`,
                            transform: "translate(-50%, -50%)",
                        }}
                    />
                    {hoverAudioTime !== null && (
                        <div
                            className="absolute -top-[27px] text-xs text-gray-700 bg-white p-1 rounded shadow transition-all"
                            style={{
                                left: `${(hoverAudioTime / duration) * 100}%`,
                                transform: "translateX(-50%)",
                            }}
                        >
                            <span>{formatTime(hoverAudioTime)}</span>
                        </div>
                    )}
                </div>
                <span className="text-white">{formatTime(duration)}</span>
                <audio ref={audioRef} src={audioSrc} />
            </div>
            <div className="flex items-center justify-end space-x-3">
                <div
                    className="cursor-pointer p-2 hover:bg-[rgba(255,255,255,0.2)] rounded-md"
                    onClick={handleMuteToggle}
                >
                    <span className="text-white">
                        {volume === 0 || isMuted ? (
                            <CiVolumeMute />
                        ) : volume <= 0.5 ? (
                            <CiVolume />
                        ) : (
                            <CiVolumeHigh />
                        )}
                    </span>
                </div>
                <div
                    className="relative w-24 h-1 bg-gray-400 rounded-lg cursor-pointer group hover:h-2"
                    ref={volumeRef}
                    onClick={handleVolumeChange}
                    onMouseMove={handleVolumeHover}
                    onMouseLeave={handleVolumeLeave}
                >
                    <div
                        className="absolute top-0 left-0 h-full bg-white rounded transition-all group-hover:bg-green-400"
                        style={{ width: `${volume * 100}%` }}
                    />
                    <div
                        className="
                            absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full 
                            transition-transform duration-150"
                        style={{
                            left: `${volume * 100}%`,
                            transform: "translate(-50%, -50%)",
                        }}
                    />
                </div>
            </div>
        </div>
    )
}

export default AudioPlayer

AudioPlayer.propTypes = {
    audioSrc: PropTypes.string.isRequired,
    image: PropTypes.string,
}