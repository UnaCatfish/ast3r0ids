function Text(text, size) {
  this.text = text;
  this.size = size;
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

