import { Ref } from "vue"

export const useIsRequesting = () => {
    const isRequesting = useState('isRequesting', () => (false))

    return {
        isRequesting: readonly(isRequesting),
        toggle: toggle(isRequesting)
    }
}

export const toggle = (state: Ref<Boolean>) => () => {
    state.value = !state.value
    console.log(`isRequesting: ${state.value}`)
}