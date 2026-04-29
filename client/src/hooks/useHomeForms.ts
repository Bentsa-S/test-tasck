import { useGetFormsQuery, useDeleteFormMutation } from '../store/api';

export const useHomeForms = () => {
  const { data, isLoading, error } = useGetFormsQuery();
  const [deleteForm, { isLoading: isDeleting }] = useDeleteFormMutation();

  const handleDelete = async (id: string) => {
    await deleteForm(id);
  };

  return {
    forms: data?.forms || [],
    isLoading,
    error,
    deleteForm: handleDelete,
    isDeleting,
  };
};
