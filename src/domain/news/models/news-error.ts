class NewsError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'NewsError';
    }
}

class NewsAPIKeyError extends NewsError {
    constructor(message: string) {
        super(`An error associated with the NewsAPI api key occurred: ${message}`);
        this.name = 'NewsAPIKeyError';
    }
}

class NewsParametersError extends NewsError {
    constructor(message: string) {
        super(`Parameters used don't look right: ${message}`);
        this.name = 'NewsParametersError';
    }
}

class NewsRateLimited extends NewsError {
    constructor(message: string) {
        super(`The NewsAPI service has rate limited us: ${message}`);
        this.name = 'NewsParametersError';
    }
}

export { NewsError, NewsAPIKeyError, NewsParametersError, NewsRateLimited }