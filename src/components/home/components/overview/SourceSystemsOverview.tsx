/* Import Dependencies */
import KeycloakService from 'keycloak/Keycloak';

/* Import Store */
import { useAppSelector, useAppDispatch } from 'app/Hooks';
import { getSourceSystems } from 'redux/sourceSystem/SourceSystemSlice';
import { getMappings } from 'redux/mapping/MappingSlice';
import { setEditTarget } from 'redux/edit/EditSlice';

/* Import Types */
import { EditTarget, Dict } from 'global/Types';

/* Import Styles */
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

/* Import Components */
import OverviewTable from './table/OverviewTable';
import EditButton from './table/EditButton';
import DeleteButton from './table/DeleteButton';

/* Import API */
import DeleteSourceSystem from 'api/sourceSystem/DeleteSourceSystem';


/* Props Typing */
interface Props {
    ToggleModal: Function,
    UpdateSourceSystems: Function
};


const SourceSystemsOverview = (props: Props) => {
    const { ToggleModal, UpdateSourceSystems } = props;

    /* Hooks */
    const dispatch = useAppDispatch();

    /* Base variables */
    const sourceSystems = useAppSelector(getSourceSystems);
    const mappings = useAppSelector(getMappings);

    /* Function to edit a Source System */
    const EditSourceSystem = (sourceSystemId: string) => {
        const editTarget: EditTarget = {};

        /* Fetch Source System from existing array */
        editTarget.sourceSystem = sourceSystems.find(sourceSystem => sourceSystem.id === sourceSystemId);

        /* Try to fetch Mapping belonging to Source System */
        editTarget.mapping = mappings.find(mapping => mapping.id === editTarget.sourceSystem?.mappingId);

        /* Set edit target */
        dispatch(setEditTarget(editTarget));

        /* Open form modal */
        ToggleModal();
    }

    /* Function for removing a Source System */
    const RemoveSourceSystem = async (sourceSystemId: string) => {
        const confirmed: boolean = window.confirm(`Do you want to delete the Source System with id: ${sourceSystemId}`);

        if (confirmed) {
            DeleteSourceSystem(sourceSystemId, KeycloakService.GetToken());

            UpdateSourceSystems(sourceSystemId);
        }
    }

    /* Table rows */
    const rows: Dict[] = [];

    sourceSystems.forEach((sourceSystem) => {
        rows.push({
            identifier: sourceSystem.id,
            name: sourceSystem.name,
            endpoint: sourceSystem.endpoint
        });
    });

    /* Table columns */
    const columns = [
        { field: 'identifier', flex: 0.5, suppressSizeToFit: true, sortable: true },
        { field: 'name', flex: 1, suppressSizeToFit: true, sortable: true },
        { field: 'endpoint', flex: 1, suppressSizeToFit: true, sortable: true },
        {
            field: 'edit',
            flex: 0.15,
            suppressSizeToFit: true,
            cellRenderer: EditButton,
            cellRendererParams: {
                EditTarget: (sourceSystemId: string) => EditSourceSystem(sourceSystemId)
            }
        },
        {
            field: 'delete',
            flex: 0.2,
            suppressSizeToFit: true,
            cellRenderer: DeleteButton,
            cellRendererParams: {
                DeleteTarget: (sourceSystemId: string) => RemoveSourceSystem(sourceSystemId)
            }
        }
    ];

    return <OverviewTable columns={columns} rows={rows} />
}

export default SourceSystemsOverview;