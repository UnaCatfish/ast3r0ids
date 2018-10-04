

function Laser(x, y, scale) {

  this.particle = particle.create(this.x, this.y, 0, 0, 0);
  this.particle.velocity.setLength(0.3);
  this.particle.velocity.setAngle(Math.random() * Math.PI * 2);

}

Laser.prototype.draw = function (context) {
  context.save();
  context.translate(this.particle.position.getX(), this.particle.position.getY());
  context.strokeStyle = "#eee";
  context.beginPath();
  context.moveTo(this.shape[0][0], this.shape[0][1]);
  for (let i = 1; i < this.shape.length; i++) {
    context.lineTo(this.shape[i][0], this.shape[i][1]);
  }
  context.stroke();
  context.restore()
}

Laser.prototype.update = function () {
  this.particle.update();
}

Laser.prototype.edges = function () {
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

