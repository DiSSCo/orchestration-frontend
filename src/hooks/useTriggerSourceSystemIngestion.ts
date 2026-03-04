import { useMutation } from '@tanstack/react-query';
import TriggerSourceSystemIngestion from 'api/sourceSystem/TriggerSourceSystemIngestion';
import { useToast } from "components/elements/notifications/ToastProvider";

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
  const toast = useToast();
  return useMutation({
    mutationFn: (variables: TriggerIngestionParams) => {
      return TriggerSourceSystemIngestion(variables.sourceSystemId, variables.token);
    },
    onSuccess: () => {
      toast?.showToast("Ingestion is scheduled successfully", "success");
    },
    onError: () => {
      toast?.showToast(
        "Source System not found","danger");
    },
  });
};