def ButtonInfo():
    global buttonVal, buttonNum
    buttonVal = pins.analog_read_pin(AnalogPin.P2)
    if buttonVal < 256:
        buttonNum = 1
    elif buttonVal < 597:
        buttonNum = 2
    elif buttonVal < 725:
        buttonNum = 3
    elif buttonVal < 793:
        buttonNum = 4
    elif buttonVal < 836:
        buttonNum = 5
    elif buttonVal < 938:
        buttonNum = 6
    else:
        buttonNum = 0
    return buttonNum
base_angle = 0
magnitude = 0
inputY = 0
inputX = 0
buttonNum = 0
buttonVal = 0
radio.set_group(1)

def on_forever():
    global inputX, inputY, magnitude, base_angle
    inputX = Math.map(pins.analog_read_pin(AnalogPin.P0), 0, 1023, -1, 1)
    inputY = Math.map(pins.analog_read_pin(AnalogPin.P1), 0, 1023, -1, 1)
    magnitude = Math.sqrt(inputX * inputX + inputY * inputY)
    magnitude = min(magnitude, 1)
    base_angle = Math.atan2(inputX, inputY)
    radio.send_value("mag", magnitude)
    radio.send_value("ban", base_angle)
    if base_angle > 3.14 * (-1 / 8) and base_angle <= 3.14 * (1 / 8):
        basic.show_arrow(ArrowNames.NORTH)
    elif base_angle > 3.14 * (1 / 8) and base_angle <= 3.14 * (3 / 8):
        basic.show_arrow(ArrowNames.NORTH_EAST)
    elif base_angle > 3.14 * (3 / 8) and base_angle <= 3.14 * (5 / 8):
        basic.show_arrow(ArrowNames.EAST)
    elif base_angle > 3.14 * (5 / 8) and base_angle <= 3.14 * (7 / 8):
        basic.show_arrow(ArrowNames.SOUTH_EAST)
    elif base_angle > 3.14 * (-3 / 8) and base_angle <= 3.14 * (-1 / 8):
        basic.show_arrow(ArrowNames.NORTH_WEST)
    elif base_angle > 3.14 * (-5 / 8) and base_angle <= 3.14 * (-3 / 8):
        basic.show_arrow(ArrowNames.WEST)
    elif base_angle > 3.14 * (-7 / 8) and base_angle <= 3.14 * (-5 / 8):
        basic.show_arrow(ArrowNames.SOUTH_WEST)
    else:
        basic.show_arrow(ArrowNames.SOUTH)
basic.forever(on_forever)
