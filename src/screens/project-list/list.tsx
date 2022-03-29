import { render } from '@testing-library/react';
import { Button, Dropdown, Menu, Table } from 'antd';
import { TableProps } from 'antd/es/table';
import { StarRate } from 'components/star-rate';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';
import { useEditProject } from 'utils/project';
import { User } from './search-panel';


export interface Project {
    id: number;
    name: string;
    personId: number;
    pin: boolean;
    organization: string;
    created: number;
}

interface ListProps extends TableProps<Project> {
    users: User[];
    refresh?: () => void;
    projectButton: JSX.Element;
}

export const List = ({users, ...props}: ListProps) => {

    const { mutate } = useEditProject()
    const pinProject = (id: number) => (pin: boolean) => mutate({id, pin}).then(props.refresh)

    return <Table 
        rowKey={"id"}
        pagination={false} 
        columns={[
            {
                title: <StarRate checked={true} disabled={true} />,
                render(value, project) {
                    return (
                        <StarRate checked={project.pin} onCheckedChange={ 
                            pinProject(project.id)
                        } />
                    )
                }
            },
            {
                title: 'NAME',
                sorter: (a, b) => a.name.localeCompare(b.name),
                render(value, project) {
                    return (
                        <Link to={`projects/${String(project.id)}`}>{project.name}</Link>
                    )
                }
            },{
                title: 'DEPART',
                dataIndex: 'organization',
            },{
                title: 'MANAGER',
                render: (value, project) => 
                        <span>
                            { users.find( (user: User) => user.id === project.personId)?.name || 'UNKNOWN' }
                        </span>
            }, {
                title: 'TIME',
                render: (value, project) => {
                    return (
                        <span>
                            {project.created ? dayjs(project.created).format('YYYY-MM-DD') : 'NONE'}
                        </span>
                    )
                }
            },
            {
                render: (value, project) => {
                    return (
                        <Dropdown overlay={
                            <Menu>
                                <Menu.Item key={'edit'}>
                                    {props.projectButton}
                                </Menu.Item>
                            </Menu>
                        }>
                            <Button style={{padding: 0}} type={"link"}>...</Button>
                        </Dropdown>
                    )
                }
            }
    ]} 
    {...props}
    />
    
}