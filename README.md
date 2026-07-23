# osc-tools

Command line tools for sending and receiving Open Sound Control messages.

## Install

npm install -g osc-tools

## Usage

oscsend localhost 9000 /test i:1

oscreceive 9000

## Dependencies

This package uses the `osc` npm package for Open Sound Control UDP message handling.