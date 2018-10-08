
function Laser(location, angle, ufo) {
  this.position = vector.create(location[0], location[1], 0, angle, 0);

  this.gun = vector.create(8, 0);
  this.gun.setAngle(angle);


  this.position.addTo(this.gun);
  this.velocity = vector.create(0, 0)
  this.velocity.setLength(8);
  this.velocity.setAngle(angle);
  this.isAlive = true;
}

Laser.prototype.draw = function (context) {
  context.save();
  context.translate(this.position.getX(), this.position.getY());
  context.beginPath();
  context.fillStyle = "#fff"
  // context.fillRect(0, 0, 2, 2);
  context.arc(0, 0, 1, 0, Math.PI * 2, false);
  context.stroke();
  context.restore()
}

Laser.prototype.update = function () {
  this.position.addTo(this.velocity);
}

Laser.prototype.edges = function () {
  if (this.position.getX() > canvas.width ||
    this.position.getX() < 0 ||
    this.position.getY() > canvas.height ||
    this.position.getY() < 0) {
    this.isAlive = false;
  }
  return this.isAlive;
}

Laser.prototype.getX = function () {
  return this.position.getX();
}

Laser.prototype.getY = function () {
  return this.position.getY();
}