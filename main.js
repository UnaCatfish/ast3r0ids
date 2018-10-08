'use strict'
const debug = false;
const showCollide = false;
let gameOver = false;

window.onload = function () {
  const canvas = document.getElementById('canvas');
  const context = canvas.getContext('2d');
  const width = canvas.width = window.innerWidth;
  const height = canvas.height = window.innerHeight;
  const ship = new Ship(width / 2, height / 2);
  const score = new Score();
  const asteroids = [];
  const ufos = [];
  const lasers = [];
  const explosions = [];
  const numRocks = 6;
  const bgColor = "#000";
  const lineColor = "#fff";
  const lineWidth = 1;
  const respawnTime = 2000;

  function setup() {
    data.preload();
    context.fillStyle = bgColor;
    context.strokeStyle = lineColor;
    context.lineWidth = lineWidth;

    makeRocks();
    inputInit(lasers, ship)

    setTimeout(spawnUfo, 3000)


    update();
  }

  ///////////// Timed ///////////////////

  function spawnUfo() {
    if (ufos.length == 0) {
      ufos.push(new Ufo(
        Math.floor(Math.random() * canvas.width),
        Math.floor(Math.random() * canvas.height)));

    }
  }

  function respawn() {
    ship.reset();
  }
  //////////////////////////////////


  function update() {
    context.fillRect(0, 0, width, height);

    ////////////////// ANIMATION Loop ////////////////////

    score.draw(context);

    for (let asteroid of asteroids) {
      asteroid.update();
      asteroid.edges();
      asteroid.draw(context);
    }

    if (ufos.length > 0) {
      ufos[0].draw(context);
    }


    if (!gameOver) {


      if (ship.alive && fire) {
        {
          if (lasers.length < 4) {
            lasers.push(new Laser(ship.getLocation(), ship.getHeading()));
            fire = false;
          }
        }
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

              // Increase score
              score.update('rock', size)
            }
          }

          if (lasers[i] && ufos[0] && laserToUfo(lasers[i], ufos[0])) {
            const loc = ufos[0].getLocation();
            // const size = ufos[0].getSize();
            score.update('ufo', 1)
            ufos.splice(0, 1);
            lasers.splice(i, 1);
            explosions.push(new Explosion(loc, 0));
            const st = Math.random() * 15000 + 15000;
            console.log(Math.round(st / 1000));
            setTimeout(spawnUfo, st);
          }

        }
      }


      // draw, update and check ship
      if (ship.alive) {
        ship.update();
        ship.draw(context);
        ship.edges();

        shipHit = 0;
        if (asteroids.length) {
          for (let i = 0; i < asteroids.length; i++) {
            let check = shipToAsteroid(ship, asteroids[i]);
            if (check) {
              const loc = ship.getLocation();
              explosions.push(new Explosion([check.x, check.y]));
              // shipHit++;
              ship.alive = false;
              score.removeShip();
              setTimeout(respawn, respawnTime)
              fire = false;
              break;
            }
          }
        }
      }

      if (!asteroids.length) {
        console.log('Winner, winner, chicken dinner');
        makeRocks();
      }
    } else {
      context.save()
      context.font = "30px sans-serif ";
      context.fillStyle = "#fff";
      context.textAlign = "center";
      context.fillText("GAME OVER", canvas.width / 2, canvas.height / 2);
      context.restore();
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

      let ax = 0
      let ay = 0;
      let loc = Math.floor(Math.random() * 4);
      if (loc == 0) {
        ax = Math.floor(Math.random() * canvas.width);
      } else if (loc == 1) {
        ax = Math.floor(Math.random() * canvas.width);
        ay = canvas.height;
      } else if (loc == 1) {
        ay = Math.floor(Math.random() * canvas.height); ay = Math.floor(Math.random() * canvas.height);
      } else {
        ax = canvas.width;
        ay = Math.floor(Math.random() * canvas.height);
      }



      ///////////////////////////////////////////////////////
      asteroids.push(new Asteroid(ax, ay));
      // asteroids.push(new Asteroid(width / 2 + 50, height / 2));
      ///////////////////////////////////////////////////////////
    }
  }
  setup();
};