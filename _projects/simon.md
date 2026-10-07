---
title: Bare-Metal Memory Game on an ATmega32
short_title: AVR Memory Game
tile_label: AVR-GAME
summary: >-
  A Simon-style memory game written in embedded C with no RTOS and no hardware abstraction layer:
  register-level GPIO, timer-based timing, a scanned keypad, an LCD, and audio from a single pin.
kind: Embedded project · Firmware
role: Firmware, schematic, and assembly
team: 2 people
timeline: Aug – Oct 2025
status: Complete
order: 2
featured: true
stack: [Embedded C, ATmega32, Bare-metal, Timers, Interrupts, GPIO, KiCad]
coursework: COMPSCI 145, Embedded Software
highlights:
  - GPIO configured directly through DDRx, PORTx, and PINx registers with bit masking.
  - Millisecond timing from Timer0 and its overflow flag instead of counted delay loops.
  - Interrupt-driven firmware around a non-blocking main loop so no peripheral holds the CPU.
specs:
  - { label: Hardware, value: "ATmega32, 4×4 matrix keypad, LEDs, character LCD, speaker" }
  - { label: Firmware, value: "Embedded C on bare metal. No RTOS, no HAL, no blocking delays" }
  - { label: Tools, value: "KiCad for the schematic" }
chains:
  - title: Peripherals
    nodes:
      - { name: Matrix keypad, note: row scan + debounce, link: GPIO in }
      - { name: ATmega32, note: "non-blocking loop · Timer0", link: GPIO out }
      - { name: "LCD · LEDs · speaker" }
hero:
  image: hero.jpg
  alt: Breadboard with an ATmega32, four LEDs, a character LCD showing the game title, a keypad and a speaker
  video: demo.mp4
  caption: A round of the game.
media:
  - file: schematic.jpg
    alt: KiCad schematic of the ATmega32 connected to the keypad, LEDs, LCD and speaker
    caption: Full schematic in KiCad.
    fit: contain
    wide: true
  - file: soldering.jpg
    alt: Soldering a component held in a helping-hands clamp
    caption: Soldering during assembly.
---

## Overview

A memory game: the system plays a sequence of lights and tones, and the player repeats it on a
keypad. The game is simple on purpose. The engineering problem is underneath it, which is running
a keypad, an LCD, LEDs, and audio at the same time on a small microcontroller, where each one has
different timing needs and none of them can be allowed to stall the others.

We wrote it in embedded C directly against the hardware. No operating system, no hardware abstraction
layer, no `delay()`.

## My role

I worked on this with one teammate. I wrote firmware, designed the full schematic in KiCad,
assembled the hardware, and debugged the timing and peripheral interactions until it ran reliably.

## How it works

### GPIO at the register level

Every pin is configured through the ATmega32's memory-mapped registers: `DDRx` sets direction,
`PORTx` drives outputs and enables pull-ups, and `PINx` reads inputs. Several peripherals share
each port, so every write uses bit masks to change only the bits it owns.

### Timing from a hardware timer

Delays come from Timer0 running off a prescaler. The code polls the overflow flag (`TOV0`) to
count milliseconds. Timing therefore depends on the crystal, not on how many instructions the
compiler happened to emit for a loop.

### Keypad scanning

The keypad is a row-column matrix. The firmware drives one row low at a time and reads the columns
to find a pressed key, then debounces in software to reject contact bounce.

### Audio without a PWM peripheral

Tones are square waves made by toggling one GPIO pin at a computed interval for the pitch.

## The hard part

The LCD, the speaker, and the keypad all want CPU time. The first straightforward version felt
sluggish and missed key presses, because whichever peripheral was being serviced blocked the rest.

The fix was structural. The firmware is interrupt-driven around a main loop that never blocks.
Each peripheral interaction is broken into short operations with a bounded run time, and the loop
sequences them in a fixed order. Game state lives in its own layer, separate from the hardware
drivers.

## Result

The game responds consistently to input and gives clear light and sound feedback. Because the game
logic is separated from the drivers, adding difficulty levels or new modes would not require
restructuring the firmware.

## What I took from it

Responsiveness on a small microcontroller is an architecture question. No single peripheral was
slow. The system was slow when any one of them was allowed to wait.
