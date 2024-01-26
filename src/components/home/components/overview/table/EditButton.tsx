/* Import Types */
import { Dict } from "app/Types"

/* Import Styles */
import styles from 'components/home/home.module.scss';

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
        <button type="button"
            className={`${styles.formButton} bgc-accent px-3 py-2 h-75 mt-1 d-flex align-items-center`}
            onClick={() => EditTarget(data.identifier)}
        >
            <FontAwesomeIcon icon={faEdit} />
        </button>
    );
}

export default EditButton;