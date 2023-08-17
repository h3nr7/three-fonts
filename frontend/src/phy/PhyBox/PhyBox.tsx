import { PropsWithChildren, useEffect, useMemo } from "react";
import { PhyElement } from "../Phy.interface";
import { phy } from "../build/Phy.module";
import { MeshPhongMaterial } from "three";
import { usePhyStore } from "../Phy";

interface PhyBoxProps extends PhyElement {

}

export function PhyBox({ name, material }: PropsWithChildren<PhyBoxProps>) {

  const { isReady } = usePhyStore()

  console.log('why: ', name)

  useEffect(() => {
    console.log('box: ', phy.get(name, 'box'));
    if(isReady) {
      const ma = new MeshPhongMaterial();
      console.log('mama');
      phy.add({ name, type:'box', size:[0.5,0.5,0.5], pos:[0.5, 6, 0], density:1, material: ma, radius:0.5 });
      console.log(name, phy.get(name, 'box'));
    }

  }, [isReady]);

  useEffect(() => {
    return () => {
      if(phy.get(name)) {
        phy.remove(name);
      }
    }
  }, [])

  console.log(name, phy.get(name, 'box'));
  
  return null;

}