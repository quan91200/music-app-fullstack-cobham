import React, { useState } from 'react'
import { Button, DropdownBgColor } from '../components/index'

const Dashboard = () => {
    // eslint-disable-next-line no-unused-vars
    const [background, setBackground] = useState("")

    const handleUpdateBackground = (gradient) => {
        setBackground(gradient)
    }
    return (
        <Button>
            <DropdownBgColor onUpdateBackground={handleUpdateBackground} />
        </Button>
    )
}

export default Dashboard