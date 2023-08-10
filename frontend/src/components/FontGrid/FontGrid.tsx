import { 
  PropsWithChildren, useMemo, useRef,
  useState, useEffect } from 'react';
import { FontGridProps } from './FontGrid.interface';
import { Box, Card } from 'grommet';
import { Glyph, GlyphSet, Path } from 'opentype.js';
import { TypeCanvas } from '../TypeCanvas';

export function FontGrid({ font }: PropsWithChildren<FontGridProps>) {

  const [glyphset, setGlyphset] = useState<GlyphSet>();


  useEffect(() => {
    
    setGlyphset(font?.glyphs);
  }, [font]);

  

  return font ? (
    <Card pad={{horizontal: 'large', bottom: 'medium'}} gap='medium' background="dark-1">
    <GlyphsetGrid glyphset={glyphset}/>
    </Card>
  ) : null;
}

interface GlyphsetGrid {
  glyphset?:GlyphSet
}
function GlyphsetGrid({ glyphset }:GlyphsetGrid) {
  if(!glyphset || glyphset.length <=0) {
    return <>No Fonts</>;
  }

  const output = useMemo(() => generateGlyphMap(glyphset), [glyphset])
  console.log('me', Object.values(output));

  return (
    <Box direction='row' wrap>
      {Array.from(output.values()).map(({glyph}) => (
        <TypeCanvas width={120} height={120} glyph={glyph}/>
      ))}
    </Box>
  );

}

const generateGlyphMap = (glyphset: GlyphSet) => {
  const len = glyphset.length;
  const m = new Map<number, { glyph:Glyph }>();
  for(let i=0; i<len; i++) {
    m.set(i, {
      glyph: glyphset.get(i)
    })
  }

  return m;
}