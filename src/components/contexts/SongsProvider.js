import React, { useContext, createContext, useState, useEffect } from 'react';

import { SONGS, REVERSED } from '@env';
import { getRandomMinMax, getRandomFloor } from '../utils/getRandom';

const SongsContext = createContext();

export const useSongs = () => useContext(SongsContext);

export const SongsProvider = ({ children }) => {

    const coeff = 1000;
    const [info, setInfo] = useState();
    const [reversed, setReversed] = useState();
    const [loading, setLoading] = useState(true);
    const [tracks, setTracks] = useState([]);

    useEffect(() => {
        (async () => {
            await fetch(`${SONGS}`).then(res => res.json()).then(res => {
                setInfo(res.info);
                setTracks(Array.from(Array(res.info.length), (x, index) => index));
            });
            await fetch(`${REVERSED}`).then(res => res.json()).then(res => {
                setReversed(res.info);
                setLoading(false);
            });
        })();
    }, []);

    const resetTracks = () => {;
        setTracks(Array.from(Array(info.length), (x, index) => index));
    };

    const getSongs = (simultaneous, section, audioTime, reverse) => {

        const songs = [];
        const tracksCopy = tracks;

        if (tracksCopy.length >= simultaneous) {
            let num = simultaneous;
            while (tracksCopy.length > 0 && num > 0) {
                const index = getRandomFloor(tracksCopy.length);
                const value = tracksCopy[index];
                const song = reverse === 'off' ? info[value] : reversed[value];
                
                const intro = reverse === 'off' ? song.intro : song.outro;
                const outro = reverse === 'off' ? song.outro : song.intro;
                const middle = song.middle;
                let position;
                
                if (section === 'intro') position = intro * coeff;
                else if (section === 'outro') position = (outro * coeff) - audioTime;
                else if (section === 'rnd') {
                    let start = intro;
                    let end = outro;
                    // remove unwanted parts from the middle of the song
                    if (middle && middle.length > 0) {
                        if ( (middle[0].start - start) < (audioTime / coeff) ) {
                            start = middle[0].end;
                            middle.shift();
                          }
    
                        if ( (end - middle[middle.length - 1].end) < (audioTime / coeff) ) {
                            end = middle[middle.length - 1].start;
                            middle.pop();
                        }
    
                        let i = 0;
                        while (i < middle.length && middle.length > 1) {
                          if (middle[i+1] && (middle[i+1].start - middle[i].end) < (audioTime / coeff) ) {
                            middle[i+1].start = middle[i].start;
                            middle.splice(i, 1);
                          } else {
                            i++;
                          }
                        }
    
                        // choose randomly one of the intervals
                        const mmax = middle.length + 1;
                        const mmin = 1;
                        const interval = getRandomFloor(mmax + 1) + 1;
                        if (interval === mmax) start = middle[mmax - 2].end;
                        else if (interval === mmin) end = middle[0].start;
                        else {
                            try {
                              start = middle[interval - 2].end;
                              end = middle[interval - 1].start;
                            } catch (e) {
                              start = intro;
                              end = middle[0].start;
                            }
                        }
                    }
    
                    position = getRandomMinMax(start * coeff, (end * coeff) - audioTime, coeff);
                }

                songs.push({ uri: song.uri, title: song.title, other: song.other, position });
                tracksCopy.splice(index, 1);
                num--;
            }
        }
        
        setTracks(tracksCopy);
        return songs;
    };

    const value = {
        getSongs,
        resetTracks,
        loading,
    };

    return (
        <SongsContext.Provider value={value}>
            {children}
        </SongsContext.Provider>
    );
};