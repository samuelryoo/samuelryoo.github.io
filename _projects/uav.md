---
title: Multirotor UAV Avionics
short_title: UAV Avionics
tile_label: UAV-LINK
# Keeps the original address of this page so existing links keep working.
permalink: /projects/UAV/
summary: >-
  Radio link, telemetry chain, and serial configuration for a multirotor: getting a transmitter,
  receiver, autopilot, and ground station to talk to each other reliably.
kind: Team project · Avionics
role: Radio link, telemetry, and system configuration
team: 4 people
timeline: Sep – Dec 2025
status: Complete
order: 3
featured: true
stack: [ArduPilot, ExpressLRS, EdgeTX, CRSF, MAVLink, UART, ESP32, Mission Planner]
coursework: EECS 195, Drones
highlights:
  - Flashed ExpressLRS on the transmitter and receiver and verified a two-way CRSF link.
  - Remapped the flight controller's UARTs in ArduPilot so CRSF runs through SERIAL6.
  - Set up an ESP32 telemetry bridge streaming MAVLink at 57.6 kbaud over WiFi to the ground station.
specs:
  - { label: Hardware, value: "Matek F405 flight controller, Happymodel EP2 receiver, Radiomaster Pocket transmitter, ESP32" }
  - { label: Firmware, value: "ArduPilot, ExpressLRS, EdgeTX, DroneBridge (configured and flashed, not written by me)" }
  - { label: Protocols, value: "CRSF for control, MAVLink for telemetry, both over UART" }
  - { label: Ground station, value: "Mission Planner over UDP WiFi" }
chains:
  - title: Control link
    nodes:
      - { name: Radiomaster Pocket, note: EdgeTX, link: ExpressLRS }
      - { name: EP2 receiver, link: "CRSF · SERIAL6" }
      - { name: Matek F405, note: ArduPilot }
  - title: Telemetry link
    nodes:
      - { name: Matek F405, link: "MAVLink · 57.6 kbaud UART" }
      - { name: ESP32, note: DroneBridge, link: UDP WiFi }
      - { name: Mission Planner }
hero:
  image: hero.jpg
  alt: Assembled quadcopter held in hand
  video: demo.mp4
  caption: Flight clip from testing.
media:
  - file: frame-wiring.jpg
    alt: Quadcopter frame laid flat with flight controller, four motors and wiring harness attached
    caption: Flight controller, motors, and harness before final assembly.
  - file: soldering.jpg
    alt: Soldering wiring on the quadcopter frame
    caption: Soldering the harness on the frame.
  - file: ground-station.jpg
    alt: Laptop running Mission Planner next to the UAV electronics on a bench
    caption: Mission Planner connected to the aircraft on the bench.
  - file: telemetry-screenshot.png   # Add a Mission Planner telemetry screenshot here
    alt: Mission Planner showing live telemetry from the aircraft
    caption: Live telemetry in Mission Planner.
    fit: contain
---

## Overview

Four of us built a multirotor at UC Irvine. A drone like this is several computers
that have to agree with each other: a handheld transmitter, a receiver, an autopilot, and a laptop
on the ground. I owned the links between them.

To be exact about scope: I configured, flashed, and debugged existing firmware. I did not write
flight control code, and I did not work on the motor speed controllers.

## My role

### Radio link

- Flashed ExpressLRS onto both the transmitter and the receiver, using EdgeTX passthrough over USB
  instead of a separate programmer.
- Bound the pair with a shared passphrase and verified two-way communication over CRSF.

### Autopilot serial configuration

- Remapped the flight controller's RX2/TX2 pins with `BRD_ALT_CONFIG=1` so ArduPilot handles CRSF
  on SERIAL6.
- Matched baud rates and protocol settings across the radio, the autopilot, and the ground station.
- Validated RSSI telemetry reporting.
- Configured the failsafe so the aircraft lands itself if the telemetry link drops.

### Telemetry

- Set up an ESP32 running DroneBridge as a telemetry bridge. It takes MAVLink from the flight
  controller over UART at 57,600 baud and forwards it over WiFi to Mission Planner, so we could
  watch the aircraft's state live from the ground.

### Sensor calibration

- Calibrated the battery current sensor. I compared measured against calculated current at several
  throttle levels and derived corrected gain and offset parameters.

## Debugging

Most failures were two devices disagreeing about a serial port: mismatched baud rates, the wrong
protocol selected on a UART, telemetry that dropped out. The method that worked was tracing the
signal one hop at a time, from transmitter to receiver to flight controller to ground station, and
finding the first hop where the data stopped looking right.

## Testing and result

We flew the aircraft multiple times, with testing in a flight cage, and used telemetry and flight
logs from those sessions to debug and tune the configuration.

## What I took from it

CRSF and MAVLink solve different problems, control and telemetry, and a working aircraft needs
both configured consistently at every hop. I learned to treat a link problem as a chain to walk,
not a setting to guess at.
