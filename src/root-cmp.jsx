import React from 'react'
import { Routes, Route } from 'react-router'

import { AppHeader } from './cmps/app-header'
import { AppFooter } from './cmps/app-footer'
import { Board } from './pages/board'
import { HomePage } from './pages/home-page'
import { WorkSpace } from './pages/work-space'
import { TaskDetails } from './pages/task-details'

export function RootCmp() {

    return (
        <div>
            <AppHeader />
            <main>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/workspace" element={<WorkSpace />} />
                    <Route path="/board" element={<Board />} />
                    <Route path="/c/:groupId/:taskId" element={<TaskDetails />} />
                </Routes>
            </main>
            <AppFooter />
        </div>
    )
}


