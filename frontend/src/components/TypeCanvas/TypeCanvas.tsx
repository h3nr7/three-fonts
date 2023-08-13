import { PropsWithChildren, useRef, useState, useEffect, useMemo } from 'react';
import { TypeCanvasProps } from './TypeCanvas.interface';
import { Box } from 'grommet';
import './TypeCanvas.scss';

export function TypeCanvas({
  glyph, fontObj,
  pad, color='white'
}: PropsWithChildren<TypeCanvasProps>) {

  const ref = useRef<HTMLCanvasElement>(null);

  const [padding, setPadding] = useState(pad);
  const [divStyle, setDivStyle] = useState<React.CSSProperties>();

  useEffect(() => {
    if(!glyph) return;
    
    const { ascender, descender, unitsPerEm } = fontObj;
    const glyphPath = glyph.getPath(0, -ascender);

    const glyphSvg = glyphPath.toSVG(1);
    const { x1, x2, y1, y2 } = glyphPath.getBoundingBox();
    const wW = Math.abs(x2 - x1);
    console.log(ascender, descender, unitsPerEm, y2, y1)
    const hH = Math.abs(y2 - y1);
    const fill = color;

    const offsetX = 0;
    const offsetY = (ascender && descender) ? (ascender + descender) * 72/unitsPerEm : 0;
    const oh = (ascender - descender)* 72/unitsPerEm;
    console.log('offsetY: ', offsetY);
    const transform = `translate(${offsetX}, ${0})`;


    const svgStr = `<svg xmlns="http://www.w3.org/2000/svg" fill="${fill}" width="${wW}" height="${hH}" viewBox="${x1} ${y1} ${wW} ${hH}"><g transform="${transform}">${glyphSvg}</g></svg>`

    // console.log(svgStr);

    setDivStyle({
      flexShrink: 0,
      width: wW + 'px',
      height: hH + 'px',
      margin: padding + 'px',
      background: `url("data:image/svg+xml;base64,${btoa(svgStr)}") no-repeat`
    });

  }, [glyph]);

  return (
    <div className='typecanvas__container'>
      <div style={divStyle}/>
      <div className='typecanvas__info' >
        {glyph?.unicode} ({glyph?.name})
      </div>
    </div>
  )
}
