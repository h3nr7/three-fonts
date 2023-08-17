import { PropsWithChildren, ReactElement, cloneElement, createContext, isValidElement, useContext, useEffect, useRef, useState } from 'react';
import { phy } from './build/Phy.module';
import { useThree, useFrame, RootState } from '@react-three/fiber';
import { MeshPhongMaterial, Scene } from 'three';

const ENGING_TYPE = 'OIMO'

interface PhyStates {
  isReady: boolean
}

const PhyContext = createContext<PhyStates>({
  isReady: false
});

export const usePhyStore = () => useContext(PhyContext);

export function Phy({ children }: PropsWithChildren) {

  const sceneRef = useRef<Scene>(null);
  const [isReady, setIsReady] = useState<boolean>(false);


  useFrame(animate);

  useEffect(() => {
    if(sceneRef) {
      phy.init({ 
        type: ENGING_TYPE, 
        worker:false,
        scene: sceneRef.current,
        callback: start , 
        path:'build/' 
      });

    }
  }, [sceneRef]);

  function start() {

    console.log(`Phy with ${ENGING_TYPE} engine started started`);
    setIsReady(true);
    phy.set({ substep:2, gravity:[0, -9.81,0], fps:60 });
    
    // add static ground
    phy.add({ type:'plane', size:[300,1,300], visible:false });

    const material = new MeshPhongMaterial();


    phy.add({ type:'box', size:[0.5,0.5,0.5], pos:[0.5, 6, 0], density:1, material:material, radius:0.5 });

    phy.add({ type:'box', size:[0.7,0.7,0.7], pos:[0, 4, 0], density:1, material:material, radius:0.7 });

  }

  function animate({ clock }: RootState) {
    phy.doStep( clock.oldTime );
  }

  return (
    <PhyContext.Provider value={{ isReady }}>
      <scene ref={sceneRef}>
        {children}
      </scene>
    </PhyContext.Provider>
  );
}
