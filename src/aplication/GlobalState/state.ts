import { signal } from "@preact/signals-core"

const createAppState = () => {
    const selectedCategory = signal('all')
    return {
        selectedCategory,
    }
}

export default createAppState()