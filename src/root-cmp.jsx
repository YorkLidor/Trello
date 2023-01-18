import React from 'react'
import { Routes, Route } from 'react-router'

import { AppHeader } from './cmps/app-header'
import { Board } from './pages/board'
import { HomePage } from './pages/home-page'
import { WorkSpace } from './pages/work-space'
import { TaskDetails } from './pages/task-details'
import { BoardsIndex } from './pages/boards-index'

export function RootCmp() {

    return (
        <>
            <AppHeader />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/workspace" element={<BoardsIndex />} />
                <Route path="/board/:boardId" element={<Board />} />
                <Route path="/card/:groupId/:taskId" element={<TaskDetails />} />
            </Routes>

        </>
    )
}


