import { ApiNewsCategory } from "ts-newsapi";
import SourcesRemoteRepository from "../repositories/sources-remote";
import Sources from "../models/sources";
import { NewsSourcesError } from "../models/sources-error";

export default class SourcesServices {
    sourcesRemoteRepository = new SourcesRemoteRepository()
    shouldFallbackToMock: boolean = false
    onErrorOcurred?: (e: NewsSourcesError) => void

    constructor(onErrorOcurred?: (e: NewsSourcesError) => void, shouldFallbackToMock?: boolean) {
        this.onErrorOcurred = onErrorOcurred
        this.shouldFallbackToMock = shouldFallbackToMock ?? false
    }

    getSourcesByCategory(category: ApiNewsCategory): Promise<Sources[]> {
        return this.sourcesRemoteRepository
            .fetch({ category, language: "en", shouldFallbackToMock: this.shouldFallbackToMock })
            .catch(error => {
                if (this.onErrorOcurred) this.onErrorOcurred(error)
                return Promise.reject(error)
            })
    }
}