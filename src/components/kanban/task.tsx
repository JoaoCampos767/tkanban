"use client";

import React from "react";
import { useDraggable } from "@dnd-kit/core";
import { TaskType } from "@/app/types";
import { Card } from "../ui/card";

interface TaskProps {
  id: string;
  task: TaskType;
}

const Task: React.FC<TaskProps> = ({ task }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task.id,
  });

  const style = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
  };

  return (
    <Card
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className="p-2 mb-2 bg-white rounded-md shadow-md cursor-pointer"
    >
      {task.name}
    </Card>
  );
};

export default Task;
