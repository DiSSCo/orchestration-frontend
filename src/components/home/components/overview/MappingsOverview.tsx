/* Import Dependencies */
import { useNavigate } from 'react-router-dom';

/* Import Store */
import { useAppSelector } from 'app/Hooks';
import { getMappings } from 'redux-store/MappingSlice';

/* Import Types */
import { Dict } from 'app/Types';

/* Import Config */
import MappingsOverviewTableConfig from 'app/config/tables/MappingsOverviewTableConfig';

/* Import Components */
import DataTable from 'components/general/tables/DataTable';


const MappingsOverview = () => {
    /* Hooks */
    const navigate = useNavigate();

    /* Base variables */
    const mappings = useAppSelector(getMappings);

    /* Data Row Typing */
    interface DataRow {
        index: number,
        id: string,
        name: string,
        description: string
    };

    /* Table rows */
    const rows: Dict[] = [];
    let index: number = 0;

    mappings.forEach((mapping) => {
        rows.push({
            index: index,
            id: mapping.id,
            name: mapping.name,
            description: mapping.description,
            type: "mapping"
        });

        index++;
    });

    /* Table columns */
    const { columns } = MappingsOverviewTableConfig();

    return (
        <div className="h-100 overflow-scroll b-secondary rounded-c">
            <DataTable columns={columns}
                data={rows}
                SelectAction={(row: DataRow) => navigate(`/mapping/${row.id}`)}
            />
        </div>
    );
}

export default MappingsOverview;