import { useAuth } from './../context/auth-context';
import QueryString from "qs"
import {logout} from '../auth-provider'

const apiUrl = process.env.REACT_APP_API_URL

interface Config extends RequestInit {
    token?: string;
    data?: object;
}

export const http = async (endpoint: string, {data, token, headers, ...customConfig}: Config = {}) => {
    const config = {
        method: 'GET',
        headers: {
            Authorization: token ? `Bearer ${token}` : '',
            'Content-Type': data ? 'application/json' : '',
        },
        ...customConfig
    }

    if (config.method.toUpperCase() === 'GET') {
        endpoint += `?${QueryString.stringify(data)}`
    } else {
        config.body = JSON.stringify(data || {})
    }
    // unlike axios, fetch would not throw Exception when 401 or 50X
    return window.fetch(`${apiUrl}/${endpoint}`, config)
    .then(async response => {
        if (response.status === 401) {
            await logout()
            window.location.reload()
            return Promise.reject({message: 'please log in again.'})
        }
        const data = await response.json()
        if (response.ok) {
            return data 
        } else {
            return Promise.reject(data)
        }
    })
}

export const useHttp = () => {
    const {user} = useAuth()
    return (...[endpoint, config]: Parameters<typeof http>) => http(endpoint, {...config, token: user?.token})
}
