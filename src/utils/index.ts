import { useEffect, useRef, useState } from 'react'

export const isDummy = (value: unknown) => value === 0 ? false: !value
export const isVoid = (value: unknown) => value === undefined || value === null || value === ''

export const cleanObject = (object: { [key: string]: unknown }) => {
    const result = {...object}
    Object.keys(result).forEach( key => {
        const value = result[key]
        if (isVoid(value)) {
            delete result[key]
        }
    })
    return result
}

export const useMount = (callback: () => void, dep?: number) => {
    useEffect(() => {
        callback()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dep]);
}

export const useDebounce = <V>(value: V, delay?: number) => {
    const [dValue, setDValue] = useState(value);

    useEffect(() => {
        const timeout = setTimeout(() => setDValue(value), delay)
        return () => clearTimeout(timeout)
        }, 
        [value, delay]);
    return dValue
}

export const useArray = <T>(initialArray: T[]) => {
    const [value, setValue] = useState(initialArray)
    return {
        value,
        setValue,
        add: (item: T) => setValue([...value, item]),
        clear: () => setValue([]),
        removeIndex: (index: number) => {
            const copy = [...value]
            copy.splice(index, 1)
            setValue(copy)
        }
    }
}

export const useDocumentTitle = (title: string, keepOnUnmount: boolean = true) => {

    const oldTitle = useRef(document.title).current

    useEffect(() => {
        document.title = title
    }, [title])

    useEffect(() => {
        return () => {
            if (!keepOnUnmount) {
                document.title = oldTitle
            }
        }
    }, [keepOnUnmount, oldTitle])
}

export const resetRoute = () => window.location.href = window.location.origin