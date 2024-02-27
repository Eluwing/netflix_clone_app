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
  align-items: center;
  justify-content: center;
  width: 150px;
  height: 45px;
  background-color: RGB(97, 97, 97, 0.5);
  border-radius: 5px;
  cursor: pointer;
  transition: transform 0.2s ease-in-out;
  &:hover {
    transform: scale(1.1);
  }
`;
const MoreInfoButtonIcon = styled.svg``;
const MoreInfoText = styled.div`
  color: #ffffff;
  display: flex;
  align-items: center;
  font-weight: 900;
  margin-left: 10px;
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
        height="20px"
        width="20px"
        id="Capa_1"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        viewBox="0 0 202.978 202.978"
        xmlSpace="preserve"
      >
        <g>
          <g>
            <g>
              <g>
                <path
                  style={{
                    fill: 'white',
                  }}
                  d="M100.942,0.001C44.9,0.304-0.297,45.98,0.006,102.031 c0.293,56.051,45.998,101.238,102.02,100.945c56.081-0.303,101.248-45.978,100.945-102.02 C202.659,44.886,157.013-0.292,100.942,0.001z M101.948,186.436c-46.916,0.234-85.108-37.576-85.372-84.492 c-0.244-46.907,37.537-85.157,84.453-85.411c46.926-0.254,85.167,37.596,85.421,84.483 C186.695,147.951,148.855,186.182,101.948,186.436z M116.984,145.899l-0.42-75.865l-39.149,0.254l0.078,16.6l10.63-0.059 l0.313,59.237l-11.275,0.039l0.088,15.857l49.134-0.264l-0.098-15.847L116.984,145.899z M102.065,58.837 c9.575-0.039,15.349-6.448,15.3-14.323c-0.254-8.07-5.882-14.225-15.095-14.186c-9.184,0.059-15.173,6.292-15.134,14.362 C87.185,52.555,93.028,58.906,102.065,58.837z"
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
