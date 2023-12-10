import React, { useRef } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { DetailIcon, PlayIcon, PlusIcon } from '../icon/HoverIcons';

const VideoCover = styled(motion.video)`
  height: auto;
  border-radius: 10px 10px 0 0;
  max-width: 100%;
`;

const VideoPlayTools = styled(motion.div)``;

const ButtonArea = styled(motion.div)`
  padding: 1rem;
  background-color: #1c1c1c;
  border-radius: 0 0 15px 15px;
  display: flex;
  justify-content: space-between;
`;
const CommonButton = styled(motion.div)`
  padding: 0.4rem;
  margin-right: 0.4rem;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  border: 2px solid rgba(255, 255, 255, 0.5);
  cursor: pointer;
  transition: all 250ms;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  fill: currentColor;

  &:hover {
    background: white;
    .card__icon {
      fill: #141414;
    }
  }
`;
const DetailButton = styled(CommonButton)``;

const VideoDetail = styled.div``;

const TopPannel = styled.div``;

const BottomPannel = styled.div``;

const MatchArea = styled.div``;

const GenreArea = styled.div``;

const AgeCategoryArea = styled.div``;

const VideoQuality = styled.div``;

interface HoverDetailProps {
  backdropMoviePath: string;
  screenId: string;
  screenType: number;
}

/**
 * HoverDetail component for displaying hover details,
 * including video playback and additional information.
 * @param {string} backdropMoviePath - The path to the backdrop video file.
 * @returns {JSX.Element} - HoverDetail component.
 */
function HoverDetail({ backdropMoviePath }: HoverDetailProps): JSX.Element {
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
  /**
   * Pauses the video playback.
   */
  const stopMovie = (): void => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
  };
  /**
   * Initiates video playback.
   */
  const playMoive = (): void => {
    if (videoRef.current) {
      // Add comment Because mute promises error
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
      <VideoCover
        ref={videoRef}
        onMouseOver={() => playMoive()}
        onMouseOut={() => stopMovie()}
        muted
      >
        {backdropMoviePath ? (
          <source src={backdropMoviePath} type="video/mp4" />
        ) : (
          <source src="videos/sample_hover_video.mp4" type="video/mp4" />
        )}
        Your browser does not support the video tag.
      </VideoCover>
      <ButtonArea>
        <VideoPlayTools>
          <CommonButton>
            <PlayIcon />
          </CommonButton>
          <CommonButton>
            <PlusIcon />
          </CommonButton>
        </VideoPlayTools>
        <DetailButton>
          <DetailIcon />
        </DetailButton>
      </ButtonArea>
      <VideoDetail>
        <TopPannel>
          <MatchArea></MatchArea>
          <AgeCategoryArea></AgeCategoryArea>
          <VideoQuality></VideoQuality>
        </TopPannel>
        <BottomPannel>
          <GenreArea></GenreArea>
        </BottomPannel>
      </VideoDetail>
    </>
  );
}
export default HoverDetail;
