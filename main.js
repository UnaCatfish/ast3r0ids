'use strict'
const debug = false;
const showCollide = false;

window.onload = function () {
  const canvas = document.getElementById('canvas');
  const context = canvas.getContext('2d');
  const width = canvas.width = window.innerWidth;
  const height = canvas.height = window.innerHeight;
  const ship = new Ship(width / 2, height / 2);
  const asteroids = [];
  const lasers = [];
  const explosions = [];
  const numRocks = 6;
  const bgColor = "#000";
  const lineColor = "#eee";
  const lineWidth = 1;

  function setup() {
    data.preload();
    context.fillStyle = bgColor;
    context.strokeStyle = lineColor;
    context.lineWidth = lineWidth;

    makeRocks();
    inputInit(lasers, ship)

    ///////////////////// DEBUG ////////////////////////


    ////////////////////////////////////////////////////

    update();
  }

  function update() {
    context.fillRect(0, 0, width, height);
    ////////////////// ANIMATION Loop ////////////////////

    for (let asteroid of asteroids) {
      asteroid.draw(context);
      asteroid.update();
      asteroid.edges();
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

          if (lasers[i] && lasertoAsteroid(lasers[i], asteroids[j])) {
            asteroids[j].color = 'red'
            const loc = asteroids[j].getLocation();
            const size = asteroids[j].getSize();
            asteroids.splice(j, 1);
            lasers.splice(i, 1);

            explosions.push(new Explosion(loc, size));

            if (!size == 0) {
              asteroids.push(new Asteroid(loc[0], loc[1], size - 1));
              asteroids.push(new Asteroid(loc[0], loc[1], size - 1));
            }
          }
        }
      }
    }

    ship.update();
    ship.draw(context);
    ship.edges();

    shipHit = 0;
    if (asteroids.length) {
      for (let i = 0; i < asteroids.length; i++) {
        if (shipToAsteroid(ship, asteroids[i])) {
          shipHit++;
        }
      }
    }

    if (!asteroids.length) {
      console.log('Winner, winner, chicken dinner');
      makeRocks();
    }

    if (explosions.length) {
      explosions.forEach((explosion, index) => {
        explosion.draw(context);
        explosion.update();
        if (explosion.lifespan) {
          explosion.lifespan--
        } else {
          explosions.splice(index, 1);
        }
      });

    }



    /////////////////////// End Loop /////////////////////// 
    requestAnimationFrame(update);
  }

  function makeRocks() {
    for (let i = 0; i < numRocks; i++) {
      const ax = Math.floor(Math.random() * canvas.width);
      const ay = Math.floor(Math.random() * canvas.height);

      ///////////////////////////////////////////////////////
      asteroids.push(new Asteroid(ax, ay));
      // asteroids.push(new Asteroid(width / 2 + 50, height / 2));
      ///////////////////////////////////////////////////////////
    }
  }



  setup();
};