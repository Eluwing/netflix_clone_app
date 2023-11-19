import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { makeImagePath } from '../utils';
import { DetailIcon, DislikeIcon, LikeIcon, PlayIcon, PlusIcon } from '../icon/HoverIcons';

const HoverCover = styled(motion.div)<{ bgCoverPhoto: string }>`
  width: 100%;
  height: 100px;
  border-radius: 10px 10px 0 0;
  background-image: url(${(props) => props.bgCoverPhoto});
  background-size: cover;
  background-position: center;
`;

const HoverTitle = styled(motion.div)`
  padding-left: 10px;
  text-align: center;
  font-size: 18px;
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
  return (
    <>
      <HoverCover bgCoverPhoto={makeImagePath(backdropPath ?? '', 'w500')}>
        <HoverTitle>{title}</HoverTitle>
      </HoverCover>
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
