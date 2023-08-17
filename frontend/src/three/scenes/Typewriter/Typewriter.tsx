import { PropsWithChildren, useEffect, useState } from "react";
import { TypewriterProps } from "./Typewriter.interface";
import { useKeyboard } from "../../../hooks/useKeyboard";
import { useStore } from "../../../stores/store";
import { Texter } from "../../Elements/Texter/Texter";


export function Typewriter({  }:PropsWithChildren<TypewriterProps>) {
  
  const { words } = useStore();

  useEffect(() => {
    console.log('current words: ', words);
  }, [words])

  return (
    <group>
      <Texter text={'hello?'} />
      {words?.map(w => (
        <Texter text={w} />
      ))}
    </group>
  )
}