#!/usr/bin/env node

import osc from "osc";
import { formatArg } from "./osc-utils.js";

function usage() {
    console.log(`
Usage:
  oscreceive <port>

Example:
  oscreceive 9000
`);
    process.exit(1);
}

function main() {
    const [, , portArg] = process.argv;

    if (!portArg) {
        usage();
    }

    const port = Number(portArg);

    const udp = new osc.UDPPort({
        localAddress: "0.0.0.0",
        localPort: port,
        metadata: true
    });

    udp.on("ready", () => {
        console.log(`Listening on UDP ${port}`);
    });

    udp.on("message", message => {
        const args = (message.args || [])
            .map(formatArg)
            .join(" ");

        console.log(
            `${message.address}${args ? " " + args : ""}`
        );
    });

    udp.on("error", err => {
        console.error(err.message);
        process.exit(1);
    });

    udp.open();
}

main();