import { PropsWithChildren, Suspense, useEffect, useMemo, useState } from 'react';
import { DisplayProps } from './Display.interface';
import { Main } from 'grommet';
import { useFont } from '../../hooks/useFont';
import { useStore } from '../../stores/store';
import { useKeyboard } from '../../hooks/useKeyboard';


export function Display({ }:PropsWithChildren<DisplayProps>) {

  const { setJson, clearWords, addWord, words } = useStore();
  const [f, j, error] = useFont('rift_medium_italic.woff', true);

  const [, up] = useKeyboard();

  let [tmp, setTmp] = useState<string>('');

  // clear words at the beginning
  useEffect(() => clearWords(), []);

  // start populating states 
  useEffect(() => {
    if(up && up.length === 1 && up !== ' ') {
      setTmp(tmp+up);
    } else {
      if(tmp.length > 0) addWord(tmp);
      setTmp('');
    }
  }, [up]);

  // set json type when ready without error
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