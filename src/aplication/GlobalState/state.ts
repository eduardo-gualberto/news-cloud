import { signal } from "@preact/signals-core"
import News from "../../domain/news/models/news"

const createAppState = () => {
    const selectedCategory = signal('all')
    const selectedNews = signal<News>({} as News)
    const selectNews = (news: News) => {
        selectedNews.value = news
    }
    
    return {
        selectedCategory,
        selectedNews,
        selectNews
    }
}

export default createAppState()