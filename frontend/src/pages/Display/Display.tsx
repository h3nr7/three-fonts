import { PropsWithChildren, Suspense, useState } from 'react';
import { DisplayProps } from './Display.interface';
import { Main } from 'grommet';
import { useFont } from '../../hooks/useFont';


export function Display({ }:PropsWithChildren<DisplayProps>) {

  const {font, error} = useFont('PTMono.woff2');

  console.log('me', font);
  return (
    <Suspense>
      {error ? <>Error</> : (
        <Main className='display__container'>
          hello world
        </Main>
      )}
    </Suspense>
  );
}