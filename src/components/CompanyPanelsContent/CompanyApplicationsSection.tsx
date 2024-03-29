import { useNavigate } from 'react-router-dom';
import { IRecruiterPanel } from '../../types/panelPageTypes';
import PanelSectionWrapper from '../UI/PanelSectionWrapper';
import { GetPathsLinks, Paths } from '../../constants/paths';

interface CompanyApplicationsSectionProps {
  applications: IRecruiterPanel['applications'];
}

const CompanyApplicationsSection = ({ applications }: CompanyApplicationsSectionProps) => {
  const navigate = useNavigate();

  return (
    <PanelSectionWrapper
      headerClickHandler={() => {
        navigate(Paths.recruiterApplications.path);
      }}
      headerTitle="Applications">
      {applications.map((application) => (
        <div
          key={application.id}
          className="flex w-full cursor-pointer flex-wrap rounded-md bg-light/5 p-2 text-light shadow-md hover:bg-orange"
          onClick={() => {
            navigate(GetPathsLinks.getRecruiterApplicationPreview(application.id));
          }}>
          <div className="basis-full">
            <p className="line-clamp-1 overflow-hidden">
              <span className="font-medium">
                {application.candidateName} {application.candidateSurname}
              </span>{' '}
              applied for:
            </p>
          </div>
          <p className="line-clamp-1 basis-full font-semibold">{application.jobOfferTitle}</p>
          {application.expectedSalary && (
            <p className="md:text-cener">
              His exptected salary is{' '}
              <span className="font-medium">
                {application.expectedSalary} {application.currency}
              </span>
            </p>
          )}
        </div>
      ))}
    </PanelSectionWrapper>
  );
};

export default CompanyApplicationsSection;
