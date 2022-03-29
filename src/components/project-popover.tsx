import styled from "@emotion/styled";
import { Button, Divider, List, Popover, Typography } from "antd";
import React from "react";
import { ProjectListScreen } from "screens/project-list";
import { useProject } from "utils/project";

export const ProjectPopover = (props: {
        projectButton: JSX.Element
    }) => {

    const { data: projects, isLoading } = useProject()
    const pinnedProjects = projects?.filter(project => project.pin)

    const content = (
        <ContentContainer>
            <Typography.Text type="secondary">PIN PROJECT</Typography.Text>
            <List>
                {
                    pinnedProjects?.map(project => (
                        <List.Item>
                            <List.Item.Meta title={project.name}/>
                        </List.Item>
                    ))
                }
            </List>
            <Divider />
            {props.projectButton}
        </ContentContainer>
    )

    return (
        <Popover
            placement={"bottom"}
            content={content}
        >
            PROJECTS
        </Popover>
    )
}

const ContentContainer = styled.div`
    min-width: 30rem;
`