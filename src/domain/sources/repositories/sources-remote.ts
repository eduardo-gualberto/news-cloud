import BaseRepository from "@Domain/shared/BaseRepository";
import NewsAPI, { INewsApiSourceItem, INewsApiSourceParams, INewsApiSourcesResponse } from "ts-newsapi";
import Sources from "../models/sources";
import { NewsSourceDosNotExistError, NewsSourcesError, NewsSourcesTooManyError } from "../models/sources-error";

type ParamType = INewsApiSourceParams & { shouldFallbackToMock?: boolean }

export default class SourcesRemoteRepository extends BaseRepository<ParamType, Sources[]> {
    static newsApi = new NewsAPI(process.env.EXPO_PUBLIC_NEWSAPI_KEY ?? "")
    shouldFallbackToMock: boolean = false

    async fetch(param: ParamType): Promise<Sources[]> {
        return SourcesRemoteRepository.newsApi.getSources(param)
            .then(response => this._handleAPIResponse(response))
            .then(sources => Sources.fromApiResponse(sources))
            .catch(error => {
                if (param.shouldFallbackToMock) return Sources.fromMock()
                throw error
            })
    }

    _handleAPIResponse(response: INewsApiSourcesResponse & { message?: string }): INewsApiSourceItem[] {
        if (response.status === "ok") return response.sources

        const { code, message } = response

        switch (code) {
            case "sourcesTooMany": throw new NewsSourcesTooManyError(message ?? "Too many sources were requested")
            case "sourceDoesNotExist": throw new NewsSourceDosNotExistError(message ?? "The source does not exist")
            default: throw new NewsSourcesError(message ?? "An error occurred with the sources")
        }
    }
}
