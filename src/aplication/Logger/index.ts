import { logger, consoleTransport } from "react-native-logs";

const defaultConfig = {
    levels: {
        debug: 0,
        info: 1,
        warn: 2,
        error: 3,
    },
    severity: "debug",
    transport: consoleTransport,
    transportOptions: {
        colors: {
            info: "blueBright",
            warn: "yellowBright",
            error: "redBright",
        },
        extensionColors: {
            root: "magenta",
            home: "grey",
            user: "blue",
        },
    },
    async: true,
    dateFormat: "time",
    printLevel: true,
    printDate: true,
    fixedExtLvlLength: false,
    enabled: true,
};

const log = logger.createLogger<"debug" | "info" | "warn" | "error">(defaultConfig);

export default log