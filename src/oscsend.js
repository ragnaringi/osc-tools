#!/usr/bin/env node

import osc from "osc";
import { parseArg } from "./osc-utils.js";

function sendOSC(host, port, message) {
    return new Promise((resolve, reject) => {
        const udp = new osc.UDPPort({
            localAddress: "0.0.0.0",
            localPort: 0,
            remoteAddress: host,
            remotePort: port
        });

        udp.on("ready", () => {
            try {
                udp.send(message);

                // Give UDP time to flush before closing
                setTimeout(() => {
                    udp.close();
                    resolve();
                }, 50);

            } catch (err) {
                udp.close();
                reject(err);
            }
        });

        udp.on("error", err => {
            reject(err);
        });

        udp.open();
    });
}

async function main() {
    const [, , host, portArg, address, ...args] = process.argv;

    if (!host || !portArg || !address) {
        console.log(
            "Usage: oscsend <host> <port> <address> [args...]"
        );
        process.exit(1);
    }

    const port = Number(portArg);

    const message = {
        address,
        args: args.map(parseArg),
        metadata: true
    };

    await sendOSC(host, port, message);
}

main().catch(err => {
    console.error(err.message);
    process.exit(1);
});