
function shipToAsteroid(ship, asteroid) {
  const abox = asteroid.getBox();
  const sbox = ship.getBox();
  const ax = asteroid.getX();
  const ay = asteroid.getY();
  const sx = ship.getX();
  const sy = ship.getY();

  if (
    ax + abox.maxX < sx + sbox.minX ||
    ax + abox.minX > sx - sbox.minX ||
    ay + abox.maxY < sy + sbox.minX ||
    ay + abox.minY > sy - sbox.minX
  ) {
    return false;
  }
  shipHit++;
  return polyToPoly(asteroid.getPoly(), ship.getPoly(),
    asteroid.getLocation(), ship.getLocation());
}

function polyToPoly(polyA, polyB, originA, originB) {

  for (let i = 0; i < polyA.length - 1; i++) {
    for (let j = 0; j < polyB.length - 1; j++) {

      const p0 = { x: polyA[i][0] + originA[0], y: polyA[i][1] + originA[1] };
      const p1 = { x: polyA[i + 1][0] + originA[0], y: polyA[i + 1][1] + originA[1] };
      const p2 = { x: polyB[j][0] + originB[0], y: polyB[j][1] + originB[1] };
      const p3 = { x: polyB[j + 1][0] + originB[0], y: polyB[j + 1][1] + originB[1] };

      const intersect = segmentIntersect(p0, p1, p2, p3);

      if (intersect) {
        return intersect;
      }
    }
  }
  return false;
}


function segmentIntersect(p0, p1, p2, p3) {

  var A1 = p1.y - p0.y,
    B1 = p0.x - p1.x,
    C1 = A1 * p0.x + B1 * p0.y,
    A2 = p3.y - p2.y,
    B2 = p2.x - p3.x,
    C2 = A2 * p2.x + B2 * p2.y,
    denominator = A1 * B2 - A2 * B1;

  if (denominator == 0) {
    return null;
  }

  var intersectX = (B2 * C1 - B1 * C2) / denominator,
    intersectY = (A1 * C2 - A2 * C1) / denominator,
    rx0 = (intersectX - p0.x) / (p1.x - p0.x),
    ry0 = (intersectY - p0.y) / (p1.y - p0.y),
    rx1 = (intersectX - p2.x) / (p3.x - p2.x),
    ry1 = (intersectY - p2.y) / (p3.y - p2.y);

  if (((rx0 >= 0 && rx0 <= 1) || (ry0 >= 0 && ry0 <= 1)) &&
    ((rx1 >= 0 && rx1 <= 1) || (ry1 >= 0 && ry1 <= 1))) {
    return {
      x: intersectX,
      y: intersectY
    };

  }
  else {
    return null;
  }
}

function lasertoAsteroid(laser, asteroid) {
  const box = asteroid.getBox();
  const pn = { x: laser.getX(), y: laser.getY() };
  const po = { x: asteroid.getX(), y: asteroid.getY() };

  if (
    pn.x - po.x < box.minX || pn.x - po.x > box.maxX ||
    pn.y - po.y < box.minY || pn.y - po.y > box.maxY) {
    // console.log('fail');
    return false;
  }
  const polygon = asteroid.getCollision();
  return pnPoly(pn, polygon, po);
}

// Point inside polygon
// pn point location
// polygon array of lines
// po polygon origin
function pnPoly(pn, polygon, po) {
  let isInside = false;
  // Check if point is inside the polygon
  var i = 0, j = polygon.length - 1;
  for (i, j; i < polygon.length; j = i++) {

    const ix = polygon[i][0] + po.x;
    const iy = polygon[i][1] + po.y;
    const jx = polygon[j][0] + po.x;
    const jy = polygon[j][1] + po.y;

    // the magic algorythm 
    if ((iy > pn.y) != (jy > pn.y) &&
      pn.x < (jx - ix) * (pn.y - iy) / (jy - iy) + ix) {
      isInside = !isInside;
    }
  }
  return isInside;
}
