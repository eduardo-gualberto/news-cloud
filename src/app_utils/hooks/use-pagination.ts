import { useSignal } from "@preact/signals-react"
import logger  from "@Aplication/Logger";

export default function usePagination<T>(request: (page: number, pageSize: number) => Promise<T[]>, kill: boolean, pagesize = 20, initialPage = 1) {
    const loggr = logger.extend('Home.usePagination')    

    const page = useSignal(initialPage)
    const pageSize = useSignal(pagesize)
    const data = useSignal<T[]>([])
    const loading = useSignal(false)
    const error = useSignal<Error | null>(null)
    const hasMore = useSignal(true)

    const fetchMore = () => {
        if (kill) return
        loading.value = true
        request(page.peek(), pageSize.peek())
            .then((res: T[]) => {                                                
                data.value = data.value.concat(res)
                page.value = page.value + 1
                loading.value = false
            })
            .catch(e => {
                error.value = e
                loading.value = false
            })
    }

    const reset = () => {
        page.value = initialPage
        data.value = []
        hasMore.value = true
    }

    if (kill) {
        loggr.warn(`Pagination stopped.`)     
        hasMore.value = false
    }

    return {
        reset,
        page,
        pageSize,
        data,
        loading,
        error,
        hasMore,
        fetchMore
    }
}