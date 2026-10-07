---
title: RV32I Single-Cycle Processor
short_title: RISC-V CPU
tile_label: RV32I
summary: >-
  A modular single-cycle RISC-V processor in Verilog with separate datapath and control, verified
  by a self-checking testbench across 20 instruction cases.
kind: Digital design
role: Designer
timeline: Mar – Jun 2025
status: Complete
status_note: Verified in simulation. Not synthesized
order: 6
stack: [Verilog, Vivado, RV32I, Testbenches, Computer architecture]
highlights:
  - Datapath and control unit kept as separate modules with stable interfaces.
  - Self-checking testbench with automated pass/fail on a 20 ns clock.
  - 20 instruction cases verified across R-type, I-type, load, and store.
specs:
  - { label: Design, value: "Program counter, register file, ALU, memory interfaces, control unit" }
  - { label: Verification, value: "Unit and integration testbenches, self-checking, 20 ns clock" }
  - { label: Tools, value: "Verilog, Vivado" }
chains:
  - title: Instruction path, one clock cycle
    nodes:
      - { name: Fetch, note: program counter }
      - { name: Decode, note: control + immediates }
      - { name: Execute, note: ALU }
      - { name: Write back, note: register file / memory }
hero:
  image: hero.jpg
  alt: Vivado simulation waveform showing processor control signals and register values over time
  caption: Simulation waveform in Vivado.
media:
  - file: datapath-diagram.png   # Add a datapath / block diagram here
    alt: Block diagram of the single-cycle datapath and control unit
    caption: Datapath and control block diagram.
    fit: contain
    wide: true
---

## Overview

A single-cycle RISC-V (RV32I) processor written in Verilog. Each instruction completes in one
clock cycle. The aim was a correct baseline with clean module boundaries that could later be
extended, not the fastest possible design.

## Architecture

**Datapath.** Program counter, register file, ALU, and memory interfaces, supporting the full
fetch, decode, execute, and write-back sequence.

**Control unit.** Decodes each opcode into control signals for that instruction type. It handles
immediate generation, ALU operation selection, condition flags, and branch evaluation.

**Timing.** Every instruction finishes in one cycle, so the clock period is set by the longest
combinational path through the datapath. That is the central trade-off of a single-cycle machine
and the reason pipelining is the natural next step.

## Verification

- Unit testbenches for individual modules and integration testbenches for the assembled processor
- A self-checking testbench with its own instruction memory and automated pass/fail checks, so
  results do not depend on reading waveforms by eye
- 20 instruction cases covering R-type, I-type, `LW`, and `SW`, on a 20 ns clock
- Waveform analysis as the main debugging tool for control signals, branch logic, and register
  write-back

All test cases pass.

## The hard part

Signed arithmetic edge cases, specifically overflow and borrow propagation. I resolved them through
waveform-level timing analysis and repeated verification, without changing the interfaces between
modules.

## Limits

This design is verified in simulation only. I have not synthesized it, so I make no claims about
maximum clock frequency, resource usage, or operation on an FPGA.
