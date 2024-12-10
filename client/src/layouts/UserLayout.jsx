import React from 'react'
import Sidebar from './Sidebar'
import Header from './Header'
import Footer from './Footer'
import PropTypes from 'prop-types'

const DefaultLayout = ({ children }) => {
    return (
        <div className='h-screen flex flex-col'>
            <div className='flex flex-1 gap-2 my-3 mx-2 overflow-hidden'>
                <div className='w-1/6'>
                    <Sidebar />
                </div>
                <div className='flex-1 flex flex-col overflow-hidden bg-[rgba(255,255,255,.3)] 
            rounded-md'>
                    <div>
                        <Header />
                    </div>
                    <div className='flex-1 overflow-y-auto'>
                        {children}
                    </div>
                </div>
            </div>
            <div className='mx-2 mb-2'>
                <Footer />
            </div>
        </div>
    )
}

export default DefaultLayout

DefaultLayout.propTypes = {
    children: PropTypes.node
}