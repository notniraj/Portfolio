"use client";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";

export function MusicPlayer() {
    const [isPlaying, setIsPlaying] = useState(true);
    const [isMuted, setIsMuted] = useState(false);
    const [volume, setVolume] = useState(0.3);
    const [showVolume, setShowVolume] = useState(false);
    const audioRef = useRef<HTMLAudioElement>(null);

    // Auto-play on mount with user interaction
    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        // Set initial volume
        audio.volume = volume;

        // Attempt autoplay (will be blocked by most browsers until user interaction)
        const playPromise = audio.play();
        if (playPromise !== undefined) {
            playPromise
                .then(() => {
                    setIsPlaying(true);
                })
                .catch(() => {
                    // Autoplay blocked - user needs to click play
                    setIsPlaying(false);
                });
        }
    }, []);

    const togglePlay = () => {
        const audio = audioRef.current;
        if (!audio) return;

        if (isPlaying) {
            audio.pause();
        } else {
            audio.play();
        }
        setIsPlaying(!isPlaying);
    };

    const toggleMute = () => {
        const audio = audioRef.current;
        if (!audio) return;

        audio.muted = !isMuted;
        setIsMuted(!isMuted);
    };

    const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newVolume = parseFloat(e.target.value);
        setVolume(newVolume);
        if (audioRef.current) {
            audioRef.current.volume = newVolume;
            if (newVolume === 0) {
                setIsMuted(true);
            } else if (isMuted) {
                setIsMuted(false);
                audioRef.current.muted = false;
            }
        }
    };

    return (
        <>
            {/* Audio element - hidden but functional */}
            <audio
                ref={audioRef}
                loop
                preload="auto"
                src="/music/bg.mp3"
            />

            {/* Floating music player UI */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="fixed top-6 right-6 z-50 flex items-center gap-3"
                onMouseEnter={() => setShowVolume(true)}
                onMouseLeave={() => setShowVolume(false)}
            >
                {/* Volume slider - appears on hover */}
                <AnimatePresence>
                    {showVolume && (
                        <motion.div
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 10 }}
                            className="flex items-center gap-2 bg-white/10 dark:bg-black/30 backdrop-blur-xl rounded-full px-4 py-2 border border-white/20"
                        >
                            <input
                                type="range"
                                min="0"
                                max="1"
                                step="0.01"
                                value={volume}
                                onChange={handleVolumeChange}
                                className="w-20 h-1 bg-neutral-300 dark:bg-neutral-700 rounded-lg appearance-none cursor-pointer
                  [&::-webkit-slider-thumb]:appearance-none
                  [&::-webkit-slider-thumb]:w-3
                  [&::-webkit-slider-thumb]:h-3
                  [&::-webkit-slider-thumb]:rounded-full
                  [&::-webkit-slider-thumb]:bg-neutral-200
                  dark:[&::-webkit-slider-thumb]:bg-white
                  [&::-webkit-slider-thumb]:cursor-pointer
                  [&::-moz-range-thumb]:w-3
                  [&::-moz-range-thumb]:h-3
                  [&::-moz-range-thumb]:rounded-full
                  [&::-moz-range-thumb]:bg-neutral-200
                  dark:[&::-moz-range-thumb]:bg-white
                  [&::-moz-range-thumb]:border-0
                  [&::-moz-range-thumb]:cursor-pointer"
                            />
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Mute/Unmute button */}
                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={toggleMute}
                    className="p-3 bg-white/10 dark:bg-black/30 backdrop-blur-xl rounded-full border border-white/20 hover:bg-white/20 dark:hover:bg-black/40 transition-colors"
                    aria-label={isMuted ? "Unmute" : "Mute"}
                >
                    {isMuted ? (
                        <VolumeX className="w-5 h-5 text-neutral-200 dark:text-neutral-300" />
                    ) : (
                        <Volume2 className="w-5 h-5 text-neutral-200 dark:text-neutral-300" />
                    )}
                </motion.button>

                {/* Play/Pause button */}
                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={togglePlay}
                    className="p-3 bg-white/10 dark:bg-black/30 backdrop-blur-xl rounded-full border border-white/20 hover:bg-white/20 dark:hover:bg-black/40 transition-colors"
                    aria-label={isPlaying ? "Pause music" : "Play music"}
                >
                    <AnimatePresence mode="wait">
                        {isPlaying ? (
                            <motion.div
                                key="pause"
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                exit={{ scale: 0 }}
                            >
                                <Pause className="w-5 h-5 text-neutral-200 dark:text-neutral-300" />
                            </motion.div>
                        ) : (
                            <motion.div
                                key="play"
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                exit={{ scale: 0 }}
                            >
                                <Play className="w-5 h-5 text-neutral-200 dark:text-neutral-300 ml-0.5" />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.button>

                {/* Now playing indicator */}
                {isPlaying && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="flex items-center gap-1"
                    >
                        <span className="w-1 h-3 bg-green-500 rounded-full animate-pulse" style={{ animationDelay: "0ms" }} />
                        <span className="w-1 h-4 bg-green-500 rounded-full animate-pulse" style={{ animationDelay: "150ms" }} />
                        <span className="w-1 h-3 bg-green-500 rounded-full animate-pulse" style={{ animationDelay: "300ms" }} />
                    </motion.div>
                )}
            </motion.div>
        </>
    );
}