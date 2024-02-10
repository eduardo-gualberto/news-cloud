import { INewsApiSourceItem, INewsApiSourcesResponse } from "ts-newsapi";
import sourcesMock from "./mock";

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

    static fromApiResponse(response: INewsApiSourceItem[]): Sources[] {
        return response.map(source => new Sources(source))
    }

    static fromMock(): Sources[] {
        return (sourcesMock as INewsApiSourcesResponse).sources.map(source => new Sources(source))
    }
}