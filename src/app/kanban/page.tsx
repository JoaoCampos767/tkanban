"use client";

import React, { useState } from "react";
import { DndContext } from "@dnd-kit/core";
import Column from "@/components/kanban/column";
import { ColumnType, TaskType } from "@/app/types";
import { Button } from "@/components/ui/button";

const Kanban: React.FC = () => {
  const [columns, setColumns] = useState<ColumnType[]>([
    { id: "column-1", name: "To Do" },
  ]);

  const [tasks, setTasks] = useState<TaskType[]>([
    { id: "task-1", name: "Primeira Tarefa", columnId: "column-1" },
  ]);

  const addTask = (columnId: string, taskName: string) => {
    const newTask = {
      id: `task-${tasks.length + 1}`,
      name: taskName,
      columnId,
    };
    setTasks([...tasks, newTask]);
  };

  const updateColumnName = (columnId: string, newName: string) => {
    setColumns(
      columns.map((column) =>
        column.id === columnId ? { ...column, name: newName } : column
      )
    );
  };

  const addColumn = () => {
    const newColumn = {
      id: `column-${columns.length + 1}`,
      name: "Nova Coluna",
    };
    setColumns([...columns, newColumn]);
  };

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    const taskId = active.id;
    const newColumnId = over?.id;

    if (!newColumnId) return;

    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, columnId: newColumnId } : task
      )
    );
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="flex gap-4 p-8">
        {columns.map((column) => (
          <Column
            key={column.id}
            column={column}
            tasks={tasks.filter((task) => task.columnId === column.id)}
            addTask={addTask}
            updateColumnName={updateColumnName}
          />
        ))}
        <Button
          onClick={addColumn}
          className="bg-green-500 text-white self-start p-4"
        >
          Adicionar Coluna
        </Button>
      </div>
    </DndContext>
  );
};

export default Kanban;
