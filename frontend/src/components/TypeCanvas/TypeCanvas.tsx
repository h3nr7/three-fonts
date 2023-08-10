import { PropsWithChildren, useRef, useState, useEffect, useMemo } from 'react';
import { TypeCanvasProps } from './TypeCanvas.interface';
import { Box } from 'grommet';


export function TypeCanvas({
  width, height, glyph
}: PropsWithChildren<TypeCanvasProps>) {

  const ref = useRef<HTMLCanvasElement>(null);
  
  const [widthHeight, setWidthHeight] = useState({ width, height });
  const [dummy, setDummy] = useState<React.CSSProperties>();
  useEffect(() => setWidthHeight({ width, height }), [width, height]);

  useEffect(() => {
    if(!glyph) return;
    const { width: w, height: h } = widthHeight;
    console.log('minmax: ', glyph.getPath().toSVG(1));
    const { x1, x2, y1, y2 } = glyph.getPath().getBoundingBox();
    const wW = Math.abs(x2 - x1);
    const hH = Math.abs(y2 - y1);
    const fill = 'white';

    const svgStr = `<svg xmlns="http://www.w3.org/2000/svg" fill="${fill}" width="${wW}" height="${hH}" viewBox="${x1} ${y1} ${wW} ${hH}">${glyph.getPath().toSVG(1)}</svg>`

    console.log(svgStr);

    setDummy({
      flexShrink: 0,
      display: 'flex',
      width: wW + 'px',
      height: hH + 'px',
      background: `url("data:image/svg+xml;base64,${btoa(svgStr)}") no-repeat`
    });

    const path = glyph.getPath();
    console.log(glyph.getMetrics());
    

    const xPos = (w - Math.abs(x2 - x1))/2;
    const yPos = (h - Math.abs(y2 - y1))/2;
    console.log(x1, x2, y1, y2);

  }, [glyph]);

  console.log('dd: ', dummy);

  return (
    <div style={dummy}/>
  )
}
