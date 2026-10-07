---
title: CMOS NAND Gate Sizing and Characterization
short_title: CMOS NAND
tile_label: NAND2
summary: >-
  Transistor-level design of a CMOS NAND gate in Cadence Virtuoso: sized to center the switching
  threshold, then characterized for delay across supply voltage and temperature.
kind: Course project · IC design
role: Designer
timeline: Oct – Dec 2025
status: Complete
status_note: Schematic-level simulation. No layout
order: 7
stack: [Cadence Virtuoso, CMOS, Parametric analysis, Device sizing, Delay characterization]
coursework: CSE 112, Electronic Devices and Circuits
highlights:
  - "Swept PMOS width from 100 to 200 nm and set a 1.35:1 PMOS-to-NMOS ratio to center the threshold at VDD/2."
  - "Delay fell 34% as VDD rose from 0.8 to 1.2 V."
  - "Delay rose 65% from 0 to 90 °C."
specs:
  - { label: Device sizes, value: "L = 50 nm. NMOS W = 100 nm, PMOS W = 135 nm" }
  - { label: Sweeps, value: "VDD 0.8–1.2 V in 0.05 V steps. Temperature 0–90 °C in 5 °C steps" }
  - { label: Tools, value: "Cadence Virtuoso, parametric and transient analysis" }
hero:
  image: hero.jpg
  alt: Cadence Virtuoso schematic of the CMOS NAND gate with PMOS pull-up and NMOS pull-down transistors
  caption: NAND schematic in Virtuoso.
media:
  - file: pmos-sweep.jpg
    alt: Family of voltage transfer curves from the PMOS width parametric sweep
    caption: Parametric sweep of PMOS width, 100 to 200 nm.
    fit: contain
    wide: true
  - file: delay-vs-vdd.jpg
    alt: Plot of average propagation delay falling as supply voltage rises from 0.8 to 1.2 volts
    caption: Propagation delay against supply voltage.
    fit: contain
  - file: delay-vs-temperature.jpg
    alt: Plot of average propagation delay rising with temperature from 0 to 90 degrees Celsius
    caption: Propagation delay against temperature.
    fit: contain
---

## Overview

I designed a two-input CMOS NAND gate at the transistor level, chose the device sizes, and measured
how its speed changes with supply voltage and temperature. Everything here is schematic-level
simulation in Cadence Virtuoso. There is no layout.

## Design

The gate has a PMOS pull-up network and an NMOS pull-down network. I verified it against the full
truth table with transient waveform analysis. Both device types started at L = 50 nm and W = 100 nm.

## Sizing

Holes move more slowly than electrons, so a PMOS transistor the same size as an NMOS pulls up more
weakly than the NMOS pulls down. That shifts the switching threshold away from the middle of the
supply range.

I used Virtuoso's parametric analysis to sweep PMOS width from 100 to 200 nm across 10 values. The
switching threshold crossed VDD/2 at a width of 133.33 nm. I chose 135 nm as the implementation
value, for a final PMOS-to-NMOS width ratio of **1.35 : 1**.

## Delay characterization

Delay is reported as t<sub>pd</sub> = (t<sub>pHL</sub> + t<sub>pLH</sub>) / 2.

### Supply voltage

| VDD (V) | t<sub>pHL</sub> (ps) | t<sub>pLH</sub> (ps) | t<sub>pd</sub> (ps) |
|---|---|---|---|
| 0.80 | 14.09 | 9.50 | 11.80 |
| 0.90 | 12.08 | 8.34 | 10.21 |
| 1.00 | 10.75 | 7.55 | 9.15 |
| 1.10 | 9.82 | 6.95 | 8.39 |
| 1.20 | 9.12 | 6.49 | 7.80 |

Delay falls 34% from 0.8 V to 1.2 V. Higher gate overdrive means more drive current. The cost is
dynamic power, which scales with VDD².

### Temperature

| Temp (°C) | t<sub>pHL</sub> (ps) | t<sub>pLH</sub> (ps) | t<sub>pd</sub> (ps) |
|---|---|---|---|
| 0 | 9.15 | 6.59 | 7.87 |
| 25 | 10.62 | 7.47 | 9.05 |
| 50 | 12.34 | 8.48 | 10.41 |
| 75 | 14.25 | 9.65 | 11.95 |
| 90 | 15.49 | 10.41 | 12.95 |

Delay rises 65% from 0 °C to 90 °C as carrier mobility degrades.

## What the data shows

Centering the threshold did not equalize the two transitions. The high-to-low delay is about 1.4
times the low-to-high delay at every operating point. That is expected for a NAND: the pull-down
path is two NMOS transistors in series, while the pull-up is two PMOS in parallel. I sized for a
centered threshold, and the series-stack asymmetry remains in the delay.

## Limits

Schematic-level only. No layout, DRC, LVS, or parasitic extraction, so real delays would differ.
