import {Form, Input, Button} from 'antd';
import { useAuth } from 'context/auth-context';
import React from 'react';
import { LongButton } from 'unauthenticated-app';
import { useAsync } from 'utils/use-async';

export const RegisterScreen = ({onError}:{onError:(error: Error) => void}) => {

   const { register } = useAuth()
   const { run, isLoading } = useAsync(undefined, {throwOnError: true})

    const handleSubmit = async ({cpassword, ...values}: {username: string, password: string, cpassword: string}) => {
        if (cpassword !== values.password) {
            onError(new Error('2 input password not match!'))
            return
        }
        run(register(values)).catch(onError)
    }

    return (
        <Form onFinish={handleSubmit}>
            <Form.Item name={'username'} rules={[{required: true, message: 'please input name'}]} >
                <Input placeholder={'user name'} type="text" id={'username'}/>
            </Form.Item>
            <Form.Item name={'password'} rules={[{required: true, message: 'please input password'}]} >
                <Input placeholder={'pass word'} type="password" id={'password'}/>
            </Form.Item>
            <Form.Item name={'cpassword'} rules={[{required: true, message: 'input password again'}]} >
                <Input placeholder={'verify pass word'} type="password" id={'cpassword'}/>
            </Form.Item>
            <Form.Item>
                <LongButton loading={isLoading} htmlType='submit' type={'primary'}>REGIST</LongButton>
            </Form.Item>
        </Form>
    )
}
