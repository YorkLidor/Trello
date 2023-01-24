import React from 'react'
import { Routes, Route, useLocation } from 'react-router'

import { Board } from './pages/board'
import { HomePage } from './pages/home-page'
import { TaskDetails } from './cmps/task-details/task-details'
import { BoardIndex } from './pages/board-index'
import { Provider } from 'react-redux'
import { store } from './store/store'
import { HomeAppHeader } from './cmps/home-app-header'
import { AppHeader } from './cmps/app-header'

export function RootCmp() {
    const location = useLocation()

    return (
        <Provider store={store}>
            {location.pathname === '/' ? <HomeAppHeader /> : <AppHeader />}
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/workspace" element={<BoardIndex />} />
                <Route path="/:boardId" element={<Board />}>
                    <Route path="/:boardId/:groupId/:taskId" element={<TaskDetails />} />
                </Route>
            </Routes>
        </Provider>
    )
}


