import { useState, useEffect } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";

import NavBar from "../../components/NavBar";
import ToDoForm from "../../components/ToDoForm";
import ToDoList from "../../components/ToDoList";

import { Todo } from "../../types/types";

const ToDoView = () => {
  const [editMode, setEditMode] = useState<boolean>(false);
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
  const [toDo, setToDo] = useState<Todo>({
    id: 0,
    description: "",
    title: "",
    completed: false,
  });

  //Get ToDos Items from LocalStorage
  const [todos, setTodos] = useState<Todo[]>(() => {
    const storedTodos = localStorage.getItem("todos");
    return storedTodos ? JSON.parse(storedTodos) : [];
  });

  //Listen todos Changes and update LocalStorage
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  //Submit Event | Update or Create - Store Changes into LocalStorage
  const handleSubmit = async () => {
    if (editMode) {
      setEditMode(false);
      const updatedTodos = todos.map((todo) =>
        todo.id === toDo.id ? { ...todo, ...toDo } : todo
      );
      setTodos(updatedTodos);
    } else {
      setTodos([...todos, { ...toDo, id: todos.length + 1 }]);
    }
    clearForm();
    onClose();
  };

  //Clear ToDoForm
  const clearForm = () => {
    setToDo({ id: 0, description: "", title: "", completed: false });
  };

  //Remove Item from Todo List
  const onRemove = (id: number) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  //Mark ToDo as Completed
  const onComplete = (id: number) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
  };

  //Set Edit Mode & Open Modal to Update Todo
  const onEdit = (id: number, todo: Todo) => {
    setToDo(todo);
    setEditMode(true);

    onOpen();
  };

  // Drag & Drop Logic
  const [draggedItem, setDraggedItem] = useState<Todo | null>(null);

  const handleDragStart = (
    event: React.DragEvent<HTMLDivElement>,
    todo: Todo
  ) => {
    setDraggedItem(todo);
    event.dataTransfer.effectAllowed = "move";
    event.dataTransfer.setData("text/plain", ""); // Required for Firefox
  };

  // Update Todo List on DragOver Event
  const handleDragOver = (
    event: React.DragEvent<HTMLDivElement>,
    todo: Todo
  ) => {
    event.preventDefault();
    if (!draggedItem || draggedItem === todo) return;

    const draggedItemIndex = todos.indexOf(draggedItem);
    const currentIndex = todos.indexOf(todo);
    const newTodos = Array.from(todos);

    newTodos.splice(currentIndex, 0, newTodos.splice(draggedItemIndex, 1)[0]);

    setTodos(newTodos);
    setDraggedItem(todo);
  };

  const handleDragEnd = () => {
    setDraggedItem(null);
  };

  //Listen all Changes on ToDoForm
  const handleToDoFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setToDo((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  return (
    <div className="w-full">
      <NavBar />

      <div className="container mx-auto py-4 max-w-xl	">
        <Button
          color="primary"
          variant="bordered"
          onClick={onOpen}
          className="w-full"
        >
          Add To-Do
        </Button>

        <ToDoList
          todos={todos}
          onComplete={onComplete}
          onEdit={onEdit}
          onRemove={onRemove}
          handleDragEnd={handleDragEnd}
          handleDragOver={handleDragOver}
          handleDragStart={handleDragStart}
        />
      </div>

      <Modal
        isOpen={isOpen}
        placement="center"
        backdrop="blur"
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {editMode ? "Edit To-Do" : "Add To-Do"}
              </ModalHeader>
              <ModalBody>
                <ToDoForm
                  onToDoFormChange={handleToDoFormChange}
                  title={toDo.title}
                  description={toDo.description}
                />
              </ModalBody>
              <ModalFooter>
                <Button
                  color="danger"
                  variant="light"
                  onClick={() => {
                    setEditMode(false);
                    clearForm();
                    onClose();
                  }}
                >
                  Close
                </Button>
                <Button color="primary" onPress={handleSubmit}>
                  Save
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default ToDoView;
