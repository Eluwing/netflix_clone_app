import React from 'react';
/**
 * SVG Icon component for detail view.
 * @returns {JSX.Element} Detail icon SVG.
 */
export const DetailIcon = (): JSX.Element => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="card__icon"
      width="24"
      height="24"
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        fillRule="evenodd"
        d="M2.469 6.969a.75.75 0 011.062 0L12 15.439l8.469-8.47a.75.75 0 111.062 1.062l-9 9a.75.75 0 01-1.062 0l-9-9a.75.75 0 010-1.062z"
        clipRule="evenodd"
      />
    </svg>
  );
};

/**
 * SVG Icon component for dislike action.
 * @returns {JSX.Element} Dislike icon SVG.
 */
export const DislikeIcon = (): JSX.Element => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="card__icon"
      width="24"
      height="24"
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path d="M21.856 10.561a4.353 4.353 0 00-.421-2.952 4.52 4.52 0 00-.813-3.14C20.578 1.848 18.943 0 15.328 0h-1.041C9.43 0 7.922 1.875 6 1.875h-.508A1.494 1.494 0 004.5 1.5h-3A1.5 1.5 0 000 3v11.25a1.5 1.5 0 001.5 1.5h3c.555 0 1.04-.302 1.299-.75h.33c.898.795 2.157 2.843 3.223 3.91.641.64.476 5.09 3.364 5.09 2.7 0 4.466-1.497 4.466-4.91 0-.862-.184-1.58-.415-2.18h1.71c2.278 0 4.023-1.95 4.023-4.012 0-.898-.233-1.64-.644-2.337zM3 13.875a1.125 1.125 0 110-2.25 1.125 1.125 0 010 2.25zm15.477.784h-4.874c0 1.773 1.329 2.596 1.329 4.432 0 1.113 0 2.659-2.216 2.659-.886-.886-.443-3.102-1.773-4.432-1.245-1.245-3.102-4.568-4.431-4.568H6V4.023c2.513 0 4.688-1.773 8.046-1.773h1.772c1.665 0 2.851.803 2.49 3.09.713.382 1.243 1.708.654 2.698 1.012.956.876 2.394.244 3.076.443 0 1.048.886 1.044 1.772-.004.887-.783 1.773-1.773 1.773z" />
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

/**
 * SVG Icon component for play action.
 * @returns {JSX.Element} Play icon SVG.
 */
export const PlayIcon = (): JSX.Element => {
  return (
    <svg
      className="card__icon"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path d="M21.44 10.72L5.96 2.98A1.38 1.38 0 004 4.213v15.474a1.373 1.373 0 002 1.233l15.44-7.74a1.38 1.38 0 000-2.467v.007z" />
    </svg>
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
