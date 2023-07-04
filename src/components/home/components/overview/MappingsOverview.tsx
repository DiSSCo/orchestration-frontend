/* Import Dependencies */
import KeycloakService from 'keycloak/Keycloak';

/* Import Store */
import { useAppSelector, useAppDispatch } from 'app/Hooks';
import { getMappings } from 'redux/mapping/MappingSlice';
import { setEditTarget } from 'redux/edit/EditSlice';

/* Import Types */
import { EditTarget, Dict } from 'global/Types';

/* Import Components */
import OverviewTable from './table/OverviewTable';
import EditButton from './table/EditButton';
import DeleteButton from './table/DeleteButton';

/* Import API */
import DeleteMapping from 'api/mapping/DeleteMapping';


/* Props Typing */
interface Props {
    ToggleModal: Function,
    UpdateMappings: Function
};


const MappingsOverview = (props: Props) => {
    const { ToggleModal, UpdateMappings } = props;

    /* Hooks */
    const dispatch = useAppDispatch();

    /* Base variables */
    const mappings = useAppSelector(getMappings);

    /* Function to edit a Mapping */
    const EditMapping = (mappingId: string) => {
        const editTarget: EditTarget = {};

        /* Fetch Mapping from existing array */
        editTarget.mapping = mappings.find(mapping => mapping.id === mappingId);

        /* Set edit target */
        dispatch(setEditTarget(editTarget));

        /* Open form modal */
        ToggleModal();
    }

    /* Function for removing a Mapping */
    const RemoveMapping = (mappingId: string) => {
        const confirmed: boolean = window.confirm(`Do you want to delete the Mapping with id: ${mappingId}`);

        if (confirmed) {
            DeleteMapping(mappingId, KeycloakService.GetToken());

            UpdateMappings(mappingId);
        }
    }

    /* Table rows */
    const rows: Dict[] = [];
    let index: number = 0;

    mappings.forEach((mapping) => {
        rows.push({
            index: index,
            identifier: mapping.id,
            name: mapping.name,
            description: mapping.description
        });

        index++;
    });

    /* Table columns */
    const columns = [
        { field: 'index', hide: true },
        { field: 'identifier', flex: 0.5, suppressSizeToFit: true, sortable: true },
        { field: 'name', flex: 1, suppressSizeToFit: true, sortable: true },
        { field: 'description', flex: 1, suppressSizeToFit: true, sortable: true },
        {
            field: 'edit',
            flex: 0.15,
            suppressSizeToFit: true,
            cellRenderer: EditButton,
            cellRendererParams: {
                EditTarget: (mappingId: string) => EditMapping(mappingId)
            }
        },
        {
            field: 'delete',
            flex: 0.2,
            suppressSizeToFit: true,
            cellRenderer: DeleteButton,
            cellRendererParams: {
                DeleteTarget: (mappingId: string) => RemoveMapping(mappingId)
            }
        }
    ];

    return <OverviewTable columns={columns} rows={rows} />
}

export default MappingsOverview;