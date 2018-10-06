var mx, my;
document.addEventListener('mousemove', onMouseUpdate, false);
document.addEventListener('mouseenter', onMouseUpdate, false);

function onMouseUpdate(e) {
  mx = e.pageX;
  my = e.pageY;
  // console.log(mx, my);
}

function getMouseX() {
  return mx;
}

function getMouseY() {
  return my;
}



function shipToAsteroid(ship, asteroid) {
  const abox = data.rock[asteroid.index].box[asteroid.size];
  const sbox = data.ship[0].box[0];
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
  return true;

}






function lasertoAsteroid(laser, asteroid) {
  const box = data.rock[asteroid.index].box[asteroid.size]
  const pn = { x: laser.getX(), y: laser.getY() };
  const po = { x: asteroid.getX(), y: asteroid.getY() };

  if (
    pn.x - po.x < box.minX || pn.x - po.x > box.maxX ||
    pn.y - po.y < box.minY || pn.y - po.y > box.maxY) {
    // console.log('fail');
    return false;
  }
  const polygon = data.rock[asteroid.index].collision[asteroid.size];
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



