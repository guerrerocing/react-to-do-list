import { Listbox, ListboxItem } from "@nextui-org/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHourglassEnd,
  faCheckDouble,
} from "@fortawesome/free-solid-svg-icons";

import IconWrapper from "../IconWrapper";
import ToDoActions from "../ToDoActions";
import { Todo } from "../../types/types";

interface TodoListProps {
  todos: Todo[];
  onRemove: (id: number) => void;
  onComplete: (id: number) => void;
  onEdit: (id: number, todo: Todo) => void;
  handleDragStart: (event: any, todo: Todo) => void;
  handleDragOver: (event: any, todo: Todo) => void;
  handleDragEnd: () => void;
}

const ToDoList = ({
  todos,
  onRemove,
  onEdit,
  onComplete,
  handleDragStart,
  handleDragOver,
  handleDragEnd,
}: TodoListProps) => {
  return (
    <Listbox
      aria-label="Todo List"
      className="full-w px-0 my-2 gap-0 divide-y divide-default-300/50 dark:divide-default-100/80 bg-content1  overflow-visible shadow-small rounded-medium"
      itemClasses={{
        base: "px-3 first:rounded-t-medium last:rounded-b-medium rounded-none gap-3 h-12 data-[hover=true]:bg-default-100/80",
      }}
    >
      {todos.length ? (
        todos.map((todo) => {
          return (
            <ListboxItem
              draggable
              onDragStart={(e) => handleDragStart(e, todo)}
              onDragOver={(e) => handleDragOver(e, todo)}
              onDragEnd={handleDragEnd}
              key={todo.id ?? ""}
              endContent={
                <ToDoActions
                  completed={todo.completed}
                  onDelete={() => {
                    onRemove(todo.id);
                  }}
                  onEdit={() => {
                    onEdit(todo.id, todo);
                  }}
                  onComplete={() => {
                    onComplete(todo.id);
                  }}
                />
              }
              startContent={
                <IconWrapper
                  className={
                    todo.completed
                      ? "bg-success/10 text-success"
                      : "bg-danger/10 text-warning"
                  }
                >
                  <FontAwesomeIcon
                    className="text-lg "
                    icon={todo.completed ? faCheckDouble : faHourglassEnd}
                  />
                </IconWrapper>
              }
            >
              <span
                className={
                  todo.completed
                    ? "line-through decoration-wavy decoration-red-500 decoration-4"
                    : ""
                }
              >
                {todo.title}
              </span>
            </ListboxItem>
          );
        })
      ) : (
        <ListboxItem key="no-records">
          {` There's no records to show you`}
        </ListboxItem>
      )}
    </Listbox>
  );
};

export default ToDoList;
