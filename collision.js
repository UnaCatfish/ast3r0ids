const polygon = [0, 5, 0, 2, -1, 5, -5, 2, -2, 0, -5, -1, -2, -5, 3, -5, 5, -3, 5, 1, 2, 5, 0, 5]
const polygons = [];
const scale = 10;
let ouch;
// let x, y;

window.onload = function () {
  var canvas = document.getElementById('canvas'),
    context = canvas.getContext('2d'),
    width = canvas.width = window.innerWidth,
    height = canvas.height = window.innerHeight;


  for (let i = 0; i < polygon.length; i += 2) {
    polygons.push({ x: polygon[i] * scale, y: polygon[i + 1] * scale })
  }

  update();

  function update() {
    context.clearRect(0, 0, width, height);
    ////////////////// ANIMATION ///////////////////////

    context.save();
    context.translate(width / 2, height / 2);
    context.beginPath();
    context.strokeStyle = (ouch ? "red" : "green")
    context.moveTo(polygons[0].x, polygons[0].y);
    for (let i = 1; i < polygons.length; i++) {
      context.lineTo(polygons[i].x, polygons[i].y);
    }

    context.stroke();
    context.restore()

    ouch = pointIsInPoly({ x: getMouseX(), y: getMouseY() }, polygons, scale);

    /////////////////////////////////////////////////// 
    requestAnimationFrame(update);
  }

  function pointIsInPoly(p, polygon, scale) {
    var isInside = false;

    // Create a boundary box for polygon
    var minX = 0, maxX = 0, minY = 0, maxY = 0;
    for (var n = 0; n < polygon.length; n++) {
      var q = polygon[n];
      minX = Math.min(q.x, minX);
      maxX = Math.max(q.x, maxX);
      minY = Math.min(q.y, minY);
      maxY = Math.max(q.y, maxY);
    }

    // quick check if p outside of boundary box
    if (p.x < minX || p.x > maxX || p.y < minY || p.y > maxY) {
      return false;
    }

    // detect if p is ionside polygon
    var i = 0, j = polygon.length - 1;
    for (i, j; i < polygon.length; j = i++) {
      if ((polygon[i].y > p.y) != (polygon[j].y > p.y) &&
        p.x < (polygon[j].x - polygon[i].x) * (p.y - polygon[i].y) / (polygon[j].y - polygon[i].y) + polygon[i].x) {
        isInside = !isInside;
      }
    }
    return isInside;
  }

  // gets mouse x and y
  var x, y;

  document.addEventListener('mousemove', onMouseUpdate, false);
  document.addEventListener('mouseenter', onMouseUpdate, false);

  function onMouseUpdate(e) {
    x = e.pageX;
    y = e.pageY;
    console.log(x, y);
  }

  function getMouseX() {
    return x - canvas.width / 2;
  }

  function getMouseY() {
    return y - canvas.height / 2;
  }
}