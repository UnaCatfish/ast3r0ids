// var mx, my;
// document.addEventListener('mousemove', onMouseUpdate, false);
// document.addEventListener('mouseenter', onMouseUpdate, false);

// function onMouseUpdate(e) {
//   mx = e.pageX;
//   my = e.pageY;
//   // console.log(mx, my);
// }

// function getMouseX() {
//   return mx;
// }

// function getMouseY() {
//   return my;
// }

function shipToAsteroid(ship, asteroid) {
  const abox = asteroid.getBox();
  const sbox = ship.getBox();
  // const sbox = data.ship[0].box[0];
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
  // return true
  return polyToPoly(asteroid.getPoly(), ship.getPoly(),
    asteroid.getLocation(), ship.getLocation());
}

function polyToPoly(polyA, polyB, originA, originB) {

  for (let i = 0; i < polyA.length - 1; i++) {
    for (let j = 0; j < polyB.length - 1; j++) {

      const lineA = [polyA[j][0] + originA[0], polyA[j][1] + originA[1],
      polyA[j + 1][0] + originA[0], polyA[j + 1][1] + originA[1]];

      const lineB = [polyB[j][0] + originB[0], polyB[j][1] + originB[1],
      polyB[j + 1][0] + originB[0], polyB[j + 1][1] + originB[1]];

      if (lineIntersect(lineA, lineB)) {
        return true;
      }
    }
  }

  return true; //
}


function lineIntersect(lineA, lineB) {

  // Returns 1 if the lines intersect, otherwise 0. In addition, if the lines 
  // intersect the intersection point may be stored in the floats i_x and i_y.
  // char get_line_intersection(

  // char get_line_intersection(float p0_x, float p0_y, float p1_x, float p1_y,
  // float p2_x, float p2_y, float p3_x, float p3_y, float * i_x, float * i_y)

  const p0_x = lineA[0];
  const p0_y = lineA[1];
  const p1_x = lineA[2];
  const p1_y = lineA[3];
  const p2_x = lineB[0];
  const p2_y = lineB[1];
  const p3_x = lineB[2];
  const p3_y = lineB[3];
  let i_x;
  let i_y;

  const s1_x = p1_x - p0_x;
  const s1_y = p1_y - p0_y;
  const s2_x = p3_x - p2_x;
  const s2_y = p3_y - p2_y;

  const s = (-s1_y * (p0_x - p2_x) + s1_x * (p0_y - p2_y)) / (-s2_x * s1_y + s1_x * s2_y);
  const t = (s2_x * (p0_y - p2_y) - s2_y * (p0_x - p2_x)) / (-s2_x * s1_y + s1_x * s2_y);

  if (s >= 0 && s <= 1 && t >= 0 && t <= 1) {
    // Collision detected
    // if (i_x != null)
    i_x = p0_x + (t * s1_x);
    // if (i_y != null)
    i_y = p0_y + (t * s1_y);

    console.log(i_x, i_y);

    return true;
  }

  return false


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
