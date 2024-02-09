import { INewsApiSourceItem, INewsApiSourcesResponse } from "ts-newsapi";
import sourcesMock from "./mock";
import logger  from "@Aplication/Logger";

const defaults = {
    "id": "",
    "name": "",
    "description": "",
    "url": "",
    "category": "",
    "language": "",
    "country": ""
}

export default class Sources {
    id: string;
    name: string;
    description: string;
    url: string;
    category: string;
    language: string;
    country: string;

    constructor(json: INewsApiSourceItem) {
        this.id = json.id
        this.name = json.name
        this.description = json.description
        this.url = json.url
        this.category = json.category
        this.language = json.language
        this.country = json.country
    }

    static fromApiResponse(response: INewsApiSourcesResponse  & { message?: string }): Sources[] {
        const loggr = logger.extend('Sources.fromApiResponse')     
        if (response.code === "rateLimited") {
            loggr.warn(`NewsAPI imposed a rate limit for the app, using a mock instead.`)
            return sourcesMock.sources.map(source => new Sources(source as INewsApiSourceItem))
        }
        if (response.status === "error") {
            loggr.error(`API error: ${response.message!}. Using a mock instead.`)
            return sourcesMock.sources.map(source => new Sources(source as INewsApiSourceItem))
        }
        if (response.sources.length === 0) {
            loggr.warn(`No results found.`)
            return []
        }
        return response.sources.map(source => new Sources(source))
    }

    static fromMock(): Sources[] {
        return (sourcesMock as INewsApiSourcesResponse).sources.map(source => new Sources(source))
    }
}