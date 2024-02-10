class NewsSourcesError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'NewsSourcesError';
    }
}

class NewsSourceDosNotExistError extends NewsSourcesError {
    constructor(message: string) {
        super(`The source does not exist: ${message}`);
        this.name = 'NewsSourceDosNotExistError';
    }
}

class NewsSourcesTooManyError extends NewsSourcesError {
    constructor(message: string) {
        super(`The sources are too many: ${message}`);
        this.name = 'NewsSourcesTooManyError';
    }
}

export { NewsSourcesError, NewsSourceDosNotExistError, NewsSourcesTooManyError }