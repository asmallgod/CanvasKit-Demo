import React, { useEffect, useState } from 'react';
import InitCanvasKit, { Canvas, CanvasKit } from 'canvaskit-wasm';
import './Application.scss';

const ckLoaded = InitCanvasKit();

const initWebGpu = async (CK:CanvasKit)=>{
  const navigatorGpu = (navigator as any).gpu;
  if(navigatorGpu && CK.gpu){
    const adapter = await navigatorGpu.requestAdapter();
    const device = await adapter.requestDevice();
    const gpu = CK.MakeGPUDeviceContext(device);
    if(!gpu){
      console.error('Failed to initialize WebGPU device context');
    }
    return gpu;
  }
  return null;
}

const ready = async function() {
  const CK = await ckLoaded;
  const gpu = await initWebGpu(CK);
  return [CK, gpu];
}();

const Application: React.FC = () => {
  useEffect(() => {
    InitCanvasKit().then((CanvasKit) => {
      const surface = CanvasKit.MakeWebGLCanvasSurface('foo');

      const paint = new CanvasKit.Paint();
      paint.setColor(CanvasKit.Color4f(0.6, 0.6, 0.2, 1.0));
      paint.setStyle(CanvasKit.PaintStyle.Stroke);
      paint.setAntiAlias(true);
      const rr = CanvasKit.RRectXY(
        CanvasKit.LTRBRect(10, 60, 210, 260),
        25,
        15,
      );

      function draw(canvas:Canvas) {
        canvas.clear(CanvasKit.WHITE);
        canvas.drawRRect(rr, paint);
      }
      surface.drawOnce(draw);
    });
  }, []);

  return (
    <div>
      <h2> Drop in replacement for HTML Canvas (e.g. node.js)</h2>
      <img id="api1" width={300} height={300}></img>
      <canvas id='foo' width={300} height={300}></canvas>
    </div>
  );
};

export default Application;
