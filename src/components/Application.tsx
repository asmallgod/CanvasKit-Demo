import React, { useEffect, useState } from 'react';
import InitCanvasKit, { Canvas } from 'canvaskit-wasm';
import './Application.scss';

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
      <canvas id='foo' width={300} height={300}></canvas>
    </div>
  );
};

export default Application;
