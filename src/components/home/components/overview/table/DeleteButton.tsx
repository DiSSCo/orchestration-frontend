/* Import Types */
import { Dict } from "global/Types"

/* Import Icons */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTrash } from "@fortawesome/free-solid-svg-icons"


/* Props Typing */
interface Props {
    data: Dict,
    DeleteTarget: Function
};


const DeleteButton = (props: Props) => {
    const { data, DeleteTarget } = props;

    return (
        <button type="button" onClick={() => DeleteTarget(data.identifier)}>
            <FontAwesomeIcon icon={faTrash} />
        </button>
    );
}

export default DeleteButton;