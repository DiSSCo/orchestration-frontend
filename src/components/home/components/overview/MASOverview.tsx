/* Import Dependencies */
import { useNavigate } from 'react-router-dom';

/* Import Store */
import { useAppSelector } from 'app/Hooks';
import { getMachineAnnotationServices } from 'redux-store/MasSlice';

/* Import Types */
import { Dict } from 'app/Types';

/* Import Config */
import MASOverviewTableConfig from 'app/config/tables/MASOverviewTableConfig';

/* Import Components */
import DataTable from 'components/general/tables/DataTable';


/* Props Typing */
interface Props {
    ToggleModal: Function,
    UpdateMachineAnnotationServices: Function
};


const MASOverview = () => {
    /* Hooks */
    const navigate = useNavigate();

    /* Base variables */
    const machineAnnotationServices = useAppSelector(getMachineAnnotationServices);

    /* Data Row Typing */
    interface DataRow {
        index: number,
        id: string,
        name: string,
        containerImage: string
    };

    /* Table rows */
    const rows: Dict[] = [];
    let index: number = 0;

    machineAnnotationServices.forEach((machineAnnotationService) => {
        rows.push({
            index: index,
            id: machineAnnotationService.id,
            name: machineAnnotationService.name,
            containerImage: machineAnnotationService.containerImage,
            type: "MAS"
        });

        index++;
    });

    /* Table columns */
    const { columns } = MASOverviewTableConfig();

    return (
        <div className="h-100 overflow-scroll b-secondary rounded-c">
            <DataTable columns={columns}
                data={rows}
                SelectAction={(row: DataRow) => navigate(`/MAS/${row.id}`)}
            />
        </div>
    );
}

export default MASOverview;