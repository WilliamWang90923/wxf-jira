import { Form, Input, Select } from "antd"
import { UserSelect } from "components/user-select"
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
    param: Partial<Pick<Project, 'name' | 'personId'>>;
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
                <UserSelect 
                    defaultOptionName={"Manager"}
                    value={param.personId} 
                    onChange={
                        (value) => {
                            setParam({
                                ...param,
                                personId: value,
                            })
                        }
                    }
                >
                </UserSelect>
                
            </Form.Item>    
        </Form>
    )
}