import { Canvas, CanvasKit } from 'canvaskit-wasm';

export function RectExample(CanvasKit: CanvasKit) {
  const surface = CanvasKit.MakeWebGLCanvasSurface('foo');

  const paint = new CanvasKit.Paint();
  paint.setColor(CanvasKit.Color4f(0.6, 0.6, 0.2, 1.0));
  paint.setStyle(CanvasKit.PaintStyle.Stroke);
  paint.setAntiAlias(true);
  const rr = CanvasKit.RRectXY(CanvasKit.LTRBRect(10, 60, 210, 260), 25, 15);

  function draw(canvas: Canvas) {
    canvas.clear(CanvasKit.WHITE);
    canvas.drawRRect(rr, paint);
  }
  surface.drawOnce(draw);
}
