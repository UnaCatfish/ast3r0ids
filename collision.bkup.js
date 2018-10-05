
function pnpoly(pn, polygon, origin) {
  var isInside = false;

  const ox = origin[0];
  const oy = origin[1];
  const px = pn.getX();
  const py = pn.getY();

  // Create a boundary box for polygon
  var minX = 0, maxX = 0, minY = 0, maxY = 0;

  for (var n = 0; n < polygon.length; n++) {
    var q = polygon[n];
    minX = Math.min(q[0], minX);
    maxX = Math.max(q[0], maxX);
    minY = Math.min(q[1], minY);
    maxY = Math.max(q[1], maxY);
  }

  // quick check if pn outside of boundary box
  if (
    px - ox < minX || px - ox > maxX ||
    py - oy < minY || py - oy > maxY) {
    return false;
  }

  // Check if point is inside the polygon
  var i = 0, j = polygon.length - 1;
  for (i, j; i < polygon.length; j = i++) {

    const ix = polygon[i][0] + ox;
    const iy = polygon[i][1] + oy;
    const jx = polygon[j][0] + ox;
    const jy = polygon[j][1] + oy;

    // the magic algorythm 
    if ((iy > py) != (jy > py) &&
      px < (jx - ix) * (py - iy) / (jy - iy) + ix) {
      isInside = !isInside;
    }
  }
  return isInside;
}
