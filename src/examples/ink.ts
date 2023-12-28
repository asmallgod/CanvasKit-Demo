import { Canvas, CanvasKit, WebGPUDeviceContext } from 'canvaskit-wasm';
import { MakeCanvasSurface, preventScrolling } from './utils';

export function InkExample(CanvasKit: CanvasKit, gpu: WebGPUDeviceContext) {
  const surface = MakeCanvasSurface(CanvasKit, gpu, 'ink');
  if (!surface) {
    console.error('Could not make surface');
    return;
  }

  let paint = new CanvasKit.Paint();
  paint.setAntiAlias(true);
  paint.setColor(CanvasKit.Color(0, 0, 0, 1.0));
  paint.setStyle(CanvasKit.PaintStyle.Stroke);
  paint.setStrokeWidth(4.0);
  paint.setPathEffect(CanvasKit.PathEffect.MakeCorner(50));

  // Draw I N K
  let path = new CanvasKit.Path();
  path.moveTo(80, 30);
  path.lineTo(80, 80);

  path.moveTo(100, 80);
  path.lineTo(100, 15);
  path.lineTo(130, 95);
  path.lineTo(130, 30);

  path.moveTo(150, 30);
  path.lineTo(150, 80);
  path.moveTo(170, 30);
  path.lineTo(150, 55);
  path.lineTo(170, 80);

  const paths = [path];
  const paints = [paint];

  function drawFrame(canvas: Canvas) {
    canvas.clear(CanvasKit.Color(255, 255, 255, 1.0));

    for (let i = 0; i < paints.length && i < paths.length; i++) {
      canvas.drawPath(paths[i], paints[i]);
    }

    surface.requestAnimationFrame(drawFrame);
  }

  let hold = false;
  const interact = (e: PointerEvent) => {
    const type = e.type;
    if (type === 'lostpointercapture' || type === 'pointerup' || !e.pressure) {
      hold = false;
      return;
    }
    if (hold) {
      path.lineTo(e.offsetX, e.offsetY);
    } else {
      paint = paint.copy();
      paint.setColor(
        CanvasKit.Color(
          Math.random() * 255,
          Math.random() * 255,
          Math.random() * 255,
          Math.random() + 0.2,
        ),
      );
      paints.push(paint);
      path = new CanvasKit.Path();
      paths.push(path);
      path.moveTo(e.offsetX, e.offsetY);
    }
    hold = true;
  };
  document.getElementById('ink').addEventListener('pointermove', interact);
  document.getElementById('ink').addEventListener('pointerdown', interact);
  document
    .getElementById('ink')
    .addEventListener('lostpointercapture', interact);
  document.getElementById('ink').addEventListener('pointerup', interact);
  preventScrolling(document.getElementById('ink'));
  surface.requestAnimationFrame(drawFrame);
}
