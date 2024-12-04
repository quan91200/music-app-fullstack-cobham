import React, { useState, useEffect, useRef } from 'react'
import { CiVolumeMute, CiVolume, CiVolumeHigh } from 'react-icons/ci'
import useToggle from '../hook/useToggle'

const Volume = ({ volume, onVolumeChange }) => {
    const [hovering, setHovering] = useState(false)
    const [hoverVolume, setHoverVolume] = useState(false)
    const [isMuted, toggleMute] = useToggle(false)
    const [previousVolume, setPreviousVolume] = useState(volume)

    const volumeRef = useRef(null)

    const handleMuteToggle = () => {
        if (isMuted) {
            onVolumeChange(previousVolume)
        } else {
            setPreviousVolume(volume)
            onVolumeChange(0)
        }
        toggleMute()
    }

    const handleVolumeChange = (e) => {
        const rect = volumeRef.current.getBoundingClientRect()
        const clickX = e.clientX - rect.left
        const newVolume = Math.min(Math.max(clickX / rect.width, 0), 1)
        onVolumeChange(newVolume)
    }

    const handleHover = (e) => {
        const rect = volumeRef.current.getBoundingClientRect()
        const hoverX = e.clientX - rect.left
        const newVolume = Math.min(Math.max(hoverX / rect.width, 0), 1)
        setHoverVolume(newVolume)
    }

    const handleLeave = () => {
        setHovering(false)
    }

    useEffect(() => {
        if (hovering) {
            setHoverVolume(volume)
        }
    }, [hovering, volume])

    return (
        <span className="flex items-center space-x-3">
            <div
                onClick={handleMuteToggle}
                className='cursor-pointer p-2 hover:bg-[rgba(255,255,255,0.2)] rounded-md'
            >
                {volume < 0.1 ? (
                    <CiVolumeMute />
                ) : volume >= 0.1 && volume <= 0.5 ? (
                    <CiVolume />
                ) : (
                    <CiVolumeHigh />
                )}
            </div>

            <div
                className="relative w-24 h-1 bg-gray-400 rounded-lg cursor-pointer group hover:h-2"
                ref={volumeRef}
                onClick={handleVolumeChange}
                onMouseMove={handleHover}
                onMouseLeave={handleLeave}
            >
                <div
                    className="absolute top-0 left-0 h-full bg-white rounded-lg group-hover:bg-green-500"
                    style={{ width: `${hovering ? hoverVolume * 100 : volume * 100}%` }}
                />
                <div
                    className="absolute top-1/2 transform -translate-y-1/2 left-0 -translate-x-1/2 bg-white rounded-full"
                    style={{
                        left: `${(hovering ? hoverVolume : volume) * 100}%`,
                        width: '12px',
                        height: '12px',
                    }}
                />
            </div>
        </span>
    )
}

export default Volume