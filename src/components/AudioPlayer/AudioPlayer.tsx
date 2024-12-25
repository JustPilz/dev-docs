import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';

type AudioPlayerContextType = {
  playingSrc: string | null;
  play: (src: string) => void;
  pause: () => void;
  isPlaying: (src: string) => boolean;
};

const AudioPlayerContext = createContext<AudioPlayerContextType | undefined>(
  undefined
);

export const AudioPlayerProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [playingSrc, setPlayingSrc] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio();
    () => {
      audioRef.current = null;
    };
  }, []);

  const play = (src: string) => {
    if (audioRef.current) {
      audioRef.current.pause();
    }

    if (playingSrc == src) {
      setIsPaused(false);
      return audioRef.current.play();
    }

    audioRef.current = new Audio(src);
    audioRef.current.play();
    setIsPaused(false);
    setPlayingSrc(src);

    audioRef.current.onended = () => {
      setPlayingSrc(null);
    };
  };

  const pause = () => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
    setIsPaused(true);
  };

  const isPlaying = (src: string) => {
    return playingSrc === src && !isPaused;
  };

  return (
    <AudioPlayerContext.Provider value={{ playingSrc, play, pause, isPlaying }}>
      {children}
    </AudioPlayerContext.Provider>
  );
};

export const useAudioPlayer = () => {
  const context = useContext(AudioPlayerContext);
  if (!context) {
    throw new Error(
      'useAudioPlayer must be used within an AudioPlayerProvider'
    );
  }
  return context;
};
