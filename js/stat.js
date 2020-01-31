'use strict';

var CLOUD_X = 100;
var CLOUD_Y = 10;
var CLOUD_HEIGHT = 270;
var CLOUD_WIDTH = 420;
var CLOUD_COLOR = '#fff';
var CLOUD_SHADOW_OFFSET_X = 10;
var CLOUD_SHADOW_OFFSET_Y = 10;
var CLOUD_SHADOW_COLOR = 'rgba(0, 0, 0, .7)';
var TEXT_BASELINE = 'top';
var TEXT_FONT = '16px PT Mono';
var TEXT_COLOR = '#000';
var GREETING_TEXT = 'Ура вы победили!';
var GREETING_TEXT_X = CLOUD_X + 20;
var GREETING_TEXT_Y = CLOUD_Y + 17;
var HISTOGRAM_HEADER_TEXT = 'Список результатов:';
var HISTOGRAM_HEADER_TEXT_X = CLOUD_X + 20;
var HISTOGRAM_HEADER_TEXT_Y = GREETING_TEXT_Y + 20;
var HISTOGRAM_X = CLOUD_X + 50;
var HISTOGRAM_Y = HISTOGRAM_HEADER_TEXT_Y + 45;
var HISTOGRAM_HEIGHT = 150;
var HISTOGRAM_COLUMN_WIDTH = 40;
var HISTOGRAM_COLUMN_SPACE_BETWEEN = 50;
var HISTOGRAM_COLUMN_COLOR_HUE = 222;
var HISTOGRAM_COLUMN_COLOR_LIGHTNESS = 50;
var HISTOGRAM_COLUMN_PLAYER_COLOR = 'rgba(255, 0, 0, 1)';
var HISTOGRAM_PLAYER_NAME_OFFSET = 10;
var HISTOGRAM_PLAYER_TIME_OFFSET = 22;
var PLAYER_NAME = 'Вы';

window.renderStatistics = function (ctx, names, times) {
  var oldFillStyle = {
    save: function () {
      this.style = ctx.fillStyle;
    },
    restore: function () {
      ctx.fillStyle = this.style;
    }
  };
  var renderCloud = function (x, y, width, height) {
    var renderShape = function (offsetX, offsetY) {
      if (!offsetX) {
        offsetX = 0;
      }
      if (!offsetY) {
        offsetY = 0;
      }
      ctx.fillRect(x + offsetX, y + offsetY, width, height);
    };
    var renderShadow = function (color) {
      oldFillStyle.save();

      ctx.fillStyle = color;
      renderShape(CLOUD_SHADOW_OFFSET_X, CLOUD_SHADOW_OFFSET_Y);

      oldFillStyle.restore();
    };

    oldFillStyle.save();

    renderShadow(CLOUD_SHADOW_COLOR);
    ctx.fillStyle = CLOUD_COLOR;
    renderShape();

    oldFillStyle.restore();
  };
  var renderGreetingText = function (text) {
    ctx.fillText(text, GREETING_TEXT_X, GREETING_TEXT_Y);
  };
  var renderHistogram = function () {
    var renderHeaderText = function (text) {
      ctx.fillText(text, HISTOGRAM_HEADER_TEXT_X, HISTOGRAM_HEADER_TEXT_Y);
    };
    var renderColumn = function (player, i) {
      oldFillStyle.save();

      if (i !== 0) {
        var saturation = Math.floor(Math.random() * 101); // random value from 0 to 100
        ctx.fillStyle = 'hsl(' + HISTOGRAM_COLUMN_COLOR_HUE + ', ' + saturation + '%, ' + HISTOGRAM_COLUMN_COLOR_LIGHTNESS + '%)';
      } else {
        ctx.fillStyle = HISTOGRAM_COLUMN_PLAYER_COLOR;
      }

      var columnHeight = HISTOGRAM_HEIGHT / biggestTime * player.time;
      var columnX = HISTOGRAM_X + (HISTOGRAM_COLUMN_SPACE_BETWEEN + HISTOGRAM_COLUMN_WIDTH) * i;
      var columnY = HISTOGRAM_Y + HISTOGRAM_HEIGHT - columnHeight;
      ctx.fillRect(columnX, columnY, HISTOGRAM_COLUMN_WIDTH, columnHeight);

      var nameX = columnX;
      var nameY = HISTOGRAM_Y + HISTOGRAM_HEIGHT + HISTOGRAM_PLAYER_NAME_OFFSET;
      player.renderName(player.name, nameX, nameY);

      var timeX = columnX;
      var timeY = columnY - HISTOGRAM_PLAYER_TIME_OFFSET;
      player.renderTime(player.time, timeX, timeY);

      oldFillStyle.restore();
    };

    renderHeaderText(HISTOGRAM_HEADER_TEXT);
    var players = [{name: '', time: 0}];
    var biggestTime = 0;
    names.forEach(function (playerName, i) {
      times[i] = Math.round(times[i]);
      if (biggestTime < times[i]) {
        biggestTime = times[i];
      }
      var player = {
        name: playerName,
        time: times[i],
        renderName: function (name, x, y) {
          oldFillStyle.save();
          ctx.fillStyle = TEXT_COLOR;
          ctx.fillText(name, x, y);
          oldFillStyle.restore();
        },
        renderTime: function (time, x, y) {
          oldFillStyle.save();
          ctx.fillStyle = TEXT_COLOR;
          ctx.fillText(time, x, y);
          oldFillStyle.restore();
        }
      };
      if (playerName !== PLAYER_NAME) {
        players.push(player);
      } else {
        players[0] = player;
      }
    });

    players.forEach(function (player, i) {
      renderColumn(player, i);
    });
  };

  ctx.textBaseline = TEXT_BASELINE;
  ctx.font = TEXT_FONT;
  ctx.fillStyle = TEXT_COLOR;

  renderCloud(CLOUD_X, CLOUD_Y, CLOUD_WIDTH, CLOUD_HEIGHT);
  renderGreetingText(GREETING_TEXT);
  renderHistogram();
};
