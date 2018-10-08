const defaultsize = 2;
const speed = 0.4;

function Asteroid(x, y, size) {
  this.x = x;
  this.y = y;
  this.size = size >= 0 ? size : defaultsize;
  this.position = vector.create(x, y);
  this.velocity = vector.create(0, 0)
  this.velocity.setLength(speed + (defaultsize - this.size) * 0.4);
  this.velocity.setAngle(Math.random() * Math.PI * 2);
  this.rockType = Math.floor(Math.random() * data.rock.length);
}

Asteroid.prototype.draw = function (context) {
  const poly = this.getPoly();
  const coll = this.getCollision();
  const box = this.getBox();

  context.save();
  context.translate(this.position.getX(), this.position.getY());
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
    context.translate(this.position.getX(), this.position.getY());
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
    context.translate(this.position.getX(), this.position.getY());
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
  this.position.addTo(this.velocity);
}

Asteroid.prototype.edges = function () {
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

Asteroid.prototype.getLocation = function () {
  return [this.position.getX(), this.position.getY()];
}

Asteroid.prototype.getSize = function () {
  return this.size;
}

Asteroid.prototype.getX = function () {
  return this.position.getX();
}

Asteroid.prototype.getY = function () {
  return this.position.getY();
}

Asteroid.prototype.getPoly = function () {
  return data.rock[this.rockType].raw[this.size];
}

Asteroid.prototype.getBox = function () {
  return data.rock[this.rockType].box[this.size]
}

Asteroid.prototype.getCollision = function () {
  return data.rock[this.rockType].collision[this.size];
}