import { PropsWithChildren, Suspense, useEffect, useMemo, useState } from 'react';
import { DisplayProps } from './Display.interface';
import { Main } from 'grommet';
import { useFont } from '../../hooks/useFont';
import { useFontStore } from '../../stores/fontStore';


export function Display({ }:PropsWithChildren<DisplayProps>) {

  const { setFont, setJson } = useFontStore();
  // const [f, error] = useFont('PTMono.woff2');
  // const [f, j, error] = useFont('PTMono.woff2', true);
  // const [f, j, error] = useFont('RobotoMono-Medium.woff2', true);
  const [f, j, error] = useFont('rift_medium_italic.woff', true);

  useEffect(() => {
    if(j && !error) setJson(j);
    console.log('error: ', error);
  }, [j, error]);

  return (
    <Suspense>
      {error ? <>Error</> : (
        <Main className='display__container'>
        </Main>
      )}
    </Suspense>
  );
}