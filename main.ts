function dispDirection (angle: number) {
    if (angle > 3.14 * (-1 / 8) && angle <= 3.14 * (1 / 8)) {
        basic.showArrow(ArrowNames.North)
    } else if (angle > 3.14 * (1 / 8) && angle <= 3.14 * (3 / 8)) {
        basic.showArrow(ArrowNames.NorthEast)
    } else if (angle > 3.14 * (3 / 8) && angle <= 3.14 * (5 / 8)) {
        basic.showArrow(ArrowNames.East)
    } else if (angle > 3.14 * (5 / 8) && angle <= 3.14 * (7 / 8)) {
        basic.showArrow(ArrowNames.SouthEast)
    } else if (angle > 3.14 * (-3 / 8) && angle <= 3.14 * (-1 / 8)) {
        basic.showArrow(ArrowNames.NorthWest)
    } else if (angle > 3.14 * (-5 / 8) && angle <= 3.14 * (-3 / 8)) {
        basic.showArrow(ArrowNames.West)
    } else if (angle > 3.14 * (-7 / 8) && angle <= 3.14 * (-5 / 8)) {
        basic.showArrow(ArrowNames.SouthWest)
    } else {
        basic.showArrow(ArrowNames.South)
    }
}
function ButtonInfo () {
    buttonVal = pins.analogReadPin(AnalogPin.P2)
    if (buttonVal < 256) {
        buttonNum = 1
    } else if (buttonVal < 597) {
        buttonNum = 2
    } else if (buttonVal < 725) {
        buttonNum = 3
    } else if (buttonVal < 793) {
        buttonNum = 4
    } else if (buttonVal < 836) {
        buttonNum = 5
    } else if (buttonVal < 938) {
        buttonNum = 6
    } else {
        buttonNum = 0
    }
    return buttonNum
}
let baseAngle = 0
let magnitude = 0
let inputY = 0
let inputX = 0
let buttonNum = 0
let buttonVal = 0
radio.setGroup(1)
basic.forever(function () {
    inputX = Math.map(pins.analogReadPin(AnalogPin.P0), 0, 1023, -1, 1)
    inputY = Math.map(pins.analogReadPin(AnalogPin.P1), 0, 1023, -1, 1)
    magnitude = Math.sqrt(inputX * inputX + inputY * inputY)
    magnitude = Math.min(magnitude, 1)
    baseAngle = Math.atan2(inputX, inputY)
    radio.sendValue("mag", magnitude)
    radio.sendValue("ban", baseAngle)
    radio.sendValue("btn", ButtonInfo())
})
loops.everyInterval(100, function () {
    basic.pause(100)
    if (magnitude > 0.05) {
        dispDirection(baseAngle)
    } else if (buttonNum == 2) {
        basic.showLeds(`
            . . # . .
            . . . # .
            . # # # #
            # . . # .
            # . # . .
            `)
    } else if (buttonNum == 4) {
        basic.showLeds(`
            . . # . .
            . # . . .
            # # # # .
            . # . . #
            . . # . #
            `)
    } else {
        basic.clearScreen()
    }
})
