import React, { useEffect, useRef } from 'react'
import { lerp } from 'three/src/math/MathUtils'

const TrailSvg = ({ NO_OF_POINTS = 30 }) => {
   const pathRef = useRef(null);
   const circle1Ref = useRef(null);
   const circle2Ref = useRef(null);
   const gradientRef = useRef(null);
   const mouse = useMouse();
   const smoothMouse = useRef({ x: 0, y: 0 });

   const position = useRef(
      Array.from({ length: NO_OF_POINTS }, () => [0, 0])
   )


   useEffect(() => {
      const tick = () => {
         let d = '';

         smoothMouse.current.x = lerp(smoothMouse.current.x, mouse.x, 0.1);
         smoothMouse.current.y = lerp(smoothMouse.current.y, mouse.y, 0.1);

         for (let i = NO_OF_POINTS - 1; i > 0; i--) {
            position.current[i][0] = position.current[i - 1][0];
            position.current[i][1] = position.current[i - 1][1];
         }

         position.current[0][0] = smoothMouse.current.x;
         position.current[0][1] = smoothMouse.current.y;

         d = 'M ' + position.current.map(p => p.join(' ')).join(' L ');

         pathRef.current.setAttribute('d', d);

         gradientRef.current.setAttribute('x1', position.current[NO_OF_POINTS - 1][0]);
         gradientRef.current.setAttribute('y1', position.current[NO_OF_POINTS - 1][1]);
         gradientRef.current.setAttribute('x2', position.current[0][0]);
         gradientRef.current.setAttribute('y2', position.current[0][1]);

         circle1Ref.current.setAttribute('cx', smoothMouse.current.x);
         circle1Ref.current.setAttribute('cy', smoothMouse.current.y);

         circle2Ref.current.setAttribute('cx', smoothMouse.current.x);
         circle2Ref.current.setAttribute('cy', smoothMouse.current.y);

         requestAnimationFrame(tick)
      }

      tick();
   }, [])

   return (
      <svg className='fixed top-0 left-0 h-screen w-full'>
         <circle ref={circle1Ref} cx="160" cy="160" r="10" fill="none" stroke='white' />
         <circle ref={circle2Ref} filter="url(#filter_shadow_circle)" cx="160" cy="160" r="30" fill="none" stroke='white' strokeWidth={2} />

         <path
            ref={pathRef}
            d="M 0 0 L 100 100"
            strokeWidth={3}
            // stroke='white'
            stroke="url(#paint0_linear_543_3)"
            fill='none'
            strokeLinecap='round'
            filter="url(#filter0_d_1195_95)"
         />

         <defs>
            <linearGradient ref={gradientRef} id="paint0_linear_543_3" x1="0" y1="36" x2="1297" y2="36" gradientUnits="userSpaceOnUse">
               <stop stopColor="white" stopOpacity="0" />
               <stop offset="1" stopColor="white" />
            </linearGradient>

            <filter id="filter_shadow_circle" x="0" y="0" width="826" height="898" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
               <feFlood floodOpacity="0" result="BackgroundImageFix" />
               <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
               <feMorphology radius="3" operator="dilate" in="SourceAlpha" result="effect1_dropShadow_1195_95" /> {/* radius */}
               <feGaussianBlur stdDeviation="20" /> {/* blur */}
               <feComposite in2="hardAlpha" operator="out" />
               <feColorMatrix type="matrix" values="0 0 0 0 0.482353 0 0 0 0 0.827451 0 0 0 0 0.819608 0 0 0 1 0" />
               <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1195_95" />
               <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1195_95" result="shape" />
            </filter>



            <filter id="filter0_d_1195_95" x="0" y="0" width="826" height="898" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
               <feFlood floodOpacity="0" result="BackgroundImageFix" />
               <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
               <feMorphology radius="15" operator="dilate" in="SourceAlpha" result="effect1_dropShadow_1195_95" />
               <feGaussianBlur stdDeviation="30" />
               <feComposite in2="hardAlpha" operator="out" />
               <feColorMatrix type="matrix" values="0 0 0 0 0.227451 0 0 0 0 0.443137 0 0 0 0 0.137255 0 0 0 1 0" />
               <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1195_95" />
               <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1195_95" result="shape" />
            </filter>
         </defs>
      </svg>
   )
}


const useMouse = () => {
   const mouse = useRef({ x: 0, y: 0 });

   useEffect(() => {
      const handleMouseMove = (e) => {
         mouse.current.x = e.clientX;
         mouse.current.y = e.clientY;
      }
      window.addEventListener('mousemove', handleMouseMove);
   }, [])


   return mouse.current;
}



export default TrailSvg
