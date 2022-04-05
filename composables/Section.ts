
import { Ref } from "vue"

type SectionType =
    | 'Version'
    | 'Build'
    | 'Check'

export const useSection = () => {
    const section = useState<SectionType>('section', () => ('Version'))

    return {
        section: readonly(section),
        setSection: setSection(section)
    }

}

export const setSection = (section: SectionType) => (to: SectionType) => {
    section = to
}