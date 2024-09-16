'use client'

import React from 'react'
import { KanbanState } from '@/app/types'
import { Button } from "@/components/ui/button"

import  Column  from '@/app/sections/columns'
import {v4} from "uuid";

const KanbanBoard: React.FC = () => {
    const [state, setState] = React.useState<KanbanState>({
        columns: [
            {
                id: v4(),
                title: 'Default Column',
                tasks: [],
            },
        ],
    });

    const addColumn = () => {
        setState((prevState) => ({
            columns: [
                ...prevState.columns,
                {
                    id: v4(),
                    title: 'New Column',
                    tasks: [],
                },
            ],
        }));
    };

    const editColumnTitle = (columnId: string, newTitle: string) => {
        setState((prevState) => ({
            columns: prevState.columns.map((column) =>
                column.id === columnId ? { ...column, title: newTitle } : column
            ),
        }));
    };

    const addTask = (columnId: string, taskContent: string) => {
        setState((prevState) => ({
            columns: prevState.columns.map((column) =>
                column.id === columnId
                    ? {
                        ...column,
                        tasks: [...column.tasks, { id: v4(), content: taskContent }],
                    }
                    : column
            ),
        }));
    };

    const editTask = (columnId: string, taskId: string, newContent: string) => {
        setState((prevState) => ({
            columns: prevState.columns.map((column) =>
                column.id === columnId
                    ? {
                        ...column,
                        tasks: column.tasks.map((task) =>
                            task.id === taskId ? { ...task, content: newContent } : task
                        ),
                    }
                    : column
            ),
        }));
    };

    const deleteTask = (columnId: string, taskId: string) => {
        setState((prevState) => ({
            columns: prevState.columns.map((column) =>
                column.id === columnId
                    ? {
                        ...column,
                        tasks: column.tasks.filter((task) => task.id !== taskId),
                    }
                    : column
            ),
        }));
    };

    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold mb-8">Kanban Board</h1>
            <div className="flex space-x-4 overflow-x-auto pb-4">
                {state.columns.map((column) => (
                    <Column
                        key={column.id}
                        column={column}
                        onEditTitle={editColumnTitle}
                        onAddTask={addTask}
                        onEditTask={editTask}
                        onDeleteTask={deleteTask}
                    />
                ))}
                <Button onClick={addColumn} variant="outline" className="h-min whitespace-nowrap">
                    Add Column
                </Button>
            </div>
        </div>
    );
};

export default KanbanBoard;