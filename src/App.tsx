import { Navigate, RouteObject, RouterProvider, createBrowserRouter } from 'react-router-dom';
import HomePage from './pages/static-pages/HomePage';
import NotFound from './pages/static-pages/RouteNotFound';
import { useContext } from 'react';
import AuthContext from './context/auth-context';

import { AllPathsType, Paths, getRequiredRoles } from './constants/paths';
import PermissionDenied from './pages/static-pages/PermissionDenied';
import { wrapInLayout, wrapInPanelLayout } from './helpers';
import JobOfferPreviewPage from './pages/job-offers/JobOfferPreviewPage';
import RecruiterPanelPage from './pages/panels/RecruiterPanelPage';
import AdminPanelPage from './pages/panels/AdminPanelPage';
import UserPanelPage from './pages/panels/UserPanelPage';
import ResetPasswordConfirmPage from './pages/landing-pages/ResetPasswordConfirmPage';
import VerifyAccountPage from './pages/landing-pages/VerifyAccountPage';
import { wrapInEmptyLayout } from './helpers/getLayoutWrappers';
import CandidateApplicationPreviewPage from './pages/applications/CandidateApplicationPreviewPage';
import JobOfferListPage from './pages/job-offers/JobOfferListPage';
import TasksListPage from './pages/tasks/TasksListPage';
import PublicTasksInformationPage from './pages/static-pages/PublicTasksInformationPage';
import CompanyPage from './pages/static-pages/CompanyPage';
import CandidatePanelPage from './pages/panels/CandidatePanelPage';
import FillUpPersonalDataPage from './pages/settings/FillUpPersonalDataPage';
import PracticalTaskSolvePage from './pages/tasks/PracticalTaskSolvePage';
import AddJobOfferPage from './pages/job-offers/AddJobOfferPage';
import TheoreticalTaskSolvePage from './pages/tasks/TheoreticalTaskSolvePage';
import ProfileSettingsPage from './pages/settings/ProfileSettingsPage';
import CompanySettingsPage from './pages/settings/CompanySettingsPage';
import CompanyTasksPage from './pages/tasks/CompanyTasksPage';
import EditJobOfferPage from './pages/job-offers/EditJobOfferPage';
import CompanyJobOfferListPage from './pages/job-offers/CompanyJobOfferListPage';
import AddPracticalTaskPage from './pages/tasks/AddPracticalTaskPage';
import AddTheoreticalTaskPage from './pages/tasks/AddTheoreticalTaskPage';
import JobOfferApplicationsPage from './pages/job-offers/JobOfferApplicationsPage';
import EditPracticalTaskPage from './pages/tasks/EditPracticalTaskPage';
import EditTheoreticalTaskPage from './pages/tasks/EditTheoreticalTaskPage';
import ApplicationListPage from './pages/applications/ApplicationListPage';
import RecruiterApplicationPreviewPage from './pages/applications/RecruiterApplicationPreviewPage';
import RecruitmentListPage from './pages/recruitments/RecruitmentListPage';
import PrepareRecruitmentPage from './pages/recruitments/PrepareRecruitmentPage';
import RecruitersListPage from './pages/recruiters/RecruitersListPage';
import EditRecruiterPage from './pages/recruiters/EditRecruiterPage';
import AddRecruiterPage from './pages/recruiters/AddRecruiterPage';
import CreateRecruiterPage from './pages/landing-pages/CreateRecruiterPage';
import CompanyStatisticsPage from './pages/others/CompanyStatisticsPage';
import RecruitmentPreviewRecruiter from './pages/recruitments/RecruitmentPreviewRecruiter';
import RecruitmentPreviewCandidate from './pages/recruitments/RecruitmentPreviewCandidate';

