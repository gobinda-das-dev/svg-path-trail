import { extend, useFrame } from '@react-three/fiber'
import React, { useRef } from 'react'
import { Vector2 } from 'three'
import { lerp } from 'three/src/math/MathUtils'
import { MeshLineGeometry, MeshLineMaterial, raycast } from 'meshline'

extend({ MeshLineGeometry, MeshLineMaterial })

const TrailExperiment = ({ TRAIL_POINTS = 10 }) => {
   const line = useRef(null)
   const position = useRef(
      Array.from({ length: TRAIL_POINTS }, () => [0, 0, 0])
   );
   const smoothMouse = useRef(new Vector2(0, 0));


   useFrame(({ mouse, viewport }) => {
      const posAttr = line.current.geometry.attributes.position;

      const ms = new Vector2(
         mouse.x * viewport.width / 2,
         mouse.y * viewport.height / 2
      );

      smoothMouse.current.x = lerp(smoothMouse.current.x, ms.x, 0.1);
      smoothMouse.current.y = lerp(smoothMouse.current.y, ms.y, 0.1);

      for (let i = TRAIL_POINTS - 1; i > 0; i--) {
         position.current[i][0] = position.current[i - 1][0];
         position.current[i][1] = position.current[i - 1][1];
         position.current[i][2] = 0;
      }

      // position.current[0][0] = smoothMouse.current.x;
      // position.current[0][1] = smoothMouse.current.y;
      position.current[0][0] = ms.x;
      position.current[0][1] = ms.y;

      for (let i = 0; i < TRAIL_POINTS; i++) {

         posAttr.setXYZ(
            i,
            position.current[i][0],
            position.current[i][1],
            position.current[i][2]
         )
      }

      posAttr.needsUpdate = true;
   })

   return (
      <mesh ref={line}>
         <planeGeometry args={[1, 1, TRAIL_POINTS, 1]}/>
         {/* <bufferGeometry>
            <bufferAttribute
               attach='attributes-position'
               count={TRAIL_POINTS}
               array={new Float32Array(TRAIL_POINTS * 3)}
               itemSize={3}
            />
         </bufferGeometry> */}
         {/* <lineBasicMaterial color="white" side={2}/> */}
         {/* <meshBasicMaterial color="white" side={2}/> */}
         <meshBasicMaterial wireframe />
      </mesh>
   )
}

export default TrailExperiment
