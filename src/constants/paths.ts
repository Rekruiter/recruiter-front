import { IAuthorizationObject } from '../types/authorizationTypes';

export type PathType = {
  path: string;
  requiredRoles?: IAuthorizationObject['role'][];
  headerSignature?: string;
};

type HeaderPathType = {
  path: PathType['path'];
  headerSignature: string;
};

// When creating new path make sure to assign element in BrowserRouter in App.tsx

const allPaths = [
  'home',
  'notFound',
  'jobOffers',
  'newJobOffer',
  'jobOfferPreview',
  'candidateApplications',
  'candidateApplicationPreview',
  'recruiterApplications',
  'recruiterApplicationsPreview',
  'resetPasswordConfirm',
  'verifyAccount',
  'fillUpPersonalData',
] as const;

export type AllPathsType = (typeof allPaths)[number];

export const GetPathsLinks = {
  getJobOfferPreview: (id: number) => `/job-offers/${id}`,
  getJobOffersWithFilters: (idCompany?: number) => `/job-offers${idCompany ? `?idCompany=${idCompany}` : ''}`,
  getCandidateApplicationPreview: (id: number) => `/candidate-applications/${id}`,
  getRecruiterApplicationPreview: (id: number) => `/recruiter-applications/${id}`,
};

export const Paths: Record<(typeof allPaths)[number], PathType> = {
  home: {
    path: '/',
    headerSignature: 'Home',
  },
  notFound: {
    path: '*',
  },
  jobOffers: {
    path: '/job-offers',
    headerSignature: 'Job offers',
  },
  newJobOffer: {
    path: '/job-offers/new',
    requiredRoles: ['admin', 'recruiter', 'techRecruiter', 'user'],
  },
  jobOfferPreview: {
    path: '/job-offers/:id',
  },
  candidateApplications: {
    path: '/candidate-applications',
    requiredRoles: ['candidate'],
    headerSignature: 'Applications',
  },
  candidateApplicationPreview: {
    path: '/candidate-applications/:id',
    requiredRoles: ['candidate'],
  },
  recruiterApplications: {
    path: '/recruiter-applications',
    headerSignature: 'Applications',
    requiredRoles: ['recruiter', 'techRecruiter', 'admin'],
  },
  recruiterApplicationsPreview: {
    path: '/recruiter-applications/:id',
    requiredRoles: ['recruiter', 'techRecruiter', 'admin'],
  },
  resetPasswordConfirm: {
    path: '/reset/:token',
  },
  verifyAccount: {
    path: '/verify/:token',
  },
  fillUpPersonalData: {
    path: 'personal-data',
  },
};

export const getRequiredRoles = (path: (typeof allPaths)[number]): IAuthorizationObject['role'][] => {
  return Paths[path].requiredRoles ?? [];
};

const getRoleToPath = (role: IAuthorizationObject['role']) => {
  return Object.values(Paths).filter((value) => !value.requiredRoles || value.requiredRoles.includes(role));
};

const getHeaderPath = (allPathsByRole: PathType[]) => {
  return allPathsByRole
    .map((value) => {
      return {
        path: value.path,
        headerSignature: value.headerSignature,
      };
    })
    .filter((value): value is HeaderPathType => value.headerSignature !== undefined);
};

const roleToPath: Record<IAuthorizationObject['role'], PathType[]> = {
  admin: getRoleToPath('admin'),
  candidate: getRoleToPath('candidate'),
  recruiter: getRoleToPath('recruiter'),
  techRecruiter: getRoleToPath('techRecruiter'),
  user: getRoleToPath('user'),
};

export const headerPathsByRole: Record<IAuthorizationObject['role'], HeaderPathType[]> = {
  admin: getHeaderPath(roleToPath.admin),
  candidate: getHeaderPath(roleToPath.candidate),
  recruiter: getHeaderPath(roleToPath.recruiter),
  techRecruiter: getHeaderPath(roleToPath.techRecruiter),
  user: getHeaderPath(roleToPath.user),
};

export const headerDefaultRoles: HeaderPathType[] = Object.values(Paths).filter(
  (value): value is HeaderPathType => value.headerSignature !== undefined && value.requiredRoles === undefined,
);
