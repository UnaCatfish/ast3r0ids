const friction = 0.994;
let shipHit;


function Ship(x, y) {
  this.particle = particle.create(x, y, 0, 0, 0);
  this.particle.friction = friction;
  this.thrust = vector.create(0, 0);
  this.angle = 0;
}

Ship.prototype.update = function () {

  if (turningLeft) {
    this.angle -= 0.05;
  }
  if (turningRight) {
    this.angle += 0.05;
  }
  this.thrust.setAngle(this.angle);

  if (thrusting) {
    this.thrust.setLength(0.06);
  } else {
    this.thrust.setLength(0);
  }

  this.particle.accelerate(this.thrust);
  this.particle.update();
}

Ship.prototype.edges = function () {
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

Ship.prototype.draw = function (context) {
  context.save();
  context.translate(this.particle.position.getX(), this.particle.position.getY());
  context.rotate(this.angle);

  // context.fillStyle = shipHit ? "#f50" : "#000";
  context.beginPath();
  context.moveTo(10, 0);
  context.lineTo(-10, -7);
  context.lineTo(-10, 7);
  context.lineTo(10, 0);

  if (thrusting) {
    context.moveTo(-10, -3);
    context.lineTo(-17, 0);
    context.lineTo(-10, 3);
  }
  // context.fill();
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
    context.strokeStyle = shipHit ? "#f00" : "#0f0";
    context.stroke();
    context.restore()
  }

}

Ship.prototype.getHeading = function () {
  return this.angle;
}

Ship.prototype.getLocation = function () {
  return this.particle.position;
}

Ship.prototype.getLaser = function () {
  return 10;
}

Ship.prototype.getX = function () {
  return this.particle.position.getX();
}

Ship.prototype.getY = function () {
  return this.particle.position.getY();
}

Ship.prototype.getBox = function () {
  return data.ship[0].box[0];
}