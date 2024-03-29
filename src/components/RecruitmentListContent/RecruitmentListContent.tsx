import { GetPathsLinks } from '@/constants/paths';
import { formatISODateToDDMMYYYYHHMM, getRecruitmentStateMessage } from '@/helpers';
import { cn } from '@/lib/utils';
import { IRecruiterRecruitment } from '@/types/recruitmentsTypes';
import { useState } from 'react';
import { Link } from 'react-router-dom';

interface RecruitmentListContentProps {
  recruitments: IRecruiterRecruitment[];
}

const RecruitmentListContent = ({ recruitments }: RecruitmentListContentProps) => {
  const [recruitmentState, setRecruitmentState] = useState<1 | 2 | 3 | 4 | 5>(1);

  const TabElement = ({ state }: { state: 1 | 2 | 3 | 4 | 5 }) => (
    <div className={cn('rounded-md bg-dark_blue p-1')}>
      <button
        onClick={() => setRecruitmentState(state)}
        className={cn('w-full rounded-sm p-2 text-light/70 shadow-md', {
          'bg-light/20 text-light': state === recruitmentState,
        })}>
        {getRecruitmentStateMessage(state)}
      </button>
    </div>
  );

  const filteredRecruitments = recruitments.filter((recuitment) => recuitment.state === recruitmentState);

  return (
    <div className="flex flex-col gap-10">
      <div className="flex w-full flex-wrap gap-2">
        <TabElement state={1} />
        <TabElement state={2} />
        <TabElement state={3} />
        <TabElement state={4} />
        <TabElement state={5} />
      </div>
      <div className="flex flex-col gap-2">
        {filteredRecruitments.map((recruitment) => (
          <Link
            key={recruitment.id}
            to={GetPathsLinks.getPrepareRecruitment(recruitment.id)}
            className={cn(
              'group flex cursor-pointer flex-col gap-2 rounded-md bg-dark/5 p-2 text-dark shadow-sm hover:bg-orange hover:text-light',
            )}>
            <p className="font-semibold">{recruitment.jobOfferTitle}</p>
            <p className="font-semibold">
              Candidate: {recruitment.candidateName} {recruitment.candidateSurname}
            </p>
            {recruitment.recruiterName && recruitment.recruiterSurname && (
              <p className="font-semibold">
                Recruiter: {recruitment.recruiterName} {recruitment.recruiterSurname}
              </p>
            )}
            {recruitment.dateTechnical && (
              <p className="font-semibold">{formatISODateToDDMMYYYYHHMM(recruitment.dateTechnical)}</p>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RecruitmentListContent;
