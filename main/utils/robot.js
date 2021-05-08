const robot = require('robotjs')

function getScreen() {
  var screenSize = robot.getScreenSize()
  var height = screenSize.height / 2 - 10
  var width = screenSize.width

  return { width, height }
}

function mouseMove(x, y) {
  robot.moveMouse(x, y)
}

module.exports = { getScreen, mouseMove }
