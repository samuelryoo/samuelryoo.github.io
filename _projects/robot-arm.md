---
title: Electrical System for a 4-DOF Robotic Arm
short_title: Robotic Arm
tile_label: ARM-4DOF
summary: >-
  Electrical lead on a 3-foot, 3D-printed robotic arm: stepper driver integration, power
  distribution, and the embedded control loop, with the motor supply kept apart from logic.
kind: Team project · ZotBotics at UCI
role: Electrical Systems Lead
team: 6 people
timeline: Jan – May 2025
status: Complete
order: 5
stack: [Arduino Mega 2560, RAMPS, TB6560, Stepper control, PWM, C/C++, Power distribution, Soldering]
highlights:
  - Owned motor drivers, power distribution, and embedded control for a six-person team.
  - Kept high-current motor wiring separate from the 5 V logic rail and filtered the AC inlet.
  - STEP/DIR pulse trains for the joints, PWM for the gripper, limit switches for safe travel.
specs:
  - { label: Hardware, value: "Arduino Mega 2560 with RAMPS shield, TB6560 stepper drivers, stepper joints, servo gripper, EMI-filtered AC inlet" }
  - { label: Firmware, value: "C/C++ control loop: STEP/DIR generation, PWM, limit-switch inputs" }
  - { label: Size, value: "About 3 ft tall, 4 degrees of freedom, 3D printed" }
chains:
  - title: Control
    nodes:
      - { name: Arduino Mega 2560, note: RAMPS shield, link: STEP / DIR }
      - { name: TB6560 drivers }
      - { name: Stepper joints }
  - title: Gripper and limits
    nodes:
      - { name: Limit switches, link: GPIO in }
      - { name: Arduino Mega 2560, link: PWM }
      - { name: Servo gripper }
hero:
  image: hero.jpg
  alt: The six-person ZotBotics team standing behind the finished robotic arm on a table
  caption: The team with the finished arm.
media:
  - file: drivers-power.jpg
    alt: Row of TB6560 stepper drivers wired to a power supply and breadboard on a workbench
    caption: TB6560 drivers and the motor supply during wiring.
  - file: gripper-bench.jpg
    alt: 3D-printed gripper on the bench wired to an Arduino and breadboard
    caption: Bench-testing the servo gripper.
  - file: motion-demo.mp4   # Add a video of the arm moving here
    alt: The robotic arm moving through its joints
    caption: Arm motion.
  - file: wiring-diagram.png   # Add power / wiring diagram here
    alt: Power and control wiring diagram for the arm
    caption: Power and control wiring.
    fit: contain
---

## Overview

Six of us in ZotBotics at UC Irvine built a 3D-printed robotic arm about three feet tall with
four degrees of freedom. Steppers drive the arm joints and servos drive the
gripper. The goal was motion that repeats reliably while the mechanical load changes.

## My role

I was the Electrical Systems Lead. I owned the motor driver integration, the power distribution
design, and the embedded control, and I did all of the wiring and soldering.

## Motor control

The arm uses two kinds of actuator with two kinds of control signal. The stepper joints take
STEP and DIR pulse trains through TB6560 drivers, and position depends on the timing of those
pulses. The gripper servos take PWM.

The control loop in C/C++ reads the limit switches, processes motion commands, and updates the
motor outputs on every pass without blocking, so the arm keeps checking its travel limits while it
moves. I tuned the motion in small steps to cut abrupt starts and overshoot, which matter on a
long arm.

## Power and noise

This was the core of the work. Stepper motors produce switching transients and inductive voltage
spikes. If those reach the logic supply, the microcontroller sees voltage dips and ground bounce
and starts behaving unpredictably.

- High-current motor supply lines are routed separately from the 5 V logic rail.
- The AC inlet has EMI filtering.
- Grounding is managed carefully to prevent ground bounce at the microcontroller.

## Trade-offs

Torque against speed on the steppers, current and thermal limits in the drivers, and keeping
jitter low enough for predictable motion.

## Result

The arm produced consistent, repeatable motion. The control and power design is modular enough to
build trajectory planning or kinematic control on top of it.

## What I took from it

Keeping power and logic apart is cheaper than debugging what happens when you don't. I used the
same reasoning a year later when I split the compute and actuator rails on a
[delivery robot payload]({{ '/projects/delivery-robot-payload/' | relative_url }}).
