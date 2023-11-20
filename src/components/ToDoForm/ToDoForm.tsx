import { Input } from "@nextui-org/react";

interface ToDoFormProps {
  title?: string;
  description?: string;
  onToDoFormChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ToDoForm = ({ title, description, onToDoFormChange }: ToDoFormProps) => {
  return (
    <form className="flex flex-col gap-4 h-[300px]">
      <Input
        isRequired
        label="Title"
        placeholder="Enter Title"
        type="text"
        id="title"
        name="title"
        value={title}
        onChange={onToDoFormChange}
      />
      <Input
        isRequired
        label="Description"
        placeholder="Enter your description"
        type="text"
        id="description"
        name="description"
        value={description}
        onChange={onToDoFormChange}
      />
    </form>
  );
};

export default ToDoForm;
