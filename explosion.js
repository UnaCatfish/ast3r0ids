// A singular explosion used by  fireworks
function Explosion(origin, size) {

  this.position = vector.create(origin[0], origin[1]);
  this.velocity = vector.create(0, 0);
  this.isAlive = true;
  this.numFragments = 12;
  this.fragments = [];
  this.lifespan = 30;

  for (let i = 0; i < this.numFragments; i++) {
    this.fragments.push(particle.create(
      origin[0],
      origin[1],
      Math.random() * 2 + .5,
      Math.random() * Math.PI * 2,
      0));
  }
}

Explosion.prototype.update = function () {
  for (const frag of this.fragments) {
    frag.update();
  }
}

Explosion.prototype.draw = function (context) {
  context.save();
  // context.translate(this.position.getX(), this.position.getY());
  for (const frag of this.fragments) {
    context.beginPath();

    context.arc(frag.position.getX(), frag.position.getY(), 0.5, 0, Math.PI * 2, false);
    // context.arc(0, 0, 1, 0, Math.PI * 2, false);
    context.stroke();
  }
  context.restore()
}