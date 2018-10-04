

function Laser(location, angle) {

  this.particle = particle.create(location.getX(), location.getY(), 0, angle, 0);
  this.particle.velocity.setLength(8);
  this.particle.velocity.setAngle(angle);
  this.isAlive = true;
}

Laser.prototype.draw = function (context) {
  context.save();
  context.translate(this.particle.position.getX(), this.particle.position.getY());
  context.beginPath();
  context.arc(0, 0, 1, 0, Math.PI * 2, false);
  context.stroke();
  context.restore()
}

Laser.prototype.update = function () {
  this.particle.update();
}

Laser.prototype.edges = function () {
  if (this.particle.position.getX() > canvas.width ||
    this.particle.position.getX() < 0 ||
    this.particle.position.getY() > canvas.height ||
    this.particle.position.getY() < 0) {
    this.isAlive = false;
  }
  return this.isAlive;
}

