import { List, Project } from "./list"
import { SearchPanel } from "./search-panel"
import {useMemo} from 'react'
import { useDebounce, useDocumentTitle, useMount } from "utils"
import styled from "@emotion/styled"
import { Button, Typography } from "antd"
import { useAsync } from "utils/use-async"
import { useProject } from "utils/project"
import { useUsers } from "utils/user"
import { useUrlQueryParam } from "utils/url"

export const ProjectListScreen = () => {
    // const [_, setParam] = useState({
    //     name: '',
    //     personId: ''
    // });
    
    const [param, setParam] = useUrlQueryParam(['name', 'personId'])
    
    // const projectsParam = {...param, personId: Number(param.personId) || undefined}
    const projectsParam = useMemo(() => ({...param, personId: Number(param.personId) || undefined}), [param])
    const debounceParam = useDebounce(projectsParam, 200)
    const {isLoading, error, data: list, retry} = useProject(debounceParam)
    const { data: users } = useUsers()

    useDocumentTitle('Projects', false)
    // console.log(useUrlQueryParam(['name']))
    console.log("render")
    
    return <Container>
        <h1>Project List</h1>
        <SearchPanel users={users || []} param={debounceParam} setParam={setParam}/>
        {error ? <Typography.Text type="danger">{error.message}</Typography.Text> : null}
        <List refresh={retry} users={users || []} dataSource={list || []} loading={isLoading}/>
    </Container>
}

const Container = styled.div`
    padding: 3.2rem;
`