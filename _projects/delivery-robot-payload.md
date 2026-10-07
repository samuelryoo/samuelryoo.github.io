---
title: Electronics for an Autonomous Delivery Robot
short_title: Delivery Robot Electronics
tile_label: REFINED · TOKYO
summary: >-
  A hardware internship in Tokyo: power distribution, PCB design, and motor integration for the
  electronics of an autonomous delivery robot.
kind: Internship · Refined Robotics
timeline: Jun – Sep 2026
status: Complete
order: 1
featured: true
stack: [KiCad, PCB design, Power distribution, Motor control, I²C, UART]
facts:
  - Designed two revisions of a power distribution PCB in KiCad.
  - First revision released for fabrication and assembly.
  - Wrote the motor-control firmware for a stepper-driven mechanism.
glance:
  - { label: Role, value: "Hardware Engineering Intern, Refined Robotics, Tokyo" }
  - { label: System, value: "Electronics of an autonomous last-mile delivery robot" }
  - { label: My contribution, value: "Power distribution, PCB design across two revisions, motor integration and firmware, hardware integration of sensors and compute" }
  - { label: Tools / interfaces, value: "KiCad, Arduino (C/C++), I²C, UART, USB serial" }
  - { label: Result, value: "First board revision released for fabrication and assembly. Second revision design completed" }
# This is company work. Keep this page high-level: no current budgets, part numbers,
# board dimensions, pinouts, schematics, or anything that describes how the system is built.
proprietary: Company work. Source and design files are not public, and selected technical details have been omitted due to the proprietary nature of the work.
hero:
  image: hero.jpg          # Only add a photo here with the company's approval
  alt: Electronics hardware from the delivery robot internship
  placeholder: Hardware photos and design files from this internship are not public.
media:
  - file: workbench.jpg     # Only add photos here with the company's approval
    alt: Workbench during the internship
    caption: At the bench in Tokyo.
---

## Overview

Refined Robotics is building an autonomous last-mile delivery robot. I spent the summer of 2026
on site in Tokyo as a hardware engineering intern, then continued remotely through September. I
worked on the robot's electronics: how they are powered, the circuit board that distributes that
power, the motors that move its delivery mechanism, and the physical integration of its sensors
and onboard computer.

## What I worked on

### Power distribution

I reworked how the robot's electronics are powered so that the motors and the sensing and compute
electronics no longer share a supply. Motor drivers put switching noise on whatever they share
power with, and sensors are the last things that should see it. I built a load budget for each
side and flagged where the margin was thin.

### PCB design

I designed a power distribution board in KiCad, from schematic capture through layout, electrical
and design rule checks, component selection, and release for fabrication and assembly.

I then designed a second revision that adds measurement: the board senses current and voltage on
its outputs, a small on-board microcontroller collects the readings over I²C, and it reports them
to the robot's main computer over UART. My work on this revision was the hardware design. It was
a completed design when my internship ended and had not yet been built or tested, so I have no
measured results to report for it.

### Motor integration

The robot's delivery mechanism originally used servos running open loop, with no position
feedback. I replaced that with stepper motors: I selected the motors and drivers, worked out the
assembly with the mechanical team, and wrote the Arduino firmware that drives them from commands
sent by the main computer over USB serial. This firmware is the one piece of software I wrote
during the internship.

### Hardware integration

I integrated the robot's sensors and onboard computer at the hardware level: power, connectors,
wiring harnesses, and data links. The perception software and everything running on the main
computer belonged to other engineers.

## How I worked

- **Checks before release.** The first board passed electrical and design rule checks with zero
  violations before it went out for fabrication.
- **Design for mistakes.** I chose keyed connectors so a cable cannot be plugged in reversed, and
  added current limiting where a wiring fault could otherwise damage a pin.
- **Bring-up and debugging.** I wired and assembled the hardware and debugged it on the bench.
  One example: an input that floated whenever its circuit opened, fixed with a pull-down resistor.
- **Documentation.** I wrote up the electrical design, including its known limitations, so the
  next engineer would not have to rediscover them.
- **Iteration.** The second revision exists because of what the first one could not do: a board
  cannot protect a load it cannot measure.

## What went wrong along the way

The first revision taught me three checks I now run on every board: confirm each schematic symbol
is linked to the footprint I think it is, look for stale tracks left behind after edits, and
verify that a part's package matches its footprint before ordering.

## Result

- Power for the motors separated from power for sensing and compute, with a documented load budget.
- First board revision designed, checked, and released for fabrication and assembly.
- Second board revision designed, adding per-output current and voltage monitoring.
- Servo mechanism replaced with stepper motors driven by firmware I wrote.

## What I took from it

This was hardware for a real product, with other engineers depending on it.
Most of the hard problems were about what shares a wire with what: keeping noisy loads away from
sensitive ones, choosing connectors that cannot be plugged in wrong, and knowing the real current
on each output mattered more than any single component choice.
