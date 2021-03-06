// Generated by CoffeeScript 1.3.3
(function() {

  window.GravityDemo = (function() {
    var applyGravities, frameRate, gravitationalConstant, gravityX, gravityY, pixelsPerMeter;

    pixelsPerMeter = 30;

    gravityX = 0;

    gravityY = 0;

    frameRate = 20;

    gravitationalConstant = 1.5;

    function GravityDemo(canvas, debugCanvas, statsCanvas) {
      var i, j, x, xVel, y, yVel, _i, _j,
        _this = this;
      this.world = new EaselBoxWorld(this, frameRate, canvas, debugCanvas, gravityX, gravityY, pixelsPerMeter);
      this.world.addImage("/img/space.jpg");
      this.world.addEntity({
        radiusPixels: 20,
        scaleX: 0.25,
        scaleY: 0.25,
        imgSrc: 'img/Earth.png',
        frames: {
          width: 213,
          height: 160,
          count: 13,
          regX: 106,
          regY: 82
        },
        xPixels: canvas.width * 2 / 3,
        yPixels: canvas.height * 2 / 3,
        angleRadians: 45,
        angularVelRadians: 2
      });
      for (i = _i = 0; _i <= 4; i = ++_i) {
        for (j = _j = 0; _j <= 3; j = ++_j) {
          x = -40 + Math.floor(Math.random() * 80) + canvas.width * i / 4;
          y = -40 + Math.floor(Math.random() * 80) + canvas.height * j / 3;
          xVel = -10 + Math.floor(Math.random() * 20);
          yVel = -10 + Math.floor(Math.random() * 20);
          this.addSparkle(x, y, xVel, yVel);
        }
      }
      this.stats = new Stats();
      statsCanvas.appendChild(this.stats.domElement);
      canvas.onclick = function(event) {
        return _this.addSparkle(event.offsetX, event.offsetY, 0, 0);
      };
    }

    GravityDemo.prototype.addSparkle = function(spX, spY, xVel, yVel) {
      return this.world.addEntity({
        radiusPixels: 4,
        imgSrc: '/img/sparkle_21x23.png',
        frames: {
          width: 21,
          height: 23,
          regX: 10,
          regY: 11
        },
        startFrame: Math.random() * 13,
        xPixels: spX,
        yPixels: spY,
        xVelPixels: xVel,
        yVelPixels: yVel
      });
    };

    GravityDemo.prototype.tick = function() {
      var object1, object2, _i, _len, _ref, _results;
      this.stats.update();
      _ref = this.world.objects;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        object1 = _ref[_i];
        _results.push((function() {
          var _j, _len1, _ref1, _results1;
          _ref1 = this.world.objects;
          _results1 = [];
          for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
            object2 = _ref1[_j];
            if (object1 !== object2) {
              _results1.push(applyGravities(object1, object2));
            } else {
              _results1.push(void 0);
            }
          }
          return _results1;
        }).call(this));
      }
      return _results;
    };

    applyGravities = function(obj1, obj2) {
      var diffVec, distSq, forceMagnitude, pos1, pos2;
      pos1 = obj1.body.GetWorldCenter();
      pos2 = obj2.body.GetWorldCenter();
      diffVec = pos2.Copy();
      diffVec.Subtract(pos1);
      distSq = diffVec.LengthSquared();
      forceMagnitude = gravitationalConstant * obj1.body.GetMass() * obj2.body.GetMass() / distSq;
      diffVec.Normalize();
      diffVec.Multiply(forceMagnitude);
      return obj1.body.ApplyForce(diffVec, pos1);
    };

    return GravityDemo;

  })();

}).call(this);
