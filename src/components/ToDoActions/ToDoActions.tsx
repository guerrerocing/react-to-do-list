import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPen,
  faTrashCan,
  faCheck,
  faRotateLeft,
} from "@fortawesome/free-solid-svg-icons";
import { Button } from "@nextui-org/react";
interface ToDoActionsItemProps {
  completed: boolean;
  onEdit: () => void;
  onDelete: () => void;
  onComplete: () => void;
}
const ToDoActions = ({
  completed,
  onDelete,
  onEdit,
  onComplete,
}: ToDoActionsItemProps) => {
  return (
    <div className="flex items-center gap-1 text-default-400">
      <div className="flex mx-4 gap-4 items-center">
        <Button isIconOnly color="danger" aria-label="Like" onClick={onDelete}>
          <FontAwesomeIcon className="text-lg " icon={faTrashCan} />
        </Button>
        <Button
          isIconOnly
          color="warning"
          variant="faded"
          aria-label="Take a photo"
          onClick={onEdit}
        >
          <FontAwesomeIcon className="text-lg " icon={faPen} />
        </Button>

        <Button
          isIconOnly
          color="success"
          variant="faded"
          aria-label="Take a photo"
          onClick={onComplete}
        >
          <FontAwesomeIcon
            className="text-lg "
            icon={completed ? faRotateLeft : faCheck}
          />
        </Button>
      </div>
    </div>
  );
};

export default ToDoActions;
