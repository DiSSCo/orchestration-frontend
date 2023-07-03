/* Import Dependencies */
import KeycloakService from 'keycloak/Keycloak';

/* Import Store */
import { useAppSelector, useAppDispatch } from 'app/Hooks';
import { getMachineAnnotationServices } from 'redux/MAS/MASSlice';
import { setEditTarget } from 'redux/edit/EditSlice';

/* Import Types */
import { EditTarget, Dict } from 'global/Types';

/* Import Components */
import OverviewTable from './table/OverviewTable';
import EditButton from './table/EditButton';
import DeleteButton from './table/DeleteButton';

/* Import API */
import DeleteMAS from 'api/mas/DeleteMAS';


/* Props Typing */
interface Props {
    ToggleModal: Function,
    UpdateMachineAnnotationServices: Function
};


const MASOverview = (props: Props) => {
    const { ToggleModal, UpdateMachineAnnotationServices } = props;

    /* Hooks */
    const dispatch = useAppDispatch();

    /* Base variables */
    const machineAnnotationServices = useAppSelector(getMachineAnnotationServices);

    /* Function to edit a Mapping */
    const EditMachineAnnotationService = (MASId: string) => {
        const editTarget: EditTarget = {};

        /* Fetch Mapping from existing array */
        editTarget.MAS = machineAnnotationServices.find(MAS => MAS.id === MASId);

        /* Set edit target */
        dispatch(setEditTarget(editTarget));

        /* Open form modal */
        ToggleModal();
    }

    /* Function for removing a Mapping */
    const RemoveMAS = (MASId: string) => {
        const confirmed: boolean = window.confirm(`Do you want to delete the Machine annotation service with id: ${MASId}`);

        if (confirmed) {
            DeleteMAS(MASId, KeycloakService.GetToken());

            UpdateMachineAnnotationServices(MASId);
        }
    }

    /* Table rows */
    const rows: Dict[] = [];

    machineAnnotationServices.forEach((machineAnnotationService) => {
        rows.push({
            identifier: machineAnnotationService.id,
            name: machineAnnotationService.name,
            containerImage: machineAnnotationService.containerImage
        });
    });

    /* Table columns */
    const columns = [
        { field: 'identifier', flex: 0.5, suppressSizeToFit: true, sortable: true },
        { field: 'name', flex: 1, suppressSizeToFit: true, sortable: true },
        { field: 'containerImage', flex: 1, suppressSizeToFit: true, sortable: true },
        {
            field: 'edit',
            flex: 0.15,
            suppressSizeToFit: true,
            cellRenderer: EditButton,
            cellRendererParams: {
                EditTarget: (MASId: string) => EditMachineAnnotationService(MASId)
            }
        },
        {
            field: 'delete',
            flex: 0.2,
            suppressSizeToFit: true,
            cellRenderer: DeleteButton,
            cellRendererParams: {
                DeleteTarget: (MASId: string) => RemoveMAS(MASId)
            }
        }
    ];

    return <OverviewTable columns={columns} rows={rows} />
}

export default MASOverview;