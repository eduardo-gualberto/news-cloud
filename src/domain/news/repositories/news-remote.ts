import NewsAPI, { INewsApiTopHeadlinesParams, INewsApiEverythingParams, INewsApiResponse } from 'ts-newsapi'
import BaseRepository from '../../shared/BaseRepository';
import News from '../models/news';

type ParamType = {
    everything?:  INewsApiEverythingParams
    topHeadlines?: INewsApiTopHeadlinesParams
}

export default class NewsRemoteRepository extends BaseRepository<ParamType, News[]> {
    static newsApi = new NewsAPI(process.env.EXPO_PUBLIC_NEWSAPI_KEY ?? "")

    async fetch(param: ParamType): Promise<News[]> {
        if(param.everything)
            return NewsRemoteRepository.newsApi.getEverything(param.everything)
                .then(response => News.fromApiResponse(response))
        
        if(param.topHeadlines)
            return NewsRemoteRepository.newsApi.getTopHeadlines(param.topHeadlines)
            .then(response => News.fromApiResponse(response))

        return []
    }
}