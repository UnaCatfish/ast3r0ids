'use strict'

// const asteroids = [];

window.onload = function () {
  const canvas = document.getElementById('canvas');
  const context = canvas.getContext('2d');
  const width = canvas.width = window.innerWidth;
  const height = canvas.height = window.innerHeight;
  const ship = new Ship(width / 2, height / 2);
  const numRocks = 6;
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

    ship.update();
    ship.draw(context);
    ship.edges();

    for (let asteroid of asteroids) {
      asteroid.draw(context);
      asteroid.update();
      asteroid.edges();
    }

    for (let laser of lasers) {
      // laser.draw(context);
      // laser.update();
      // laser.hit();
    }

    /////////////////////////////////////////////////// 
    requestAnimationFrame(update);
  }
  setup();
};