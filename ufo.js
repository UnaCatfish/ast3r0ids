// const friction = 0.996;
// let UfoHit;
const fireRate = 50;

function Ufo(x, y) {
  this.x = x;
  this.y = y;
  this.position = vector.create(x, y);
  this.velocity = vector.create(0, 0)
  this.velocity.setLength(1);
  this.velocity.setAngle(Math.random() * Math.PI * 2);
  this.alive = true;
  this.change = Math.random() * 75 + 50;
  this.fireRate = fireRate;
  this.laserLoc = 25;
}

Ufo.prototype.getLaserLoc = function () {
  return this.laserLoc
}

Ufo.prototype.update = function () {
  if (this.change > 0) {
    this.position.addTo(this.velocity);
    this.change -= 1
  } else {
    this.change = Math.random() * 75 + 50;
    this.velocity.setAngle(Math.random() * Math.PI * 2);
  }
}

Ufo.prototype.getLaser = function (direction) {

  if (this.fireRate > 0) {
    this.fireRate -= 1;
    return null;
  }

  this.fireRate = fireRate;
  const dir = Math.random() * Math.PI * 2;

  return this.getLocation();

}


Ufo.prototype.edges = function () {
  if (this.position.getX() > canvas.width) {
    this.position.setX(0);
  }
  if (this.position.getX() < 0) {
    this.position.setX(canvas.width);
  }
  if (this.position.getY() > canvas.height) {
    this.position.setY(0);
  }
  if (this.position.getY() < 0) {
    this.position.setY(canvas.height);
  }
}

Ufo.prototype.draw = function (context) {
  const poly = this.getPoly();
  const details = this.getDetails();
  context.save();
  context.translate(this.position.getX(), this.position.getY());
  context.beginPath();
  context.moveTo(poly[0][0], poly[0][1]);
  for (let i = 1; i < poly.length; i++) {
    context.lineTo(poly[i][0], poly[i][1]);
  }
  context.moveTo(details[0][0][0], details[0][0][1]);
  context.lineTo(details[0][1][0], details[0][1][1]);
  context.moveTo(details[1][0][0], details[1][0][1]);
  context.lineTo(details[1][1][0], details[1][1][1]);

  context.stroke();
  context.restore()

  if (debug) {
    const poly = this.getBox();
    context.save();
    context.translate(this.position.getX(), this.position.getY());
    context.rotate(this.angle);
    context.beginPath();
    context.moveTo(poly.minX, poly.minY);
    context.lineTo(poly.maxX, poly.minY);
    context.lineTo(poly.maxX, poly.maxY);
    context.lineTo(poly.minX, poly.maxY);
    context.lineTo(poly.minX, poly.minY);
    context.strokeStyle = "#f00";
    // context.strokeStyle = UfoHit ? "#f00" : "#0f0";
    context.stroke();
    context.restore()
  }

}

Ufo.prototype.getHeading = function () {
  return this.angle;
}


Ufo.prototype.getLocation = function () {
  return [this.position.getX(), this.position.getY()];
}

Ufo.prototype.setLocation = function (x, y) {
  this.position.setX(x), this.position.setY(y);
}

// Return ufo location
Ufo.prototype.getX = function () {
  return this.position.getX();
}

Ufo.prototype.getY = function () {
  return this.position.getY();
}


// Fetch graphics from data
Ufo.prototype.getPoly = function () {
  return data.ufo[0].poly[0];
}

Ufo.prototype.getCPoly = function () {
  return data.ufo[0].cPoly[0];
}

// details returns an array of lines
Ufo.prototype.getDetails = function () {
  return data.ufo[0].details;
}

Ufo.prototype.getBox = function () {
  return data.ufo[0].box[0];
}
