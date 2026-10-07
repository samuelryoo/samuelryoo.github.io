---
title: EMG-Controlled Robotic Hand
short_title: EMG Hand
tile_label: sEMG-01
summary: >-
  A forearm muscle signal closes a servo hand. Surface EMG is sampled and filtered in real time
  on a microcontroller. The design is done and the build is underway.
kind: Personal project · Biosignals
timeline: Aug 2026 – present
status: In progress
order: 2
featured: true
stack: [ESP32, sEMG, I²C, Real-time DSP, PWM, BLE]
facts:
  - "Signal chain: sEMG sensor, ADC over I²C, real-time filtering on an ESP32, servo output."
  - Separate servo supply and a single star ground keep motor noise out of the measurement.
  - Build in progress. No measured results yet.
glance:
  - { label: Role, value: "Sole designer and builder" }
  - { label: System, value: "Surface EMG acquisition, real-time filtering on an ESP32, servo actuation" }
  - { label: Design focus, value: "Keeping a very small biosignal clean next to servos that draw large current spikes" }
  - { label: Tools / interfaces, value: "ESP32, ADS1015 ADC over I²C, PWM, BLE, Python for live plotting" }
  - { label: Status, value: "Design complete. Assembly and bring-up in progress. No measured results yet" }
chains:
  - title: Signal chain
    nodes:
      - { name: MyoWare sEMG, note: raw output }
      - { name: ADS1015 ADC, link: I²C }
      - { name: ESP32, note: "bandpass · notch · rectify · envelope", link: PWM }
      - { name: Servo hand }
  - title: Telemetry
    nodes:
      - { name: ESP32, link: BLE }
      - { name: Python live plot }
# Media slots. Drop a file with the matching name into assets/projects/emg-hand/ and it appears.
hero:
  image: hero.jpg          # Add a photo of the hand and electronics here
  alt: Servo-driven hand with the EMG sensor and ESP32 electronics
  video: demo.mp4          # Add the demo video here once the hand responds to muscle input
  placeholder: Build in progress. Photos and a demo video go here once the hand responds to muscle input.
actions:
  - { label: Watch demo, file: demo.mp4 }
media:
  - file: bench-wiring.jpg  # Add wiring / breadboard photo here
    alt: ESP32, ADC and EMG sensor wired on the bench
    caption: Sensor, ADC and ESP32 on the bench.
  - file: signal-plot.png   # Add a screenshot of the live EMG plot here
    alt: Live plot of raw EMG and the computed envelope
    caption: Raw EMG and firmware envelope streamed over BLE.
    fit: contain
  - file: wiring-diagram.png   # Add system / wiring diagram here
    alt: Wiring diagram of the EMG hand
    caption: Wiring diagram.
    fit: contain
---

## Overview

Flex the forearm and a servo-driven hand closes. That is the whole behavior, and it is deliberately
small. What I actually want from this project is the platform underneath it: acquire a biosignal,
process it in real time on a microcontroller, and drive an actuator from the result. The same
architecture carries over to an EEG front end later, which is where my interest in brain-computer
interfaces is heading.

**This build is in progress.** The design below is complete and the parts are in hand.
Assembly and bring-up are underway, and I have not measured latency or accuracy yet, so this page
makes no performance claims.

## System

The MyoWare sensor's raw output goes to an ADS1015 ADC, which the ESP32 reads over I²C. The
firmware runs four stages on each sample: a bandpass filter, a 50/60 Hz notch, rectification, and
envelope detection. The envelope sets the servo angle. In this first version all finger servos
share one PWM channel, so the hand opens and closes as a unit.

EMG samples also stream over BLE to a Python script that plots them live, so I can see what the
filter chain is doing.

## Design decisions

**Two supplies, one ground point.** Servos pull large current spikes when they start moving. An
EMG front end is measuring a very small signal. If they share a rail, the spikes land directly in
the measurement. The ESP32, sensor, and ADC run from USB power and the ESP32's 3.3 V regulator. The
servos get their own 5 V supply with a 470 µF bulk capacitor, and the two sides meet at a single
star ground so servo return current cannot shift the sensor's reference.

**A mains notch at both 50 and 60 Hz.** Mains hum sits in the middle of the EMG band, and it is
50 Hz in some countries and 60 Hz in others. The filter covers both so the hand works wherever it
is demonstrated.

**An independent check on the firmware.** The MyoWare also has its own analog envelope output. I
route it to a second ADC channel and use it only as a reference: if my firmware envelope and the
hardware envelope disagree, the filter chain is wrong. That beats judging a filter by eye.

**Series resistors on the servo signal lines.** Each servo signal passes through 220 Ω, which
limits current if a pin is shorted or a servo input misbehaves.

## Status

| Stage | State |
|---|---|
| Design and wiring plan | Done |
| Parts in hand | Done |
| Soldering and assembly | In progress |
| Bench bring-up | Not started |
| End-to-end firmware | Not started |
| Measurements and demo | Not started |

## What comes next

Finish assembly, get the chain running end to end, then measure three things: envelope latency,
false-trigger rate, and actuation delay. Those numbers and a demo video go on this page when they
exist.
