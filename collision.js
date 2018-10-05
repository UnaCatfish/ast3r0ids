function lasertoAsteroid(laser, asteroid) {

  var isInside = false;

  const box = data.rock[asteroid.index].box[asteroid.size]
  const ax = asteroid.getX();
  const ay = asteroid.getY();
  const px = laser.getX();
  const py = laser.getY();
  // const px = mx;
  // const py = my;

  // console.log('#####');
  // console.log('mx:' + mx);
  // console.log('my:' + my);
  // console.log('ax:' + ax);
  // console.log('ay:' + ay);
  // console.log('maxY:' + box.maxY);
  // console.log('my- ay:' + (my - ay));

  if (
    px - ax < box.minX || px - ax > box.maxX ||
    py - ay < box.minY || py - ay > box.maxY) {
    // console.log('fail');
    return false;
  }
  const polygon = data.rock[asteroid.index].collision[asteroid.size];

  // Check if point is inside the polygon
  var i = 0, j = polygon.length - 1;
  for (i, j; i < polygon.length; j = i++) {

    const ix = polygon[i][0] + ax;
    const iy = polygon[i][1] + ay;
    const jx = polygon[j][0] + ax;
    const jy = polygon[j][1] + ay;

    // the magic algorythm 
    if ((iy > py) != (jy > py) &&
      px < (jx - ix) * (py - iy) / (jy - iy) + ix) {
      isInside = !isInside;
    }
  }
  return isInside;
}


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