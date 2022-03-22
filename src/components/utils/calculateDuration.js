export const maxPoints = 315;

// duration of animation for one simultaneous song
const duration = 30000;

export const calculateDuration = (simultaneous, point = maxPoints) => {
    const d = (duration * simultaneous);
    const m = d / maxPoints;
    return m * point;
};