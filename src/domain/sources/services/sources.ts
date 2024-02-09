import { ApiNewsCategory } from "ts-newsapi";
import SourcesRemoteRepository from "../repositories/sources-remote";
import Sources from "../models/sources";

export default class SourcesServices {
    sourcesRemoteRepository = new SourcesRemoteRepository()

    getSourcesByCategory(category: ApiNewsCategory): Promise<Sources[]> {
        return this.sourcesRemoteRepository.fetch({ category, language: "en" })
    }
}