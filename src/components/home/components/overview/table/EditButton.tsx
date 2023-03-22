/* Import Types */
import { Dict } from "global/Types"

/* Import Icons */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEdit } from "@fortawesome/free-solid-svg-icons"


/* Props Typing */
interface Props {
    data: Dict,
    EditTarget: Function
};


const EditButton = (props: Props) => {
    const { data, EditTarget } = props;

    return (
        <button type="button" onClick={() => EditTarget(data.identifier)}>
            <FontAwesomeIcon icon={faEdit} />
        </button>
    );
}

export default EditButton;