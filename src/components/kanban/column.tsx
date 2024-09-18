"use client";

import React, { useState } from "react";
import Task from "@/components/kanban/task";
import { useDraggable, useDroppable } from "@dnd-kit/core";
import { ColumnType, TaskType } from "@/app/types";
import { Card } from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

interface ColumnProps {
  column: ColumnType;
  tasks: TaskType[];
  updateColumnName: (columnId: string, newName: string) => void;
  addTask: (columnId: string, taskName: string) => void;
}

const Column: React.FC<ColumnProps> = ({
  column,
  tasks,
  addTask,
  updateColumnName,
}) => {
  const {
    attributes,
    listeners,
    setNodeRef: setDraggableRef,
    transform,
  } = useDraggable({
    id: column.id,
  });

  const { setNodeRef: setDroppableRef } = useDroppable({
    id: column.id,
  });

  const [newTaskName, setNewTaskName] = useState("");
  const [editingTitle, setEditingTitle] = useState(false);
  const [newColumnName, setNewColumnName] = useState(column.name);

  const handleAddTask = () => {
    if (newTaskName.trim()) {
      addTask(column.id, newTaskName);
      setNewTaskName("");
    }
  };

  const handleTitleChange = () => {
    setEditingTitle(false);
    updateColumnName(column.id, newColumnName);
  };

  const style = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
  };

  return (
    <Card
      ref={(node) => {
        setDraggableRef(node);
        setDroppableRef(node);
      }}
      style={style}
      {...listeners}
      {...attributes}
      className="p-4 bg-gray-100 rounded-lg shadow-md w-64 flex flex-col"
    >
      {editingTitle ? (
        <Input
          value={newColumnName}
          onChange={(e) => setNewColumnName(e.target.value)}
          onBlur={handleTitleChange}
          autoFocus
          className="mb-2"
        />
      ) : (
        <h2
          className="font-bold mb-4 cursor-pointer"
          onClick={() => setEditingTitle(true)}
        >
          {column.name}
        </h2>
      )}

      {tasks.map((task) => (
        <Task key={task.id} id={task.id} task={task} />
      ))}
      <div className="flex gap-2 mt-4">
        <Input
          placeholder="Nova Task"
          value={newTaskName}
          onChange={(e) => setNewTaskName(e.target.value)}
          className="flex-1"
        />
        <Button onClick={handleAddTask}>Adicionar Task</Button>
      </div>
    </Card>
  );
};

export default Column;
