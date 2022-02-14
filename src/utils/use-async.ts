import { useState, useCallback } from 'react'

interface State<D> {
    error: Error | null;
    data: D | null;
    stat: 'idle' | 'loading' | 'error' | 'success'
}

const defaultInitialState: State<null> = {
    stat: 'idle',
    data: null,
    error: null
}

const defaultConfig = {
    throwOnError: false
}

export const useAsync = <D>(initialState?: State<D>, initialConfig?: typeof defaultConfig) => {
    const config = {...defaultConfig, ...initialConfig}

    const [state, setState] = useState({
        ...defaultInitialState,
        ...initialState
    });
    const setData = (data: D) => setState({
        data,
        stat: 'success',
        error: null
    })

    const setError = (error: Error) => setState({
        error,
        stat: 'error',
        data: null
    })
    let savedPromiseFunc: (() => Promise<D>) 
    // trigger async request
    const run = (promise: Promise<D>, runConfig?: () => Promise<D> ) => {
        if (!promise || !promise.then) {
            throw new Error('please pass Promise type data!')
        } 
        if (runConfig) {
            savedPromiseFunc = runConfig
        }
        setState({...state, stat: 'loading'})
        return promise.then(data => {
            setData(data)
            return data
        }).catch(err => {
            setError(err)
            if (config.throwOnError) {
                return Promise.reject(err)
            }
            return err
        })
    }
    const retry = useCallback(() => run(savedPromiseFunc()) ,[]);


    return {
        isIdle: state.stat === 'idle',
        isLoading: state.stat === 'loading',
        isError: state.stat === 'error',
        isSuccess: state.stat === 'success',
        run,
        setData,
        setError,
        // when called, call run() again
        retry,
        ...state
    }
}