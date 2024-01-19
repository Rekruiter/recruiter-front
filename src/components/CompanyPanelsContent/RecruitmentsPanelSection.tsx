import { Link } from 'react-router-dom';
import { formatISODateToDDMMYYYYHHMM } from '../../helpers';
import { IRecruiterPanel } from '../../types/panelPageTypes';
import PanelSectionWrapper from '../UI/PanelSectionWrapper';
import { GetPathsLinks } from '@/constants/paths';

interface RecruitmentsPanelSectionProps {
  recruitments: IRecruiterPanel['recruitments'];
}

const RecruitmentsPanelSection = ({ recruitments }: RecruitmentsPanelSectionProps) => {
  return (
    <PanelSectionWrapper headerTitle="Your Recruitments">
      {recruitments.map((recruitment) => (
        <Link
          to={GetPathsLinks.getRecruitmentPreviewRecruiter(recruitment.id)}
          key={recruitment.id}
          className="flex w-full cursor-pointer flex-wrap rounded-md bg-light/5 p-2 text-light shadow-md hover:bg-orange">
          <div className="basis-full">
            <p className="line-clamp-1 overflow-hidden font-medium">
              {recruitment.candidateName} {recruitment.candidateSurname}
            </p>
          </div>
          <p className="basis-full font-semibold">Junior Java developer with analytic skills</p>
          <p className="md:text-cener">{formatISODateToDDMMYYYYHHMM(recruitment.date)}</p>
        </Link>
      ))}
    </PanelSectionWrapper>
  );
};

export default RecruitmentsPanelSection;
