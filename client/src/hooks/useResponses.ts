import { useParams } from 'react-router-dom';
import { useGetFormQuery, useGetResponsesQuery } from '../store/api';

export const useResponses = () => {
  const { id } = useParams<{ id: string }>();
  const { data: formData, isLoading: isFormLoading } = useGetFormQuery(id!);
  const { data: responsesData, isLoading: isRespLoading } = useGetResponsesQuery(id!);

  return {
    form: formData?.form,
    responses: responsesData?.responses || [],
    isLoading: isFormLoading || isRespLoading,
  };
};
