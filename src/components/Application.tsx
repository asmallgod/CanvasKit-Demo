import React, { useEffect } from 'react';
import InitCanvasKit from 'canvaskit-wasm';
import './Application.scss';
import {
  DrawGlyphsAPI1,
  GradientAPI1,
  InkExample,
  PathExample,
  RectExample,
  TextOnPathAPI1,
  VertexAPI1,
} from '@src/examples';

const Application: React.FC = () => {
  useEffect(() => {
    InitCanvasKit().then((CanvasKit) => {
      RectExample(CanvasKit);
      PathExample(CanvasKit);
      InkExample(CanvasKit, null);
      VertexAPI1(CanvasKit, null);
      GradientAPI1(CanvasKit, null);
      TextOnPathAPI1(CanvasKit, null);
      DrawGlyphsAPI1(CanvasKit, null);
    });
  }, []);

  return (
    <div>
      <h2> Drop in replacement for HTML Canvas (e.g. node.js)</h2>
      <canvas id='foo' width={300} height={300}></canvas>
      <canvas id='paths' width={300} height={300}></canvas>
      <canvas id='ink' width={300} height={300}></canvas>
      <canvas id='vertex1' width={300} height={300}></canvas>
      <canvas id='gradient1' width={300} height={300}></canvas>
      <canvas id='textonpath' width={300} height={300}></canvas>
      <canvas id='drawGlyphs' width={300} height={300}></canvas>
    </div>
  );
};

export default Application;
