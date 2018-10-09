function Text(text, size, dx, x, y) {
  this.text = text;
  this.size = size;
  this.x = x;
  this.y = y;
  this.dx = dx;
}

Text.prototype.draw = function (context) {
  const dx = 24;
  const x = this.text.length / 2 * dx;
  context.save();
  context.translate(canvas.width / 2 - x, canvas.height / 2);
  context.beginPath();
  for (let i = 0; i < this.text.length; i++) {
    const letter = this.text[i];
    const lines = alphaData[letter];
    context.translate(dx, 0);
    if (letter != ' ') {
      for (const line of lines) {
        context.moveTo(line[0][0] * this.size, line[0][1] * this.size);
        context.lineTo(line[1][0] * this.size, line[1][1] * this.size);
      }
    }
  }
  context.stroke();
  context.restore()
}

Text.prototype.drawRight = function (context) {
  const dx = -this.dx;
  const x = this.x;
  context.save();
  context.translate(this.x, this.y);
  context.beginPath();
  for (let i = this.text.length - 1; i >= 0; i--) {
    const letter = this.text[i];
    const lines = alphaData[letter];
    if (letter != ' ') {
      for (const line of lines) {
        context.moveTo(line[0][0] * this.size, line[0][1] * this.size);
        context.lineTo(line[1][0] * this.size, line[1][1] * this.size);
      }
    }
    context.translate(dx, 0);
  }
  context.stroke();
  context.restore()
}

