import React, { useRef } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { DetailIcon, DislikeIcon, LikeIcon, PlayIcon, PlusIcon } from '../icon/HoverIcons';

const HoverVideoCover = styled(motion.video)`
  height: auto;
  border-radius: 10px 10px 0 0;
  max-width: 100%;
`;

const HoverButtonArea = styled(motion.div)`
  padding: 1rem;
  background-color: #1c1c1c;
  border-radius: 0 0 15px 15px;
`;
const HoverButton = styled(motion.div)`
  padding: 0.4rem;
  margin-right: 0.4rem;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  border: 2px solid rgba(255, 255, 255, 0.5);
  cursor: pointer;
  transition: all 250ms;
  border-radius: 50%;
  width: 28px;
  height: 28px;
  fill: currentColor;

  &:hover {
    background: white;
    .card__icon {
      fill: #141414;
    }
  }
`;

interface HoverDetailProps {
  backdropPath: string;
  title: string | undefined;
}

function HoverDetail({ backdropPath, title }: HoverDetailProps): JSX.Element {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  // // If want get Video to URL
  // const stopMovie = async (): Promise<void> => {
  //   if (videoRef.current) {
  //     try {
  //       await videoRef.current.pause();
  //     } catch (error) {
  //       throw new Error('Error hover stopMoive component', error || '');
  //     }
  //   }
  // };
  // const playMoive = async (): Promise<void> => {
  //   if (videoRef.current) {
  //     if (videoRef.current) {
  //       try {
  //         await videoRef.current.play();
  //       } catch (error) {
  //         throw new Error('Error hover playMoive component', error || '');
  //       }
  //     }
  //   }
  // If want get Video to public folder
  const stopMovie = (): void => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
  };
  const playMoive = (): void => {
    if (videoRef.current) {
      // Because mute promises error
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      videoRef.current.play();
    }
  };
  return (
    <>
      {/* If want get Video to URL */}
      {/* <HoverVideoCover
        ref={videoRef}
        onMouseOver={async () => await playMoive()}
        onMouseOut={async () => await stopMovie()}
        src="https://s3.amazonaws.com/codecademy-content/courses/React/react_video-cute.mp4"
      /> */}
      {/* If want get Video to public folder */}
      <HoverVideoCover
        ref={videoRef}
        onMouseOver={() => playMoive()}
        onMouseOut={() => stopMovie()}
        muted
      >
        <source src="videos/sample_hover_video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </HoverVideoCover>
      <HoverButtonArea>
        <HoverButton>
          <PlayIcon />
        </HoverButton>
        <HoverButton>
          <PlusIcon />
        </HoverButton>
        <HoverButton>
          <LikeIcon />
        </HoverButton>
        <HoverButton>
          <DislikeIcon />
        </HoverButton>
        <HoverButton>
          <DetailIcon />
        </HoverButton>
      </HoverButtonArea>
    </>
  );
}
export default HoverDetail;
