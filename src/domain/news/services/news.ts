import { ApiNewsCategory, ApiNewsCountry, ApiNewsLanguage } from "ts-newsapi";
import NewsRemoteRepository from "../repositories/news-remote";
import News from "../models/news";
import { NewsError } from "../models/news-error";

type NewsServiceResponse = {
    news: News[]
    page: number
    pageSize: number
}

export default class NewsService {
    newsRemoteRepository: NewsRemoteRepository = new NewsRemoteRepository()
    shouldFallbackToMock: boolean = false
    onErrorOcurred?: (e: NewsError) => void

    constructor(onErrorOcurred?: (e: NewsError) => void, shouldFallbackToMock?: boolean) {
        this.onErrorOcurred = onErrorOcurred
        this.shouldFallbackToMock = shouldFallbackToMock ?? false
    }

    getTopHeadlinesForCountryAndCategory(country: ApiNewsCountry, category: ApiNewsCategory, page: number = 1, pageSize: number = 20): Promise<NewsServiceResponse> {
        return this.newsRemoteRepository.fetch({
            shouldFallbackToMock: this.shouldFallbackToMock,
            topHeadlines: {
                country,
                category,
                page,
                pageSize
            }
        })
            .then(news => ({ news, page, pageSize }))
            .catch(error => {
                if (this.onErrorOcurred) this.onErrorOcurred(error)
                return Promise.reject(error)
            })

    }

    getEverythingForQueryAndLanguage(query: string[], language: ApiNewsLanguage, page: number = 1, pageSize = 100): Promise<NewsServiceResponse> {
        const formattedQueryString = query?.filter(word => word.length > 3).join(' OR ')
        return this.newsRemoteRepository.fetch({
            shouldFallbackToMock: this.shouldFallbackToMock,
            everything: {
                q: formattedQueryString,
                language,
                page,
                pageSize,
            }
        })
            .then(news => ({ news, page, pageSize }))
            .catch(error => {
                if (this.onErrorOcurred) this.onErrorOcurred(error)
                return Promise.reject(error)
            })
    }

    getEverythingForQueryAndLanguageDated(from: string, to: string, query: string[], language: ApiNewsLanguage, page: number = 1, pageSize = 100): Promise<NewsServiceResponse> {
        const formattedQueryString = query?.filter(word => word.length > 3).join(' OR ')
        return this.newsRemoteRepository.fetch({
            shouldFallbackToMock: this.shouldFallbackToMock,
            everything: {
                q: formattedQueryString,
                language,
                from,
                to,
                page,
                pageSize,
            }
        })
            .then(news => ({ news, page, pageSize }))
            .catch(error => {
                if (this.onErrorOcurred) this.onErrorOcurred(error)
                return Promise.reject(error)
            })
    }
}