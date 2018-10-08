// A singular explosion used by  fireworks

function Fragment(x, y) {
  this.position = vector.create(x, y);
  this.velocity = vector.create(Math.random() * 3 - 1.5, Math.random() * 3 - 1.5)
}

Fragment.prototype.update = function () {
  this.position.addTo(this.velocity);
}


function Explosion(origin, size) {

  this.position = vector.create(origin[0], origin[1]);
  this.velocity = vector.create(0, 0);
  this.isAlive = true;
  this.numFragments = 18;
  this.fragments = [];
  this.lifespan = 24;

  for (let i = 0; i < this.numFragments; i++) {
    this.fragments.push(new Fragment(origin[0], origin[1]));
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
    context.arc(frag.position.getX(), frag.position.getY(), 0.6, 0, Math.PI * 2, false);
    // context.arc(0, 0, 1, 0, Math.PI * 2, false);
    context.stroke();
  }
  context.restore()
}