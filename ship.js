const friction = 0.996;
let shipHit;

function Ship(x, y) {
  this.particle = particle.create(x, y, 0, 0, 0);
  this.particle.friction = friction;
  this.thrust = vector.create(0, 0);
  this.angle = 0;
  this.alive = true;
  console.log(this.particle);

}

Ship.prototype.reset = function () {
  this.setLocation(canvas.width / 2, canvas.height / 2)
  this.thrust.multiplyBy(0)
  this.particle.velocity.multiplyBy(0);
  this.angle = 0;
  this.alive = true;
  turningLeft = false;
  turningRight = false;
  thrusting = false;
}

Ship.prototype.update = function () {

  if (turningLeft) {
    this.angle -= 0.08;
  }
  if (turningRight) {
    this.angle += 0.08;
  }
  this.thrust.setAngle(this.angle);

  if (thrusting && this.particle.velocity.getLength() < 6) {
    // if (thrusting) {
    this.thrust.setLength(0.06);
    // console.log();
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
  const poly = this.getPoly();
  const thrust = this.getThrust();

  context.save();
  context.translate(this.particle.position.getX(), this.particle.position.getY());
  context.rotate(this.angle);
  context.beginPath();
  context.moveTo(poly[0][0], poly[0][1]);
  for (let i = 1; i < poly.length; i++) {
    context.lineTo(poly[i][0], poly[i][1]);
  }

  if (thrusting) {
    context.moveTo(thrust[0][0], thrust[0][1]);
    for (let i = 1; i < thrust.length; i++) {
      context.lineTo(thrust[i][0], thrust[i][1]);
    }
  }
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
  return [this.particle.position.getX(), this.particle.position.getY()];
}

Ship.prototype.setLocation = function (x, y) {
  this.particle.position.setX(x), this.particle.position.setY(y);
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

Ship.prototype.getPoly = function () {
  return data.ship[0].raw[0];
}

Ship.prototype.getThrust = function () {
  return data.ship[0].thrust[0];
}

Ship.prototype.getBox = function () {
  return data.ship[0].box[0];
}

Ship.prototype.getCollision = function () {
  return data.ship[0].collision[0];
}