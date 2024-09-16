"use client"

import React from 'react'
import { Task as TaskType } from '@/app/types'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface TaskProps {
    task: TaskType;
    onEdit: (id: string, content: string) => void;
    onDelete: (id: string) => void;
}

const Task: React.FC<TaskProps> = ({ task, onEdit, onDelete }) => {
    const [isEditing, setIsEditing] = React.useState(false);
    const [editedContent, setEditedContent] = React.useState(task.content);

    const handleEdit = () => {
        onEdit(task.id, editedContent);
        setIsEditing(false);
    };

    return (
        <Card className="mb-2">
            <CardContent className="p-4">
                {isEditing ? (
                    <div className="space-y-2">
                        <Input
                            type="text"
                            value={editedContent}
                            onChange={(e) => setEditedContent(e.target.value)}
                        />
                        <Button onClick={handleEdit} variant="default">Save</Button>
                    </div>
                ) : (
                    <div>
                        <p>{task.content}</p>
                        <div className="mt-2 space-x-2">
                            <Button onClick={() => setIsEditing(true)} variant="outline" size="sm">
                                Edit
                            </Button>
                            <Button onClick={() => onDelete(task.id)} variant="destructive" size="sm">
                                Delete
                            </Button>
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    );
};

export default Task;