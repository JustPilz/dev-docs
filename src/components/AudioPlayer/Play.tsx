import React from 'react';
import styles from './styles.module.css';
import { useAudioPlayer } from './AudioPlayer';

type PlayProps = {
  src: string;
};

const PlaySVG = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="12"
    height="16"
    viewBox="0 0 18 24"
  >
    <path fillRule="evenodd" d="M18 12L0 24V0" className={styles.icon}></path>
  </svg>
);

const PauseSVG = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="12"
    height="16"
    viewBox="0 0 18 24"
  >
    <path
      fillRule="evenodd"
      d="M0 0h6v24H0zM12 0h6v24h-6z"
      className={styles.icon}
    ></path>
  </svg>
);

export const Play = ({ src }: PlayProps) => {
  const { play, pause, isPlaying } = useAudioPlayer();

  const togglePlayPause = () => {
    isPlaying(src) ? pause() : play(src);
  };

  return (
    <div className={styles.player}>
      <button className={styles.playPause} onClick={togglePlayPause}>
        {isPlaying(src) ? <PauseSVG /> : <PlaySVG />}
      </button>
    </div>
  );
};
