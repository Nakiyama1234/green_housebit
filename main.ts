let soil = 0
ESP8266ThingSpeak.connectWifi(
SerialPin.P12,
SerialPin.P13,
BaudRate.BaudRate115200,
"wifi_name",
"wifi_pass"
)
basic.forever(function () {
    dht11_dht22.queryData(
    DHTtype.DHT11,
    DigitalPin.P8,
    true,
    true,
    true
    )
})
basic.forever(function () {
    if (input.lightLevel() <= 100) {
        pins.digitalWritePin(DigitalPin.P3, 1)
        if (input.lightLevel() > 100) {
            pins.digitalWritePin(DigitalPin.P3, 0)
        }
    } else {
        pins.digitalWritePin(DigitalPin.P3, 0)
    }
})
basic.forever(function () {
    soil = Math.idiv(pins.analogReadPin(AnalogPin.P1), 10)
    if (soil >= 50) {
        pins.digitalWritePin(DigitalPin.P6, 1)
        if (soil < 50) {
            pins.digitalWritePin(DigitalPin.P6, 0)
        }
    } else {
        pins.digitalWritePin(DigitalPin.P6, 0)
    }
})
basic.forever(function () {
    ESP8266ThingSpeak.connectThingSpeak(
    "api.thingspeak.com",
    "your_write_API",
    dht11_dht22.readData(dataType.temperature),
    dht11_dht22.readData(dataType.humidity),
    soil,
    input.lightLevel(),
    0,
    0,
    0,
    0
    )
})
