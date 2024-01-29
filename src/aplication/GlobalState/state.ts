import { signal } from "@preact/signals-core"

const createAppState = () => {
    const selectedCategory = signal('business')
    return {
        selectedCategory,
    }
}

export default createAppState()