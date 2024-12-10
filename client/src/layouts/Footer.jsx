import React from 'react'
import { AudioPlayer } from '../components'
import audio from '../assets/sounds/toilaaitrongem.mp3'
const Footer = () => {
    return (
        <div className='flex items-center bg-[rgba(255,255,255,.3)] h-20 rounded-md px-3 py-1'>
            <AudioPlayer audioSrc={audio} />
        </div>
    )
}

export default Footer