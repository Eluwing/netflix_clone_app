import React from 'react';
import styled from 'styled-components';

const PlayButton = styled.div`
  display: flex;
  width: 120px;
  height: 45px;
  background-color: #ffffff;
  border-radius: 5px;
  cursor: pointer;
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: scale(1.1);
  }
`;

const PlayButtonIcon = styled.svg`
  width: 50px;
  height: 50px;
`;
const PlayButtonText = styled.div`
  color: black;
  display: flex;
  align-items: center;
  font-weight: 900;
  margin-left: 10px;
`;
const MoreInfoButton = styled.div`
  display: flex;
  width: 150px;
  height: 45px;
  background-color: #ffffff;
  border-radius: 5px;
  cursor: pointer;
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: scale(1.1);
  }
`;
const MoreInfoButtonIcon = styled.svg``;
const MoreInfoText = styled.div`
  color: black;
  display: flex;
  align-items: center;
  font-weight: 900;
  margin-left: 10px;
`;
const CircleStyle = styled.div`
  padding: 0.4rem;
  margin-left: 0.6rem;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  border: 2px solid rgba(255, 255, 255, 0.5);
  cursor: pointer;
  transition: all 250ms;
  border-radius: 50%;
  width: 48px;
  height: 48px;
  fill: #141414;

  &:hover {
    background: white;
    .card__icon {
      fill: #141414;
    }
  }
`;

const SubtitleButton = styled.div`
  width: 100%;
  height: 100%;
  cursor: pointer;
  display: flex;
  align-items: center;
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: scale(1.1);
  }
  .cls-1 {
    fill: none;
  }
`;

/**
 * SVG Icon component for detail view.
 * @returns {JSX.Element} Detail icon SVG.
 */
export const PlayIcon = (): JSX.Element => {
  return (
    <PlayButton>
      <PlayButtonIcon xmlns="http://www.w3.org/2000/svg" viewBox="-5 9 50 50">
        <path fill="#000" d="M25 20.9998L43 32.0002L25 43.0002V20.9998Z" />
      </PlayButtonIcon>
      <PlayButtonText>Play</PlayButtonText>
    </PlayButton>
  );
};

/**
 * SVG Icon component for plus action.
 * @returns {JSX.Element} Plus icon SVG.
 */
export const MoreInfoIcon = (): JSX.Element => {
  return (
    <MoreInfoButton>
      <MoreInfoButtonIcon
        width="100%"
        height="100%"
        viewBox="0 0 800 800"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        xmlSpace="preserve"
        style={{
          fillRule: 'evenodd',
          clipRule: 'evenodd',
          strokeLinejoin: 'round',
          strokeMiterlimit: 1.41421,
        }}
      >
        <g transform="matrix(1.74664,0,0,1.74642,-252.1,-60.7251)">
          <g id="Ebene1">
            <g>
              <g transform="matrix(3.48575,0,0,3.48575,-650.368,-420.328)">
                <circle
                  cx={293.685}
                  cy={196.267}
                  r={65.165}
                  style={{
                    fill: 'rgb(185,185,185)',
                  }}
                />
              </g>
              <g transform="matrix(3.08698,0,0,3.08698,-779.162,-550.57)">
                <path
                  d="M383.686,244.808L383.686,311.2L393.411,311.2L393.411,318.84L354.496,318.84L354.496,311.2L363.406,311.2L363.406,255.222L354.496,251.655L354.496,244.808L383.686,244.808Z"
                  style={{
                    fill: 'white',
                  }}
                />
              </g>
              <g transform="matrix(3.22886,0,0,3.22886,-797.323,-547.116)">
                <circle
                  cx={362.95}
                  cy={211.755}
                  r={11.84}
                  style={{
                    fill: 'white',
                  }}
                />
              </g>
            </g>
          </g>
        </g>
      </MoreInfoButtonIcon>
      <MoreInfoText>More Info</MoreInfoText>
    </MoreInfoButton>
  );
};
