import { signal } from "@preact/signals-core"
import News from "../../domain/news/models/news"
import { ApiNewsCategory } from "ts-newsapi"
import Sources from "@Domain/sources/models/sources"

const createAppState = () => {
    const selectedCategory = signal('general')
    const selectedNews = signal<News>({} as News)
    const fetchedNews = signal<News[]>([])
    const categorySources = signal<Record<ApiNewsCategory, Sources[] | undefined>>({} as Record<ApiNewsCategory, Sources[] | undefined>)
    
    return {
        selectedCategory,
        selectedNews,
        fetchedNews,
        categorySources
    }
}

export default createAppState()