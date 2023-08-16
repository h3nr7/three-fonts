import { useEffect, useState } from "react";
import { LoadingManager } from "three";
import { GLTF, GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';
import { ModelLoadError } from "../libs/Errors";

export function useModel(url: string):[GLTF | undefined, ModelLoadError | undefined] {

  const [model, setModel] = useState<GLTF>();
  const [error, setError] = useState<ModelLoadError>();
  
  // setup gltf loader
  const glbLoader = new GLTFLoader();
  // setup draco decoder path
  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath( '/jsm/libs/draco/' );
	dracoLoader.setDecoderConfig( { type: 'js' } );
  glbLoader.setDRACOLoader(dracoLoader);

  useEffect(() => {
    glbLoader.load(url,
      glb => setModel(glb),
      ev => console.log(ev.loaded/ev.total),
      () => setError(new ModelLoadError('load model error for: ' + url))
    );
  }, [url]);

  return [model, error]
}