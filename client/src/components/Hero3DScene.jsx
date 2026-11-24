import React from 'react';
import aliRazaStatic from '../assets/ali-raza-static.png';

/*
  Static Portrait — Ali Raza
  ────────────────────────────────────────────────────────────────────────────
  • 100% static: zero mouse movement, zero deformation, zero fluctuation.
  • Uses the user-provided pristine portrait image.
  • Premium visual presentation with soft ambient drop-shadow.
*/

export default function Hero3DScene() {
  return (
    <div
      className="relative w-full mx-auto select-none flex items-center justify-center"
      style={{
        maxWidth: '440px',
        filter: 'drop-shadow(0 20px 35px rgba(15, 23, 42, 0.12))',
      }}
    >
      <img
        src={aliRazaStatic}
        alt="Ali Raza - MERN Full Stack Developer & ERP Developer"
        className="w-full h-auto max-h-[500px] object-contain rounded-2xl"
        draggable={false}
      />
    </div>
  );
}
