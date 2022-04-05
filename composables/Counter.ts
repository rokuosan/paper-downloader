
import { Ref } from "vue"

export const useCounter = () => {
    const counter = useState('counter', () => (0))

    return {
        counter: readonly(counter),
        dec: dec(counter),
        inc: inc(counter),
        reset: reset(counter),
        set: set(counter)
    }
}

export const inc = (counter: Ref<number>) => () => {
    counter.value++
}

export const dec = (counter: Ref<number>) => () => {
    counter.value--
}

export const reset = (counter: Ref<number>) => () => {
    counter.value = 0
}

export const set = (counter: Ref<number>) => (num: number) => {
    counter.value = num
}