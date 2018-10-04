'use strict'

// const asteroids = [];

window.onload = function () {
  const canvas = document.getElementById('canvas');
  const context = canvas.getContext('2d');
  const width = canvas.width = window.innerWidth;
  const height = canvas.height = window.innerHeight;
  const ship = new Ship(width / 2, height / 2);
  const numRocks = 128;
  const asteroids = [];
  const lasers = [];
  const bgColor = "#000";
  const lineColor = "#eee";

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

    // console.log(lasers[0]);
    let foo, bar;

    for (let i = lasers.length - 1; i >= 0; i--) {
      lasers[i].draw(context);
      lasers[i].update();
      if (lasers.length && !lasers[i].edges()) {
        foo = lasers.splice(i, 1);
        break;
      }



      // check against rocks
      if (lasers.length > 0) {
        for (let j = asteroids.length - 1; j >= 0; j--) {
          // console.log(lasers.length, i);

          if (lasers[i] && pnpoly(lasers[i].particle.position,
            asteroids[j].shape,
            asteroids[j].getLocation())) {
            asteroids[j].color = 'red'
            asteroids.splice(j, 1);
            lasers.splice(i, 1);

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