import React, { useContext, createContext, useState, useEffect } from 'react';

import { calculateDuration } from '../utils/calculateDuration';

const SettingsContext = createContext();

export const useSettings = () => useContext(SettingsContext);

export const SettingsProvider = ({ children }) => {
    const [audioTime, setAudioTime] = useState();
    const [simultaneous, setSimultaneous] = useState(1);
    const [section, setSection] = useState('intro');
    const [reverse, setReverse] = useState('off');
    const [duration, setDuration] = useState();

    useEffect(() => {
        setAudioTime(2000*simultaneous);
        setDuration(calculateDuration(simultaneous));
    }, [simultaneous]);

    const value = {
        simultaneous,
        section,
        reverse,
        duration,
        audioTime,
        setSimultaneous,
        setSection,
        setReverse,
        setDuration,
    };

    return (
        <SettingsContext.Provider value={value}>
            {children}
        </SettingsContext.Provider>
    );
};
