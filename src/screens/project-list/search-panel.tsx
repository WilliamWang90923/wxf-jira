import { Form, Input, Select } from "antd"
import { Project } from "./list"

export interface User {
    id: number;
    name: string;
    email: string;
    title: string;
    organization: string;
    token: string;
}

interface SearchPanelProps {
    users: User[],
    param: Pick<Project, 'name' | 'personId'>;
    setParam: (param: SearchPanelProps['param']) => void;
}

export const SearchPanel = ({users, param, setParam}: SearchPanelProps) => {

    return (
        <Form layout={'inline'} style={{marginBottom: '2rem'}}>
            <Form.Item>
                <Input type="text" value={param.name} 
                       placeholder={'project name'}
                       onChange={ (evt) => {
                        setParam({
                            ...param,
                            name: evt.target.value
                        })
                    }}
                />
                
            </Form.Item>
            <Form.Item>
                <Select value={param.personId} 
                        onChange={ (value) => {
                            setParam({
                                ...param,
                                personId: value
                            })
                        }}
                >
                    <Select.Option value={''}>Manager</Select.Option>
                    {
                        users.map(user => (
                            <Select.Option key={user.id} value={String(user.id)}>
                                {user.name}
                            </Select.Option>
                        ))
                    }
                </Select> 
            </Form.Item>    
        </Form>
    )
}