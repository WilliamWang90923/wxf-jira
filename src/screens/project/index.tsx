import React from "react"
import { Link } from "react-router-dom"
import { Route, Routes, Navigate } from 'react-router';
import { EpicScreen } from "screens/epic"
import { PanelScreen } from "screens/Panel"

export const ProjectScreen = () => {
    return (
        <div>
            <h1>ProjectScreen</h1>
            <Link to={'kanban'}>PANEL</Link>
            <Link to={'epic'}>EPICS</Link>
            <Routes>
                <Route path={'/kanban'} element={<PanelScreen/>}/>
                <Route path={'/epic'} element={<EpicScreen />}/>
                <Route index element={<EpicScreen />}></Route>
            </Routes>
        </div>
    )
}