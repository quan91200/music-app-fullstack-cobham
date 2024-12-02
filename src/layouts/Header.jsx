import React from 'react'
import Box from '../components/Box'
import { AiOutlineSearch } from 'react-icons/ai'
import { Input } from '../components/index'
import useToggle from '../hook/useToggle'

const Header = () => {
    const [toggle, setOpen] = useToggle(false)

    const handleSearch = () => {
        setOpen(prev => !prev)
    }
    return (
        <Box className='
            bg-gradient-to-b from-slate-300 via-slate-200 to-slate-50 rounded-md 
            drop-shadow-lg flex justify-center px-2 leading-10
        '>
            <div className='flex items-center justify-between gap-4 p-2'>
                <div className='flex justify-start'>Left {'>'} Top 2024</div>
                <div className='flex items-center justify-center gap-3'>
                    <div
                        className='cursor-pointer p-2 hover:bg-[rgba(255,255,255,0.2)] rounded-md'
                        onClick={handleSearch}
                    >
                        <AiOutlineSearch />
                    </div>
                    {toggle && (
                        <Input
                            type='text'
                            placeholder='Search . . .'
                            className={` absolute left-0
                                    transition-all duration-300 ease-out transform 
                                    ${toggle ? 'translate-x-0' : '-translate-x-full'}
                                `}
                        />
                    )}
                    <div>New Releases</div>
                    <div>New Feed</div>
                    <div>Shuffle Play</div>
                </div>
                <div>Right</div>
            </div>
        </Box>
    )
}

export default Header