import NewsAPI, { INewsApiTopHeadlinesParams, INewsApiEverythingParams, INewsApiResponse, INewsApiArticle } from 'ts-newsapi'
import BaseRepository from '../../shared/BaseRepository';
import News from '../models/news';
import { NewsError, NewsAPIKeyError, NewsParametersError, NewsRateLimited } from '../models/news-error';

type ParamType = {
    everything?: INewsApiEverythingParams
    topHeadlines?: INewsApiTopHeadlinesParams
    shouldFallbackToMock?: boolean
}

export default class NewsRemoteRepository extends BaseRepository<ParamType, News[]> {
    static newsApi = new NewsAPI(process.env.EXPO_PUBLIC_NEWSAPI_KEY ?? "")
    shouldFallbackToMock: boolean = false

    async fetch(param: ParamType): Promise<News[]> {
        this.shouldFallbackToMock = param.shouldFallbackToMock ?? false
        if (param.everything)
            return this._fetchEverything(param.everything)

        if (param.topHeadlines)
            return this._fetchTopHeadlines(param.topHeadlines)

        return []
    }

    async _fetchEverything(param: INewsApiEverythingParams): Promise<News[]> {
        return NewsRemoteRepository.newsApi.getEverything(param)
            .then(response => this._handleAPIResponse(response))
            .then(articles => News.fromApiResponse(articles))
            .catch(error => {
                if (this.shouldFallbackToMock) return News.fromMock()
                throw error
            })
    }

    async _fetchTopHeadlines(param: INewsApiTopHeadlinesParams): Promise<News[]> {
        return NewsRemoteRepository.newsApi.getTopHeadlines(param)
            .then(response => this._handleAPIResponse(response))
            .then(articles => News.fromApiResponse(articles))
            .catch(error => {
                if (this.shouldFallbackToMock) return News.fromMock()
                throw error
            })
    }

    _handleAPIResponse(response: INewsApiResponse & { message?: string }): INewsApiArticle[] {
        if (response.status === "ok") return response.articles

        const { code, message } = response

        if (code === "apiKeyDisabled" || code === "apiKeyExhausted" || code === "apiKeyInvalid" || code === "apiKeyMissing")
            throw new NewsAPIKeyError(message ?? "An error occurred with the NewsAPI api key")

        if (code === "parameterInvalid" || code === "parametersMissing" || code === "parameterUnSupported"
            || code === "sourcesTooMany" || code === "sourceDoesNotExist")
            throw new NewsParametersError(message ?? "An error occurred with the parameters used")

        if (code === "rateLimited")
            throw new NewsRateLimited(message ?? "The NewsAPI service has rate limited us")

        throw new NewsError(message ?? "An error occurred with the NewsAPI service")
    }
}