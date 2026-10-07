---
title: Payload Power and Actuation for a Delivery Robot
short_title: Delivery Robot Payload
tile_label: PWR-DIST
summary: >-
  Power architecture, two power-distribution PCB revisions, and stepper motor control for the
  sensor and compute payload of an autonomous delivery robot.
kind: Internship · Refined Robotics
role: Hardware Engineering Intern
team: Worked alongside the mechanical team
timeline: Jun – Sep 2026
status: Complete
status_note: Rev A released to fabrication · Rev B design complete
order: 1
featured: true
stack: [KiCad, PCB design, Power distribution, STM32G031, INA3221, I²C, UART, Arduino, DRV8825, Stepper control]
highlights:
  - Split payload power into separate compute and actuator rails so motor switching noise stays off the sensors.
  - Designed a 2-layer distribution PCB in KiCad (ERC and DRC clean) and released it for fabrication and assembly.
  - Designed a second revision that measures voltage and current on every output branch.
specs:
  - { label: Hardware, value: "Two 24 V → 12 V buck converters, custom distribution PCB, DRV8825 drivers, NEMA17 steppers" }
  - { label: Firmware, value: "Arduino motor control (STEP/DIR/EN), commands over USB serial" }
  - { label: Interfaces, value: "I²C, UART, USB, Ethernet, GMSL2" }
  - { label: Tools, value: "KiCad, JLCPCB fabrication and assembly" }
chains:
  - title: Power — compute rail
    nodes:
      - { name: 24 V, note: robot base battery }
      - { name: Buck converter, link: 12 V }
      - { name: Distribution PCB, note: 3-stage decoupling }
      - { name: Five loads, note: "compute, LiDAR ×2, router, USB" }
  - title: Power — actuator rail
    nodes:
      - { name: 24 V, note: robot base battery }
      - { name: Buck converter, note: "8 A continuous", link: 12 V }
      - { name: DRV8825 ×3 }
      - { name: NEMA17 ×3, note: "two shutters, one tray" }
  - title: Motor control
    nodes:
      - { name: Onboard computer, link: USB serial }
      - { name: Arduino Uno R4, link: STEP / DIR / EN }
      - { name: DRV8825 ×3 }
      - { name: Stepper axes }
  - title: Rev B telemetry path (designed, not yet built)
    nodes:
      - { name: Kelvin shunts ×5, note: one per branch }
      - { name: INA3221 ×2, link: I²C }
      - { name: STM32G031, link: UART }
      - { name: Onboard computer }
# Media slots. Drop a file with the matching name into assets/projects/delivery-robot-payload/
# and it appears on the page. Slots without a file stay hidden.
hero:
  image: hero.jpg          # Add a photo of the payload or the assembled board here
  alt: Sensor and compute payload with the power distribution board installed
media:
  - file: pcb-rev-a.jpg     # Add PCB photo here
    alt: Assembled Rev A power distribution board
    caption: Rev A power distribution board, 27 × 69 mm.
  - file: pcb-rev-a-layout.png   # Add KiCad layout screenshot here
    alt: KiCad layout of the Rev A board
    caption: Rev A layout in KiCad.
    fit: contain
  - file: pcb-rev-b-schematic.png   # Add Rev B schematic screenshot here
    alt: Rev B schematic showing shunts, current monitors and the microcontroller
    caption: Rev B schematic with per-branch current sensing.
    fit: contain
    wide: true
  - file: wiring.jpg        # Add wiring / harness photo here
    alt: Payload wiring harness and connectors
    caption: Payload harness and connectors.
  - file: mechanism-demo.mp4   # Add delivery mechanism video here
    alt: Stepper-driven delivery mechanism moving
    caption: Stepper-driven shutters and tray.
---

## Overview

Refined Robotics is building an autonomous last-mile delivery robot: a legged base that carries a
sensor and compute payload plus a delivery box with two shutters and a tray. The base provides 24 V
battery power, and everything on the payload has to run from it.

I worked on the electrical side of that payload, on site in Tokyo for the summer and then remotely
through September. The work fell into four
parts: how power is split and distributed, the circuit board that does the distributing, the motors
that move the delivery box, and getting the sensors and computer physically connected and powered.

## My role

- Re-architected payload power into two isolated 12 V rails and built the load budget for each.
- Designed two revisions of a power distribution PCB in KiCad.
- Selected the stepper motors and drivers for the delivery mechanism and wrote the Arduino
  firmware that drives them.
- Integrated LiDAR, stereo cameras, GNSS, and the onboard computer at the hardware level: power,
  connectors, harnessing, and the Ethernet, USB, and GMSL2 links.

The motor-control code is the one piece of software I wrote here. The perception stack and the
software on the onboard computer belonged to other people.

## Power architecture

Stepper drivers chop current at high frequency, and that noise travels back along whatever supply
they share. The cameras and LiDARs are the last things that should see it. So the payload runs on
two separate 12 V rails, each from its own buck converter off the 24 V input:

