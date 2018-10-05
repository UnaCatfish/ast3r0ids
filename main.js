'use strict'

// const asteroids = [];

window.onload = function () {
  const canvas = document.getElementById('canvas');
  const context = canvas.getContext('2d');
  const width = canvas.width = window.innerWidth = 480;
  const height = canvas.height = window.innerHeight = 360;
  const ship = new Ship(width / 2, height / 2);
  const numRocks = 6;
  const asteroids = [];
  const lasers = [];
  const bgColor = "#000";
  const lineColor = "#eee";
  context.lineWidth = 2;


  function setup() {
    context.fillStyle = bgColor;
    context.strokeStyle = lineColor;

    for (let i = 0; i < numRocks; i++) {
      asteroids.push(new Asteroid());
    }
    inputInit(lasers, ship)
    update();
  }

  function update() {
    context.fillRect(0, 0, width, height);
    ////////////////// ANIMATION ///////////////////////

    for (let asteroid of asteroids) {

      asteroid.draw(context);
      asteroid.update();
      asteroid.edges();
      asteroid.color = lineColor;
    }

    for (let i = lasers.length - 1; i >= 0; i--) {
      lasers[i].draw(context);
      lasers[i].update();
      if (lasers.length && !lasers[i].edges()) {
        lasers.splice(i, 1);
        break;
      }

      // check against rocks
      if (lasers.length > 0) {
        for (let j = asteroids.length - 1; j >= 0; j--) {
          // console.log(lasers.length, i);

          if (lasers[i] && pnpoly(lasers[i].particle.position, asteroids[j].shapeCollide, asteroids[j].getLocation())) {
            asteroids[j].color = 'red'
            const loc = asteroids[j].getLocation();
            const scale = asteroids[j].getScale();
            asteroids.splice(j, 1);
            lasers.splice(i, 1);

            if (scale > 2) {
              asteroids.push(new Asteroid(loc[0], loc[1], scale / 3));
              asteroids.push(new Asteroid(loc[0], loc[1], scale / 3));
            }


          }
        }
      }
    }


    ship.update();
    ship.draw(context);
    ship.edges();

    /////////////////////////////////////////////////// 
    requestAnimationFrame(update);
  }
  setup();
};