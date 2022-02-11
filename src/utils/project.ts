import { useHttp } from './http';
import { useEffect } from 'react';
import { Project } from 'screens/project-list/list';
import { cleanObject } from 'utils';
import { useAsync } from './use-async';


export const useProject = (param?: Partial<Project>) => {
    const client = useHttp()
    const {run, ...result} = useAsync<Project[]>()

    useEffect(() => {
        run(client('projects', {data: cleanObject(param || {})}))
    }, [param]);

    return result
}