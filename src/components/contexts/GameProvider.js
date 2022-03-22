import React, { useContext, createContext, useState, useEffect } from 'react';
import { Keyboard } from 'react-native';

import { calculateDuration } from '../utils/calculateDuration';
import { useSongs } from './SongsProvider';
import { useSettings } from './SettingsProvider';

const GameContext = createContext();

export const useGame = () => useContext(GameContext);

export const GameProvider = ({ children }) => {

    const { simultaneous, section, audioTime, reverse, setDuration } = useSettings();
    const { getSongs, resetTracks, loading } = useSongs();

    const [firstPlay, setFirstPlay] = useState(true);
    const [startAnimation, setStartAnimation] = useState(false);
    const [editable, setEditable] = useState(false);
    const [points, setPoints] = useState(0);

    const [gameOver, setGameOver] = useState(false);
    const [hasWon, setHasWon] = useState(false);
    const [clearAudio, setClearAudio] = useState(false);

    const [songs, setSongs] = useState([]);
    const [guess, setGuess] = useState();
    const [correct, setCorrect] = useState([]);

    const updatePoints = (add) => {
        setPoints(prev => prev + parseInt(add));
        if (songs.length <= 0) setHasWon(true);
    };

    useEffect(() => {
        if (!firstPlay && !hasWon) {
            setGameOver(true);
            setSongs([]);
        } else setSongs(getSongs(simultaneous, section, audioTime, reverse));
    }, [simultaneous, section, audioTime, reverse, loading]);

    useEffect(() => {
        if (guess) {
            const text = guess.toLowerCase().replace(/[\s.,'!&-]/g,'');
            for (let i = 0; i < songs.length; i++) {
                const titles = [...songs[i].title, ...songs[i].other];
                for (let j = 0; j < titles.length; j++) {
                    if (text === titles[j].toLowerCase().replace(/[\s.,'!&-]/g,'')) {
                        if (correct.indexOf(songs[i].title) <= -1) {
                            setGuess();

                            if (correct.length + 1 === songs.length) {
                                stageCleared();
                            } else setCorrect(prev => [...prev, songs[i].title]);
                            break;
                        }
                    }
                }
            }

        }
    }, [guess]);

    const stageCleared = () => {
        Keyboard.dismiss();
        setClearAudio(true);
        setStartAnimation(false);
        setEditable(false);
        setCorrect([]);
        setSongs(getSongs(simultaneous, section, audioTime, reverse));
    };

    const restart = () => {
        resetTracks();
        setStartAnimation(false);
        setPoints(0);
        setGameOver(false);
        setHasWon(false);
        setFirstPlay(true);
        setEditable(false);
        setGuess();
        setDuration(calculateDuration(simultaneous));
        setSongs(getSongs(simultaneous, section, audioTime, reverse));
    };

    const value = {
        setStartAnimation,
        setEditable,
        updatePoints,
        setGameOver,
        restart,
        setGuess,
        setClearAudio,
        setFirstPlay,
        startAnimation,
        editable,
        points,
        gameOver,
        hasWon,
        guess,
        songs,
        clearAudio,
    };

    return (
        <GameContext.Provider value={value}>
            {children}
        </GameContext.Provider>
    );
};
