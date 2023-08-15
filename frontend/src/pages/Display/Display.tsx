import { PropsWithChildren, Suspense, useEffect, useMemo, useState } from 'react';
import { DisplayProps } from './Display.interface';
import { Main } from 'grommet';
import { useFont } from '../../hooks/useFont';
import { useFontStore } from '../../stores/fontStore';


export function Display({ }:PropsWithChildren<DisplayProps>) {

  const { setFont } = useFontStore();
  const [f, error] = useFont('PTMono.woff2');

  useEffect(() => {
    if(f && !error) setFont(f);
  }, [f, error]);

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