import { UniqueIdentifier } from "@dnd-kit/core";

export type ColumnType = {
  id: UniqueIdentifier;
  name: string;
};

export type TaskType = {
  id: UniqueIdentifier;
  name: string;
  columnId: UniqueIdentifier;
};
