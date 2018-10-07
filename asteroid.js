const defaultsize = 2;
const speed = 0.4;

function Asteroid(x, y, size) {
  this.x = x;
  this.y = y;
  this.size = size >= 0 ? size : defaultsize;
  this.particle = particle.create(this.x, this.y, 0, 0, 0);


  ///////////////////////////////////
  this.particle.velocity.setLength(speed + (defaultsize - this.size) * 0.4);
  // this.particle.velocity.setLength(0);
  ////////////////////////////////////

  this.particle.velocity.setAngle(Math.random() * Math.PI * 2);
  this.index = Math.floor(Math.random() * data.rock.length);
}

Asteroid.prototype.draw = function (context) {
  const poly = this.getPoly();
  const coll = this.getCollision();
  const box = this.getBox();
  // const box = data.rock[this.index].box[this.size];

  context.save();
  context.translate(this.particle.position.getX(), this.particle.position.getY());
  context.beginPath();
  context.strokeStyle = '#eee';
  context.moveTo(poly[0][0], poly[0][1]);
  for (let i = 1; i < poly.length; i++) {
    context.lineTo(poly[i][0], poly[i][1]);
  }
  context.stroke();
  context.restore()

  if (showCollide) {
    context.save();
    context.translate(this.particle.position.getX(), this.particle.position.getY());
    context.beginPath();
    context.strokeStyle = '#0f0';
    context.moveTo(coll[0][0], coll[0][1]);
    for (let i = 1; i < coll.length; i++) {
      context.lineTo(coll[i][0], coll[i][1]);
    }
    context.stroke();
    context.restore()
  }

  if (debug) {
    context.save();
    context.translate(this.particle.position.getX(), this.particle.position.getY());
    context.beginPath();
    context.strokeStyle = '#f00';
    context.moveTo(box.minX, box.minY);
    context.lineTo(box.maxX, box.minY);
    context.lineTo(box.maxX, box.maxY);
    context.lineTo(box.minX, box.maxY);
    context.lineTo(box.minX, box.minY);
    context.stroke();
    context.restore()
  }
}

Asteroid.prototype.update = function () {
  this.particle.update();
}

Asteroid.prototype.edges = function () {
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

Asteroid.prototype.getLocation = function () {
  return [this.particle.position.getX(), this.particle.position.getY()];
}

Asteroid.prototype.getSize = function () {
  return this.size;
}

Asteroid.prototype.getX = function () {
  return this.particle.position.getX();
}

Asteroid.prototype.getY = function () {
  return this.particle.position.getY();
}

Asteroid.prototype.getPoly = function () {
  return data.rock[this.index].raw[this.size];
}

Asteroid.prototype.getBox = function () {
  return data.rock[this.index].box[this.size]
}

Asteroid.prototype.getCollision = function () {
  return data.rock[this.index].collision[this.size];
}