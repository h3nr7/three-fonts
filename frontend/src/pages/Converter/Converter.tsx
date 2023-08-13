import { PropsWithChildren, useEffect, useState } from 'react';
import { ConverterProps } from './Converter.interface';
import './Converter.scss';
import { FontConverter } from '../../components/FontConverter';
import { Main, Page, PageContent } from 'grommet';
import { FontGrid } from '../../components/FontGrid';
import { Font } from 'opentype.js';


export function Converter({}:PropsWithChildren<ConverterProps>) {

  const [font, setFont] = useState<Font>();

  return(
    <Main pad='xlarge'>
      <Page 
        kind='narrow'>
        <PageContent gap='large'>
          <FontConverter onSuccess={f => setFont(f)} onReset={() => setFont(undefined)}/>
          <FontGrid font={font}/>
        </PageContent>
      </Page>
    </Main>
  )
}