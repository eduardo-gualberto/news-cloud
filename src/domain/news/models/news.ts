import { INewsApiArticle, INewsApiResponse, INewsApiSource } from "ts-newsapi";
import logger from "../../../aplication/Logger";
import newsMock from './mock'

const defaults = {
    source: <INewsApiSource>{
        id: "",
        name: "source name not identified"
    },
    author: "author not identified",
    title: "",
    description: "",
    url: "",
    urlToImage: "https://picsum.photos/200",
    publishedAt: "",
    content: ""
}

export default class News {
    source: INewsApiSource;
    author: string;
    title: string;
    description: string;
    url: string;
    urlToImage: string;
    publishedAt: string;
    content: string;

    constructor(json: INewsApiArticle) {
        this.source = json.source
        this.author = json.author ?? defaults.author
        this.content = json.content ?? defaults.content
        this.description = json.description ?? defaults.description
        this.publishedAt = json.publishedAt
        this.title = json.title
        this.url = json.url
        this.urlToImage = json.urlToImage ?? defaults.urlToImage
    }

    static fromApiResponse(response: INewsApiResponse & { message?: string }): News[] {  
        const loggr = logger.extend('News.fromApiResponse')     
        if (response.code === "rateLimited") {
            loggr.warn(`NewsAPI imposed a rate limit for the app, using a mock instead.`)
            return newsMock.articles.map(article => new News(article))
        }
        if (response.status === "error") {
            loggr.error(`API error: ${response.message!}. Using a mock instead.`)
            return newsMock.articles.map(article => new News(article))
        }
        if (response.totalResults === 0) {
            loggr.warn(`No results found. Using a mock instead.`)
            return newsMock.articles.map(article => new News(article))
        }

        return response.articles.map(article => new News(article))
    }

}