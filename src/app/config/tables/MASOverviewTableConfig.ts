/* Import Dependencies */
import { createColumnHelper } from '@tanstack/react-table';


const MASOverviewTableConfig = () => {
    interface DataRow {
        index: number,
        id: string,
        name: string,
        containerImage: string
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
        columnHelper.accessor('containerImage', {
            header: 'Container Image',
            meta: {
                widthInRem: 16
            }
        })
    ];

    return {
        columns: columns
    };
}

export default MASOverviewTableConfig;