import { Table } from 'antd';
import { TableProps } from 'antd/es/table';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';
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
    users: User[]
}

export const List = ({users, ...props}: ListProps) => {
    return <Table 
        rowKey={"id"}
        pagination={false} 
        columns={[
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
        }]
    } 
    {...props}
    />
    
}