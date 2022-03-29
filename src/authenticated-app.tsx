import React, { useState } from 'react';
import { useAuth } from 'context/auth-context';
import { ProjectListScreen } from 'screens/project-list';
import styled from '@emotion/styled';
import { Row } from 'components/lib';
import { ReactComponent as AppLogo} from 'assets/software-logo.svg';
import { Button, Dropdown, Menu } from 'antd';
import { Route, Routes } from 'react-router'
import { BrowserRouter as Router } from 'react-router-dom';

import { ProjectScreen } from 'screens/project';
import { resetRoute } from 'utils';
import { ProjectModal } from 'screens/project-list/project-modal';
import { ProjectPopover } from 'components/project-popover';


export const AuthenticatedApp = () => {

    const [projectModalOpen, setProjectModalOpen] = useState(false);

    return (
        <Container>
            <PageHeader 
                projectButton={
                    <Button style={{padding: 0}} type="link"
                    onClick={() => setProjectModalOpen(true)}
                    >
                    New Project+
                    </Button>
                }
            />
            <Main>
                {/* <ProjectListScreen /> */}
                <Router>
                    <Routes>
                        <Route path={'projects'} 
                               element={<ProjectListScreen
                                            projectButton={
                                                <Button style={{padding: 0}} type="link"
                                                onClick={() => setProjectModalOpen(true)}
                                                >
                                                New Project+
                                                </Button>
                                            } 
                                        />}
                        ></Route>
                        <Route path={'projects/:projectId/*'} element={<ProjectScreen /> }/>
                        <Route index element={<ProjectListScreen projectButton={
                            <Button style={{padding: 0}} type="link"
                            onClick={() => setProjectModalOpen(true)}
                            >
                            New Project+
                            </Button>
                        }/> }/>
                    </Routes>
                </Router>
            </Main>
            <ProjectModal projectModalOpen={projectModalOpen} onClose={() => setProjectModalOpen(false)}></ProjectModal>
        </Container>
    )
}

const PageHeader = (props: {
        projectButton: JSX.Element
    }) => {

    return (
        <Header between={true}>
            <HeaderLeft gap={true}>
                <Button style={{padding: 0}} type='link' onClick={resetRoute}>
                    <AppLogo width={'18rem'} color={'rgb(38, 132, 255)'}/>
                </Button>
                {/* <h2>Project</h2> */}
                <ProjectPopover {...props}/>
                <span>USER</span>
            </HeaderLeft>
            <HeaderRight>
                <User />
            </HeaderRight>
        </Header>
    )
}

const User = () => {
    const { logout, user } = useAuth()

    return (
        <Dropdown overlay={
            <Menu>
                <Menu.Item key={'logout'}>
                    <Button type={'link'} onClick={logout}>
                        Log Out
                    </Button>
                </Menu.Item>
            </Menu>
        }>
            <Button type='link'>Hi, {user?.name}</Button>
        </Dropdown>
    )
}

const Container = styled.div`
    display: grid;
    grid-template-rows: 6rem 1fr 6rem;
    height: 100vh;
`
const Header = styled(Row)`
    padding: 3.2rem;
    box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.15);
`
const HeaderLeft = styled(Row)`
`
const HeaderRight = styled.div`
`
const Main = styled.main`
`
