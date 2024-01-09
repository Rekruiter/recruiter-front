import { updateJobOfferPut } from '@/api/jobOffers/addJobOffer';
import { getJobOfferWithDetails } from '@/api/jobOffers/jobOffers';
import NewJobOfferForm from '@/components/NewJobOfferForm/NewJobOfferForm';
import Spinner from '@/components/UI/Spinner/Spinner';
import { Paths } from '@/constants/paths';
import { IJobOfferInput } from '@/types/jobOfferTypes';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const EditJobOfferPage = () => {
  const { id } = useParams() as { id: string };

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate, isLoading: mutationLoading } = useMutation('editJobOffer', updateJobOfferPut, {
    onSuccess: () => {
      toast.success('Job offer edited successfully');
      navigate(Paths.companyJobOffers.path);
      queryClient.refetchQueries('companyJobOffers');
      // TODO: update query here instead of refetching. - do the same in Add job offer page
    },
    onError: () => {
      toast.error('Something went wrong');
    },
  });

  const {
    data: jobOfferWithDetails,
    isLoading: jobOfferWithDetailsLoading,
    isError: jobOfferWithDetailsError,
  } = useQuery(['jobOfferWithDetails', id], () => getJobOfferWithDetails(id), {
    cacheTime: 0,
  });

  const onSubmit = (data: IJobOfferInput) => {
    mutate({ ...data, id: id });
  };

  if (jobOfferWithDetailsError) {
    return <div className="m-auto">An error occured</div>;
  }

  if (jobOfferWithDetailsLoading) {
    return <Spinner />;
  }

  return (
    <div className="container flex flex-1 flex-col gap-3 bg-light p-8">
      <h3 className="mb-4 text-2xl font-semibold text-dark">Edit job offer</h3>
      {jobOfferWithDetails && (
        <NewJobOfferForm
          onSubmit={onSubmit}
          mutationLoading={mutationLoading}
          defaultValues={jobOfferWithDetails.companyJobOfferDto}
        />
      )}
    </div>
  );
};

export default EditJobOfferPage;
