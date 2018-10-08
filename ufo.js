// const friction = 0.996;
// let UfoHit;

function Ufo(x, y) {
  this.particle = particle.create(x, y, 0, 0, 0);
  this.alive = true;
}

Ufo.prototype.update = function () {
  this.particle.update();
}

Ufo.prototype.edges = function () {
  if (this.particle.position.getX() > canvas.width) {
    this.particle.position.setX(0);
  }
  if (this.particle.position.getX() < 0) {
    this.particle.position.setX(canvas.width);
  }
  if (this.particle.position.getY() > canvas.height) {
    this.particle.position.setY(0);
  }
  if (this.particle.position.getY() < 0) {
    this.particle.position.setY(canvas.height);
  }
}

Ufo.prototype.draw = function (context) {
  const poly = this.getPoly();
  const details = this.getDetails();
  context.save();
  context.translate(this.particle.position.getX(), this.particle.position.getY());
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
    context.translate(this.particle.position.getX(), this.particle.position.getY());
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
  return [this.particle.position.getX(), this.particle.position.getY()];
}

Ufo.prototype.setLocation = function (x, y) {
  this.particle.position.setX(x), this.particle.position.setY(y);
}

// ?????
Ufo.prototype.getLaser = function () {
  return 10;
}


// Return ufo location
Ufo.prototype.getX = function () {
  return this.particle.position.getX();
}

Ufo.prototype.getY = function () {
  return this.particle.position.getY();
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
