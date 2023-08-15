import { 
  PropsWithChildren, useMemo, useRef,
  useState, useEffect } from 'react';
import { FontGridProps, FontObject, GlyphsetGrid } from './FontGrid.interface';
import { Box, Card, CardBody, CardHeader, Heading, Text } from 'grommet';
import { Glyph, GlyphSet, Path } from 'opentype.js';
import { TypeCanvas } from '../TypeCanvas';


const DEFAULT_FONT_OBJ = { ascender: 0, descender: 0, unitsPerEm: 1 };
/**
 * FontGrid component
 * @param param0 
 * @returns 
 */
export function FontGrid({ font }: PropsWithChildren<FontGridProps>) {

  const [glyphset, setGlyphset] = useState<GlyphSet>();

  const [fontObj, setFontObj] = useState<FontObject>({...DEFAULT_FONT_OBJ})

  useEffect(() => {
    setGlyphset(font?.glyphs);

    const { ascender, descender, unitsPerEm } = font || {...DEFAULT_FONT_OBJ};
    setFontObj({ ascender, descender, unitsPerEm })

  }, [font]);

  console.log(font?.names);
  console.log(font);

  return font ? (
    <Card pad={{horizontal: 'large', bottom: 'medium'}} gap='small' background="dark-1">
      <CardHeader pad={{ top: 'medium', horizontal: 'small', bottom: 'small'}}>
        <Text size='large'>{font?.names.fullName['en']}</Text>
      </CardHeader>
      <CardBody>
        <GlyphsetGrid fontObj={fontObj} glyphset={glyphset}/>
      </CardBody>
    </Card>
  ) : null;

}


/**
 * GlyphsetGrid component
 * @param param0 
 * @returns 
 */
function GlyphsetGrid({ glyphset, fontObj }:GlyphsetGrid) {
  if(!glyphset || glyphset.length <=0) {
    return <>No Fonts</>;
  }


  // memoized function that could be expensive
  const output = useMemo(() => generateGlyphMap(glyphset), [glyphset])

  return (
    <Box direction='row' wrap justify='center' pad={{ vertical: 'large', horizontal:'small' }}>
      {Array.from(output.values()).map(({glyph}, i) => (
        <TypeCanvas 
          key={`glyphsetgrid_${i}`} 
          pad={2}
          fontSize={72}
          glyph={glyph}
          fontObj={fontObj} />
      ))}
    </Box>
  );

}


/**
 * Memoized function 
 * @param glyphset 
 * @returns 
 */
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