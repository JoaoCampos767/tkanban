"use client"

import React from 'react'
import { Column as ColumnType } from '@/app/types'
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Task from "@/app/sections/task";

interface ColumnProps {
    column: ColumnType;
    onEditTitle: (id: string, title: string) => void;
    onAddTask: (columnId: string, taskContent: string) => void;
    onEditTask: (columnId: string, taskId: string, content: string) => void;
    onDeleteTask: (columnId: string, taskId: string) => void;
}

const Column: React.FC<ColumnProps> = ({
                                                  column,
                                                  onEditTitle,
                                                  onAddTask,
                                                  onEditTask,
                                                  onDeleteTask,
                                              }) => {
    const [isEditingTitle, setIsEditingTitle] = React.useState(false);
    const [editedTitle, setEditedTitle] = React.useState(column.title);
    const [newTaskContent, setNewTaskContent] = React.useState('');

    const handleEditTitle = () => {
        onEditTitle(column.id, editedTitle);
        setIsEditingTitle(false);
    };

    const handleAddTask = () => {
        if (newTaskContent.trim()) {
            onAddTask(column.id, newTaskContent);
            setNewTaskContent('');
        }
    };

    return (
        <Card className="w-[300px] bg-muted">
            <CardHeader className="pb-2">
                {isEditingTitle ? (
                    <div className="space-y-2">
                        <Input
                            type="text"
                            value={editedTitle}
                            onChange={(e) => setEditedTitle(e.target.value)}
                        />
                        <Button onClick={handleEditTitle} variant="default">Save</Button>
                    </div>
                ) : (
                    <div className="flex justify-between items-center">
                        <h2 className="text-xl font-bold">{column.title}</h2>
                        <Button onClick={() => setIsEditingTitle(true)} variant="ghost" size="sm">
                            Edit
                        </Button>
                    </div>
                )}
            </CardHeader>
            <CardContent className="space-y-2">
                {column.tasks.map((task) => (
                    <Task
                        key={task.id}
                        task={task}
                        onEdit={(taskId: string, content: string) => onEditTask(column.id, taskId, content)}
                        onDelete={(taskId: string) => onDeleteTask(column.id, taskId)}
                    />
                ))}
            </CardContent>
            <CardFooter className="flex flex-col space-y-2">
                <Input
                    type="text"
                    value={newTaskContent}
                    onChange={(e) => setNewTaskContent(e.target.value)}
                    placeholder="New task"
                />
                <Button onClick={handleAddTask} className="w-full">
                    Add Task
                </Button>
            </CardFooter>
        </Card>
    );
};

export default Column;