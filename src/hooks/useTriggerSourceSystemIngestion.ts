import { useMutation } from '@tanstack/react-query';
import TriggerSourceSystemIngestion from 'api/sourceSystem/TriggerSourceSystemIngestion';

type TriggerIngestionVariables = {
  sourceSystemId: string;
  token: string;
};

export const useTriggerSourceSystemIngestion = () => {
  return useMutation({
    mutationFn: (variables: TriggerIngestionVariables) => {
      return TriggerSourceSystemIngestion(variables.sourceSystemId,variables.token);
    }
  });
};