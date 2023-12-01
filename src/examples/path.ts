import { Canvas, CanvasKit } from 'canvaskit-wasm';

export function PathExample(CanvasKit: CanvasKit) {
  const surface = CanvasKit.MakeWebGLCanvasSurface('paths');
  if (!surface) {
    console.error('Could not make surface');
    return;
  }

  function drawFrame(canvas: Canvas) {
    const paint = new CanvasKit.Paint();
    paint.setStrokeWidth(1.0);
    paint.setAntiAlias(true);
    paint.setColor(CanvasKit.Color(0, 0, 0, 1.0));
    paint.setStyle(CanvasKit.PaintStyle.Stroke);

    const path = new CanvasKit.Path();
    path.moveTo(20, 5);
    path.lineTo(30, 20);
    path.lineTo(40, 10);
    path.lineTo(50, 20);
    path.lineTo(60, 0);
    path.lineTo(20, 5);

    path.moveTo(20, 80);
    path.cubicTo(90, 10, 160, 150, 190, 10);

    path.moveTo(36, 148);
    path.quadTo(66, 188, 120, 136);
    path.lineTo(36, 148);

    path.moveTo(150, 180);
    path.arcToTangent(150, 100, 50, 200, 20);
    path.lineTo(160, 160);

    path.moveTo(20, 120);
    path.lineTo(20, 120);

    canvas.drawPath(path, paint);

    const rrect = CanvasKit.RRectXY([100, 10, 140, 62], 10, 4);

    const rrectPath = new CanvasKit.Path().addRRect(rrect, true);

    canvas.drawPath(rrectPath, paint);

    rrectPath.delete();
    path.delete();
    paint.delete();
  }
  // Intentionally just draw frame once
  surface.drawOnce(drawFrame);
}
