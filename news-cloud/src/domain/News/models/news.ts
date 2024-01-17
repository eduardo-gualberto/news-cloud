import { INewsApiArticle, INewsApiResponse, INewsApiSource } from "ts-newsapi";

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

    static fromApiResponse(response: INewsApiResponse): News[] {
        if (response.status === "error") return []
        if (response.totalResults === 0) return []

        return response.articles.map(article => new News(article))
    }

}