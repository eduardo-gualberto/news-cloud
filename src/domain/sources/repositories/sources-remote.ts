import BaseRepository from "@Domain/shared/BaseRepository";
import NewsAPI, { INewsApiSourceParams } from "ts-newsapi";
import Sources from "../models/sources";

type ParamType = INewsApiSourceParams

export default class SourcesRemoteRepository extends BaseRepository<ParamType, Sources[]> {
    static newsApi = new NewsAPI(process.env.EXPO_PUBLIC_NEWSAPI_KEY ?? "")

    async fetch(param: ParamType): Promise<Sources[]> {
        return SourcesRemoteRepository.newsApi.getSources(param)
            .then(response => Sources.fromApiResponse(response))
    }
}
