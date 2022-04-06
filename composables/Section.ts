import { Ref } from "vue"

export const useSection = () => {
    const section = useState('section', () => (1))

    return {
        section: readonly(section),
        setSection: setSection(section)
    }
}

export const setSection = (section: Ref<number>) => (to: number) => {
    section.value = to
}