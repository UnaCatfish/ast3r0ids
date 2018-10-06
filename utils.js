function Watch() {
  const d = new Date()
  this.start = d.getTime()
  // console.log(this.start);

}

Watch.prototype.diff = function (seconds) {
  t = new Date();
  return t.getTime() - this.start / 1000 > seconds;
}