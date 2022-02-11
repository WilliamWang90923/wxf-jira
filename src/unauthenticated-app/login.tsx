import { useAuth } from 'context/auth-context';
import React from 'react';
import {Button, Form, Input} from 'antd'
import { LongButton } from 'unauthenticated-app';
import { useAsync } from 'utils/use-async';


export const LoginScreen = ({onError}:{onError:(error: Error) => void}) => {

    const { login } = useAuth()
    const { run, isLoading } = useAsync(undefined, {throwOnError: true})

    const handleSubmit = (values: { username: string, password: string }) => {
        run(login(values)).catch(err => 
        { 
            console.log('err: ', err)
            onError(err)})
    }

    return (
        <Form action="" onFinish={handleSubmit}>
            <Form.Item name={'username'} rules={[{required: true, message: 'please input name'}]} >
                <Input placeholder={'user name'} type="text" id={'username'}/>
            </Form.Item>
            <Form.Item name={'password'} rules={[{required: true, message: 'please input password'}]} >
                <Input placeholder={'pass word'} type="password" id={'password'}/>
            </Form.Item>
            <Form.Item>
                <LongButton loading={isLoading} htmlType='submit' type={'primary'}>LOGIN</LongButton>
            </Form.Item>
        </Form>
    )
}
