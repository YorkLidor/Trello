import React from 'react'
import { Routes, Route } from 'react-router'

import { AppHeader } from './cmps/app-header'
import { Board } from './pages/board'
import { HomePage } from './pages/home-page'
import { TaskDetails } from './pages/task-details'
import { BoardIndex } from './pages/board-index'
import { Provider } from 'react-redux'
import { store } from './store/store'

export function RootCmp() {

    return (
        <Provider store={store}>
            <AppHeader />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/workspace" element={<BoardIndex />} />
                <Route path="/board/:boardId" element={<Board />} />
                <Route path="/card/:boardId/:groupId/:taskId" element={<TaskDetails />} />
            </Routes>
        </Provider>
    )
}