| Rail | Feeds | Typical | Peak |
|---|---|---|---|
| Compute | Onboard computer, two LiDARs, 5G router, USB hub, Arduino | ~3.3 A | ~4.85 A |
| Actuator | Three stepper drivers only | ~1.4 A (two motors moving) | ~2.0 A |

The actuator rail has plenty of headroom on an 8 A converter. The compute rail does not: the
computer also powers both stereo cameras over coax, so its datasheet figure understates what it
really draws under load. I flagged that margin and proposed two fixes, either a larger converter
or moving the LiDARs and router straight onto 24 V, which both accept.

## Distribution PCB, Rev A

Rev A takes 12 V from the compute-rail converter and fans it out to five loads.

- 27 × 69 mm, 2-layer, 1.6 mm FR-4, 1 oz copper, parts on one side for a single assembly pass
- JST VH 3.96 mm connectors on all eight ports: rated for 10 A, keyed against reversal, and one
  crimp system for the whole robot
- Three-stage decoupling: 100 nF ceramic, 10 µF ceramic, 220 µF electrolytic
- E-stop input and status LED broken out on a shrouded, keyed 2×5 header to the computer's GPIO
- ERC and DRC clean with zero violations, then released to JLCPCB for fabrication and assembly

### Decisions worth explaining

**A ceramic for the middle capacitor, not a second electrolytic.** An electrolytic stops behaving
like a capacitor around 100 kHz because of its ESR and ESL. Putting a 10 µF electrolytic beside a
220 µF one just gives a smaller copy of the same impedance curve. The ceramic covers the band
between where the bulk capacitor rolls off and where the 100 nF takes over.

**A series resistor on the status LED.** The original schematic ran a GPIO pin straight into the
LED with no current limit. I added the resistor on the GPIO side of the connector, so a short in
the LED harness is limited too.

**Shrouded connectors.** A plain header can be plugged in rotated 180°, which would connect a
3.3 V output to a GPIO output. Keying removes that failure.

**Non-plated mounting holes.** Chassis screws do not tie board ground to the frame, which removes
one ground-loop path.

### What went wrong along the way

Three mistakes from the Rev A build that I now check for: duplicated footprints caused by broken
symbol-to-footprint links, a stale track that quietly bypassed a resistor, and a surface-mount part
assigned to a through-hole footprint.

## Distribution PCB, Rev B

Rev A is a passive splitter. It has no per-branch protection and no way to know what each load is
drawing, and you cannot fuse what you cannot measure. Rev B adds measurement:

| Added | Detail |
|---|---|
| Per-branch current sensing | Five 4-terminal Kelvin shunts, two INA3221 three-channel monitors |
| Microcontroller | STM32G031 reading the monitors over I²C, reporting to the computer over UART |
| Local 3.3 V rail | On-board regulator, where Rev A borrowed 3.3 V from the computer |
| Status | Addressable RGB LED driven by the microcontroller |
| Debug and expansion | SWD programming header, CAN breakout |

Each shunt is sized against the INA3221's ±163.8 mV full-scale input so the range fits its load:

| Branch | Shunt | Full-scale current |
|---|---|---|
| Onboard computer | 10 mΩ | ~16.4 A |
| LiDAR (each of two) | 50 mΩ | ~3.3 A |
| USB port | 50 mΩ | ~3.3 A |
| 5G router | 20 mΩ | ~8.2 A |

With current sensing next to a controller, a high-side switch on each branch would give
programmable electronic fusing. That is the natural next step for the board.

## Delivery mechanism

The original mechanism used servos running open loop, with no positional feedback. I replaced
it with three stepper axes and co-developed the assembly with the mechanical team.

- **Motors:** NEMA17, 42 N·cm holding torque, 1.5 A per phase, 1.8° per step
- **Drivers:** DRV8825, with 100 µF and 0.1 µF decoupling at each driver's motor supply pin
- **Controller:** Arduino Uno R4 generating STEP, DIR, and EN, taking motion commands over USB serial

Two details shaped the power budget. The lead screws have a small enough lead that they cannot be
back-driven, so the drivers can be disabled at rest and idle current drops to nearly zero.
And a chopper driver does not pull phase current from the supply: each motor draws about 0.7 A from
the rail, not 1.5 A, so two motors moving together need about 1.4 A.

## E-stop input

I wired the e-stop sense loop into the computer's GPIO and added a 10 kΩ pull-down so the pin reads
a defined LOW when the loop opens instead of floating.

## Result

- Payload power split into two isolated rails with a documented load budget for each.
- Rev A board designed, checked, and released for fabrication and assembly.
- Rev B design complete. It had not been fabricated or brought up when my internship ended, so
  there are no measured results to report for it.
- Servo mechanism replaced with three stepper axes, driven by Arduino firmware I wrote.

## What I took from it

Most of the hard problems here were about what shares a wire with what. Separating noisy loads
from sensitive ones, choosing connectors that cannot be plugged in wrong, and knowing the real
current on each branch mattered more than any single component choice.
