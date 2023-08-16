import { useEffect, useMemo } from "react";
import { useModel } from "../../hooks/useModel"


export function Forest() {

  const [model, error] = useModel('/glb/tree.glb');

  const loadedModel = useMemo(() => model, [model]);

  if(loadedModel) {
    loadedModel.scene
  }

  return !error && loadedModel && (
    <group scale={100} position={[-3, 0.1, -2]}>
      <primitive object={loadedModel.scene}/> 
    </group>
  );
}