import React from 'react'
import { AiOutlineSearch } from 'react-icons/ai'
import useToggle from '../hook/useToggle'
import { Search } from '../components/index'

const Header = () => {
    const [toggle, setOpen] = useToggle(false)

    const handleSearch = () => {
        setOpen(prev => !prev)
    }
    return (
        <div className='flex items-center justify-between gap-4 mx-4 px-2 h-16 border-b-2 border-b-[rbga(255,255,255,.5)]'>
            <div className='flex justify-start'>Left {'>'} Top 2024</div>
            <div className='flex items-center justify-center gap-3'>
                <div
                    className='cursor-pointer p-2 hover:bg-[rgba(255,255,255,0.2)] rounded-md'
                    onClick={handleSearch}
                >
                    <AiOutlineSearch />
                </div>
                {toggle && (
                    <Search />
                )}
                <div>New Releases</div>
                <div>New Feed</div>
                <div>Shuffle Play</div>
            </div>
            <div>Right</div>
        </div>
    )
}

export default Header