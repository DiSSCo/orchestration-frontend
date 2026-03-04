import { useMutation } from '@tanstack/react-query';
import TriggerSourceSystemIngestion from 'api/sourceSystem/TriggerSourceSystemIngestion';

type TriggerIngestionParams = {
  sourceSystemId: string;
  token: string;
};

/**
* Hook that handles the state of a Source System ingestion when a POST request is made.
* It is used by the "Run Ingestion" button.
* @returns TanStack mutation object with the isError or isSuccess state. In the error state, the error is also available
* via the error property
*/
export const useTriggerSourceSystemIngestion = () => {
  return useMutation({
    mutationFn: (variables: TriggerIngestionParams) => {
      return TriggerSourceSystemIngestion(variables.sourceSystemId, variables.token);
    }
  });
};