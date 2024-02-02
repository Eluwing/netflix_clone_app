import React from 'react';
import styled from 'styled-components';

const PlayButton = styled.div`
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: transparent;
  cursor: pointer;
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: scale(1.1);
  }
`;

const PlayButtonIcon = styled.svg`
  width: 100%;
  height: 100%;
`;

/**
 * SVG Icon component for detail view.
 * @returns {JSX.Element} Detail icon SVG.
 */
export const PlayIcon = (): JSX.Element => {
  return (
    <PlayButton>
      <PlayButtonIcon xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64">
        <circle cx="32" cy="32" r="32" fill="#000" />
        <path fill="#FFF" d="M25 20.9998L43 32.0002L25 43.0002V20.9998Z" />
      </PlayButtonIcon>
    </PlayButton>
  );
};

/**
 * SVG Icon component for plus action.
 * @returns {JSX.Element} Plus icon SVG.
 */
export const PlusIcon = (): JSX.Element => {
  return (
    <svg
      className="card__icon"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path d="M12 0a1.5 1.5 0 011.5 1.5v9h9a1.5 1.5 0 110 3h-9v9a1.5 1.5 0 11-3 0v-9h-9a1.5 1.5 0 110-3h9v-9A1.5 1.5 0 0112 0z" />
    </svg>
  );
};

/**
 * SVG Icon component for like action.
 * @returns {JSX.Element} Like icon SVG.
 */
export const LikeIcon = (): JSX.Element => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="card__icon"
      width="24"
      height="24"
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path d="M4.875 10.5h-3.75C.504 10.5 0 11.004 0 11.625v11.25C0 23.496.504 24 1.125 24h3.75C5.496 24 6 23.496 6 22.875v-11.25c0-.621-.504-1.125-1.125-1.125zM3 22.125a1.125 1.125 0 110-2.25 1.125 1.125 0 010 2.25zM18 3.818c0 1.988-1.217 3.104-1.56 4.432h4.768c1.566 0 2.785 1.3 2.792 2.723.004.841-.354 1.746-.911 2.306l-.005.006c.46 1.094.386 2.626-.437 3.725.407 1.213-.003 2.705-.768 3.504.202.825.106 1.527-.288 2.092C20.634 23.981 18.263 24 16.258 24h-.133c-2.264 0-4.116-.825-5.605-1.487-.748-.333-1.726-.745-2.468-.759a.563.563 0 01-.552-.562v-10.02c0-.15.06-.294.167-.4 1.857-1.835 2.655-3.777 4.177-5.302.694-.695.947-1.745 1.19-2.76.209-.868.645-2.71 1.591-2.71C15.75 0 18 .375 18 3.818z" />
    </svg>
  );
};
