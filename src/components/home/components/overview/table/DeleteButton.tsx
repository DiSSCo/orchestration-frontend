/* Import Types */
import { Dict } from "global/Types"

/* Import Styling */
import styles from 'components/home/home.module.scss';

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
        <button type="button"
            className={`${styles.formButton} ${styles.delete} px-3 py-2 h-75 mt-1 d-flex align-items-center`}
            onClick={() => DeleteTarget(data.identifier)}
        >
            <FontAwesomeIcon icon={faTrash} />
        </button>
    );
}

export default DeleteButton;