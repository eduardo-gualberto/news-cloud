import { ApiNewsCategory, ApiNewsCountry, ApiNewsLanguage } from "ts-newsapi";
import NewsRemoteRepository from "../repositories/news-remote";
import News from "../models/news";

type NewsServiceResponse = {
    news: News[]
    page: number
    pageSize: number
}

export default class NewsService {
    newsRemoteRepository: NewsRemoteRepository = new NewsRemoteRepository()

    getTopHeadlinesForCountryAndCategory(country?: ApiNewsCountry, category?: ApiNewsCategory, page: number = 1, pageSize: number = 20): Promise<NewsServiceResponse> {
        return this.newsRemoteRepository.fetch({
            topHeadlines: {
                country,
                category,
                page,
                pageSize
            }
        })
            .then(news => ({ news, page, pageSize }))
    }

    getEverythingForQueryAndLanguage(query?: string[], language?: ApiNewsLanguage, page: number = 1, pageSize = 100): Promise<NewsServiceResponse> {
        const formattedQueryString = query?.filter(word => word.length > 3).join(' OR ')
        return this.newsRemoteRepository.fetch({
            everything: {
                q: formattedQueryString,
                language,
                page,
                pageSize,
            }
        })
            .then(news => ({ news, page, pageSize }))
    }

    getEverythingForQueryAndLanguageDated(from: string, to: string, query?: string[], language?: ApiNewsLanguage, page: number = 1, pageSize = 100): Promise<NewsServiceResponse> {
        const formattedQueryString = query?.filter(word => word.length > 3).join(' OR ')
        return this.newsRemoteRepository.fetch({
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
    }
}