function App() {
  const { role, isLoggedIn } = useContext(AuthContext);

  const PrivateRoute = (element: JSX.Element, pathName: AllPathsType) => {
    if (!isLoggedIn) {
      return <Navigate to={'/?authorization=login'} />;
    }
    const requiredRoles = getRequiredRoles(pathName);
    if (requiredRoles.length !== 0 && !requiredRoles.includes(role!)) {
      return wrapInPanelLayout(<PermissionDenied />);
    }
    return wrapInPanelLayout(element);
  };

  const getDefaultHomeRoute = () => {
    switch (role) {
      case 'user':
        return wrapInPanelLayout(<UserPanelPage />);
      case 'candidate':
        return wrapInPanelLayout(<CandidatePanelPage />);
      case 'recruiter':
      case 'techRecruiter':
        return wrapInPanelLayout(<RecruiterPanelPage />);
      case 'admin':
        return wrapInPanelLayout(<AdminPanelPage />);
      default:
        return wrapInLayout(<HomePage />, true);
    }
  };

  const routesConfig: RouteObject[] = [
    { path: Paths.home.path, element: getDefaultHomeRoute() },
    { path: Paths.fillUpPersonalData.path, element: PrivateRoute(<FillUpPersonalDataPage />, 'fillUpPersonalData') },
    { path: Paths.notFound.path, element: wrapInLayout(<NotFound />) },
    { path: Paths.jobOffers.path, element: wrapInLayout(<JobOfferListPage />) },
    { path: Paths.jobOfferPreview.path, element: wrapInLayout(<JobOfferPreviewPage />) },
    {
      path: Paths.company.path,
      element: wrapInLayout(<CompanyPage />),
    },
    {
      path: Paths.resetPasswordConfirm.path,
      element: wrapInEmptyLayout(<ResetPasswordConfirmPage />),
    },
    {
      path: Paths.verifyAccount.path,
      element: wrapInEmptyLayout(<VerifyAccountPage />),
    },
    {
      path: Paths.createRecruiter.path,
      element: wrapInEmptyLayout(<CreateRecruiterPage />),
    },
    {
      path: Paths.candidateApplications.path,
      element: PrivateRoute(<ApplicationListPage type="candidate" />, 'candidateApplications'),
    },
    {
      path: Paths.candidateApplicationPreview.path,
      element: PrivateRoute(<CandidateApplicationPreviewPage />, 'candidateApplicationPreview'),
    },
    {
      path: Paths.recruiterApplications.path,
      element: PrivateRoute(<ApplicationListPage type="recruiter" />, 'recruiterApplications'),
    },
    {
      path: Paths.tasks.path,
      element: !isLoggedIn ? wrapInLayout(<PublicTasksInformationPage />) : PrivateRoute(<TasksListPage />, 'tasks'),
    },
    {
      path: Paths.profileSettings.path,
      element: PrivateRoute(<ProfileSettingsPage />, 'profileSettings'),
    },
    {
      path: Paths.practicalTaskSolve.path,
      element: PrivateRoute(<PracticalTaskSolvePage />, 'practicalTaskSolve'),
    },
    {
      path: Paths.theoreticalTaskSolve.path,
      element: PrivateRoute(<TheoreticalTaskSolvePage />, 'theoreticalTaskSolve'),
    },
    {
      path: Paths.addJobOffer.path,
      element: PrivateRoute(<AddJobOfferPage />, 'addJobOffer'),
    },
    {
      path: Paths.editJobOffer.path,
      element: PrivateRoute(<EditJobOfferPage />, 'editJobOffer'),
    },
    {
      path: Paths.companySettings.path,
      element: PrivateRoute(<CompanySettingsPage />, 'companySettings'),
    },
    {
      path: Paths.manageCompanyTasks.path,
      element: PrivateRoute(<CompanyTasksPage />, 'manageCompanyTasks'),
    },
    {
      path: Paths.companyJobOffers.path,
      element: PrivateRoute(<CompanyJobOfferListPage />, 'companyJobOffers'),
    },
    {
      path: Paths.addPracticalTask.path,
      element: PrivateRoute(<AddPracticalTaskPage />, 'addPracticalTask'),
    },
    {
      path: Paths.addTheoreticalTask.path,
      element: PrivateRoute(<AddTheoreticalTaskPage />, 'addTheoreticalTask'),
    },
    {
      path: Paths.jobOfferApplications.path,
      element: PrivateRoute(<JobOfferApplicationsPage />, 'jobOfferApplications'),
    },
    {
      path: Paths.editPracticalTask.path,
      element: PrivateRoute(<EditPracticalTaskPage />, 'editPracticalTask'),
    },
    {
      path: Paths.editTheoreticalTask.path,
      element: PrivateRoute(<EditTheoreticalTaskPage />, 'editTheoreticalTask'),
    },
    {
      path: Paths.recruiterApplicationPreview.path,
      element: PrivateRoute(<RecruiterApplicationPreviewPage />, 'recruiterApplicationPreview'),
    },
    {
      path: Paths.recruiterRecruitments.path,
      element: PrivateRoute(<RecruitmentListPage />, 'recruiterRecruitments'),
    },
    {
      path: Paths.prepareRecruitment.path,
      element: PrivateRoute(<PrepareRecruitmentPage />, 'prepareRecruitment'),
    },
    {
      path: Paths.recruiters.path,
      element: PrivateRoute(<RecruitersListPage />, 'recruiters'),
    },
    {
      path: Paths.addRecruiter.path,
      element: PrivateRoute(<AddRecruiterPage />, 'addRecruiter'),
    },
    {
      path: Paths.editRecruiter.path,
      element: PrivateRoute(<EditRecruiterPage />, 'editRecruiter'),
    },
    {
      path: Paths.companyStatistics.path,
      element: PrivateRoute(<CompanyStatisticsPage />, 'companyStatistics'),
    },
    {
      path: Paths.recruitmentPreviewRecruiter.path,
      element: PrivateRoute(<RecruitmentPreviewRecruiter />, 'recruitmentPreviewRecruiter'),
    },
    {
      path: Paths.recruitmentPreviewCandidate.path,
      element: PrivateRoute(<RecruitmentPreviewCandidate />, 'recruitmentPreviewCandidate'),
    },
  ];

  const router = createBrowserRouter(routesConfig);

  return <RouterProvider router={router} />;
}

export default App;
