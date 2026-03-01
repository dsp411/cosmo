import React, { useEffect, useRef } from 'react';

export default function Face() {
  const faceRef = useRef<HTMLDivElement>(null);
  const leftPupilRef = useRef<HTMLDivElement>(null);
  const rightPupilRef = useRef<HTMLDivElement>(null);
  const mouthRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!faceRef.current || !leftPupilRef.current || !rightPupilRef.current || !mouthRef.current) return;

      const faceRect = faceRef.current.getBoundingClientRect();
      const faceCenterX = faceRect.left + faceRect.width / 2;
      const faceCenterY = faceRect.top + faceRect.height / 2;

      const dx = e.clientX - faceCenterX;
      const dy = e.clientY - faceCenterY;
      const distance = Math.sqrt(dx * dx + dy * dy);

      const moveX = dx * 0.03;
      const moveY = dy * 0.03;
      faceRef.current.style.transform = `translate(${moveX}px, ${moveY}px)`;

      const updatePupil = (pupil: HTMLDivElement) => {
        const eyeRect = pupil.parentElement!.getBoundingClientRect();
        const eyeCenterX = eyeRect.left + eyeRect.width / 2;
        const eyeCenterY = eyeRect.top + eyeRect.height / 2;
        const angle = Math.atan2(e.clientY - eyeCenterY, e.clientX - eyeCenterX);
        const px = Math.cos(angle) * 18;
        const py = Math.sin(angle) * 18;
        pupil.style.transform = `translate(${px}px, ${py}px)`;
      };

      updatePupil(leftPupilRef.current);
      updatePupil(rightPupilRef.current);

      if (distance < 150) {
        mouthRef.current.style.height = "70px";
        mouthRef.current.style.borderRadius = "50%";
      } else if (distance < 300) {
        mouthRef.current.style.height = "30px";
        mouthRef.current.style.borderRadius = "50%";
      } else {
        mouthRef.current.style.height = "10px";
        mouthRef.current.style.borderRadius = "0";
      }
    };

    document.addEventListener("mousemove", handleMouseMove);
    return () => document.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div ref={faceRef} className="w-[300px] h-[300px] lg:w-[400px] lg:h-[400px] bg-[#ff6a00] rounded-full relative transition-transform duration-200 ease-out shrink-0">
      <div className="w-[80px] h-[80px] lg:w-[110px] lg:h-[110px] bg-white rounded-full absolute flex justify-center items-center left-[50px] lg:left-[70px] top-[80px] lg:top-[110px]">
        <div ref={leftPupilRef} className="w-[35px] h-[35px] lg:w-[45px] lg:h-[45px] bg-black rounded-full transition-transform duration-100 ease-out"></div>
      </div>
      <div className="w-[80px] h-[80px] lg:w-[110px] lg:h-[110px] bg-white rounded-full absolute flex justify-center items-center right-[50px] lg:right-[70px] top-[80px] lg:top-[110px]">
        <div ref={rightPupilRef} className="w-[35px] h-[35px] lg:w-[45px] lg:h-[45px] bg-black rounded-full transition-transform duration-100 ease-out"></div>
      </div>
      <div ref={mouthRef} className="w-[120px] h-[20px] lg:w-[160px] lg:h-[30px] bg-black rounded-full absolute bottom-[70px] lg:bottom-[90px] left-1/2 -translate-x-1/2 transition-all duration-300 ease-in-out"></div>
    </div>
  );
}
