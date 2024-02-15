/* Import Store */
import { useAppSelector } from 'app/Hooks';
import { getMachineAnnotationServices } from 'redux/MAS/MASSlice';

/* Import Types */
import { Dict } from 'app/Types';

/* Import Components */
import OverviewTable from './table/OverviewTable';


/* Props Typing */
interface Props {
    ToggleModal: Function,
    UpdateMachineAnnotationServices: Function
};


const MASOverview = () => {
    /* Base variables */
    const machineAnnotationServices = useAppSelector(getMachineAnnotationServices);

    /* Table rows */
    const rows: Dict[] = [];
    let index: number = 0;

    machineAnnotationServices.forEach((machineAnnotationService) => {
        rows.push({
            index: index,
            identifier: machineAnnotationService.id,
            name: machineAnnotationService.name,
            containerImage: machineAnnotationService.containerImage,
            type: "MAS"
        });

        index++;
    });

    /* Table columns */
    const columns = [
        { field: 'index', hide: true },
        { field: 'identifier', flex: 0.5, suppressSizeToFit: true, sortable: true },
        { field: 'name', flex: 1, suppressSizeToFit: true, sortable: true },
        { field: 'containerImage', flex: 1, suppressSizeToFit: true, sortable: true }
    ];

    return <OverviewTable columns={columns} rows={rows} />
}

export default MASOverview;