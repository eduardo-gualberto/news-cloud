import { signal } from "@preact/signals-core"
import News from "../../domain/news/models/news"

const createAppState = () => {
    const selectedCategory = signal('general')
    const selectedNews = signal<News>({} as News)
    const fetchedNews = signal<News[]>([])
    return {
        selectedCategory,
        selectedNews,
        fetchedNews,
    }
}

export default createAppState()