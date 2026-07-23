
export function formatArg(arg) {
    switch (arg.type) {
        case "i":
            return `i:${arg.value}`;

        case "f":
            return `f:${arg.value}`;

        case "s":
            return `s:${arg.value}`;

        case "T":
            return "T";

        case "F":
            return "F";

        case "N":
            return "N";

        case "I":
            return "I";

        case "b":
            return `b:${Buffer.from(arg.value).toString("hex")}`;

        default:
            return `${arg.type}:${arg.value}`;
    }
}

export function parseArg(arg) {
    if (arg === "T") {
        return {
            type: "T",
            value: true
        };
    }

    if (arg === "F") {
        return {
            type: "F",
            value: false
        };
    }

    if (arg === "N") {
        return {
            type: "N",
            value: null
        };
    }

    if (arg === "I") {
        return {
            type: "I",
            value: 1
        };
    }

    if (arg.startsWith("i:")) {
        return {
            type: "i",
            value: Number.parseInt(arg.slice(2), 10)
        };
    }

    if (arg.startsWith("f:")) {
        return {
            type: "f",
            value: Number.parseFloat(arg.slice(2))
        };
    }

    if (arg.startsWith("s:")) {
        return {
            type: "s",
            value: arg.slice(2)
        };
    }

    throw new Error(`Unknown argument: ${arg}`);
}