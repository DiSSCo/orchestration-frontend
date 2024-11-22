/* Import Dependencies */
import { createColumnHelper } from '@tanstack/react-table';


const SourceSystemsOverviewTableConfig = () => {
    interface DataRow {
        index: number,
        id: string,
        name: string,
        endpoint: string
    };

    /* Base variables */
    const columnHelper = createColumnHelper<DataRow>();

    const columns = [
        columnHelper.accessor('id', {
            header: 'Identifier',
            meta: {
                widthInRem: 14,
                sortable: true
            }
        }),
        columnHelper.accessor('name', {
            header: 'Name',
            meta: {
                widthInRem: 16,
                sortable: true
            }
        }),
        columnHelper.accessor('endpoint', {
            header: 'Endpoint',
            meta: {
                widthInRem: 20
            }
        })
    ];

    return {
        columns: columns
    };
}

export default SourceSystemsOverviewTableConfig;