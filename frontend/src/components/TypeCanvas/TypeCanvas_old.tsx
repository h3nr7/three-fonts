import { PropsWithChildren, useRef, useState, useEffect, useMemo } from 'react';
import { TypeCanvasProps } from './TypeCanvas.interface';
import { Box } from 'grommet';


export function TypeCanvas({
  width, height, glyph
}: PropsWithChildren<TypeCanvasProps>) {

  const ref = useRef<HTMLCanvasElement>(null);
  
  const [widthHeight, setWidthHeight] = useState({ width, height });
  const [ctx, setCtx] = useState<CanvasRenderingContext2D>();
  const [dummy, setDummy] = useState<React.CSSProperties>();
  useEffect(() => setWidthHeight({ width, height }), [width, height]);
  useEffect(() => {
    const c = ref.current?.getContext('2d');
    if(c) setCtx(c);
  }, [ref.current]);

  useEffect(() => {
    if(!ctx || !glyph) return;
    const { width: w, height: h } = widthHeight;
    ctx.clearRect(0, 0, w, h);
    const { xMin, xMax, yMin, yMax } = glyph;
    console.log('minmax: ', glyph.getPath().toSVG(1));
    const { x1, x2, y1, y2 } = glyph.getPath().getBoundingBox();
    const wW = Math.abs(x2 - x1);
    const hH = Math.abs(y2 - y1);
    const fill = 'white';

    const svgStr = `<svg xmlns="http://www.w3.org/2000/svg" fill="${fill}" width="${wW}" height="${hH}" viewBox="${x1} ${y1} ${wW} ${hH}">${glyph.getPath().toSVG(1)}</svg>`

    console.log(svgStr);

    setDummy({
      width: wW,
      height: hH,
      background: `url("data:image/svg+xml;base64,${btoa(svgStr)}") no-repeat`
    });

    // glyph.draw(ctx, 40, 80);
    // glyph.drawPoints(ctx, 40, 80);
    // glyph.drawMetrics(ctx, 40, 80)

    const path = glyph.getPath();
    console.log(glyph.getMetrics());
    // path.fill = 'white';
    // ctx.translate(40, 80);
    // path.draw(ctx);
    

    const xPos = (w - Math.abs(x2 - x1))/2;
    const yPos = (h - Math.abs(y2 - y1))/2;
    console.log(x1, x2, y1, y2);
    // glyph.draw(ctx, 30, 80, 72, {
      
    // });
            // v.glyph.drawPoints(ctx, 50, 50, 72);
        // v.glyph.drawMetrics(ctx, 50, 50,  72);
  }, [ctx, glyph]);

  console.log('dd: ', dummy);

  return (
    <Box direction='row'>
    <canvas 
      style={{
        width: `${widthHeight.width}px`,
        height: `${widthHeight.height}px`
      }}
      ref={ref} 
      width={widthHeight.width} 
      height={widthHeight.height} />
    <div style={dummy}/>
    </Box>
  )
}
