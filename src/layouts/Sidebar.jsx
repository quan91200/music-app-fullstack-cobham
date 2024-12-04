import PropTypes from 'prop-types';
import React from 'react';
import Box from '../components/Box';

const Sidebar = ({ children }) => {
    return (
        <Box className="p-3 bg-[rgba(255,255,255,.3)] rounded-md h-full">
            <div className="
                font-['Zen_Dots'] font-extrabold not-italic text-lg
                text-red-500 flex justify-center items-start h-full"
            >
                SOUNDIFY
            </div>
            <Box>
                {children}
            </Box>
        </Box>
    );
};

export default Sidebar;


Sidebar.propTypes = {
    children: PropTypes.node
}