import { useState, useEffect } from 'react';

const useAudioContext = () => {
    const [audioContext, setAudioContext] = useState(null);

    const initializeAudioContext = () => {
        if (!audioContext) {
            const context = new (window.AudioContext || window.webkitAudioContext)();
            setAudioContext(context);
        } else {
            // Resume the AudioContext if it's already suspended
            audioContext.resume().catch((e) => console.error("Error resuming AudioContext:", e));
        }
    };

    useEffect(() => {
        if (audioContext) {
            // Do something with the AudioContext here if needed
        }
    }, [audioContext]);

    return { audioContext, initializeAudioContext };
};

export default useAudioContext;