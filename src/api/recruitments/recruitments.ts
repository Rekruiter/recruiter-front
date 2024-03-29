import {
  IInviteCandidateForRecruitment,
  IManageTasksForRecruitment,
  RecruiterRecruitmentListSchema,
  RecruiterRecruitmentSchema,
  RecruitmentLinkSchema,
} from '@/types/recruitmentsTypes';
import axios from '../axios/axios';

export const acceptOrRejectRecruitment = async (inputData: { isAccepted: boolean; id: number }) => {
  const { id, ...rest } = inputData;
  await axios.post(`/recruitmentInvitations/${id}/acceptOrReject`, rest);
};

export const getRecruiterRecruitmentList = async () => {
  const { data } = await axios.get('/recruitmentsForRecruiter');
  return RecruiterRecruitmentListSchema.parse(data);
};

export const getRecruiterRecruitment = async (id: string) => {
  const { data } = await axios.get(`/recruitmentsForRecruiter/${id}`);
  return RecruiterRecruitmentSchema.parse(data);
};

export const planTechnicalRecruitment = async (inputData: IInviteCandidateForRecruitment & { id: number }) => {
  const { id, DateTechnical, idRecruiter } = inputData;
  const input = {
    idRecruiter,
    dateTechnical: new Date(DateTechnical).toISOString(),
  };
  await axios.post(`/recruitments/${id}/planTechnicalRecruitment`, input);
};

export const updateRecruitmentTasks = async (inputData: IManageTasksForRecruitment & { id: number }) => {
  const { id, ...rest } = inputData;
  await axios.put(`/recruitments/${id}/updateTasks`, {
    TaskIds: rest.tasks.map((task) => task.idTask),
  });
};

export const sendRecruitmentFeedback = async (inputData: { id: string; feedback: string }) => {
  await axios.put(`/recruitments/${inputData.id}/sendFeedback`, {
    feedback: inputData.feedback,
  });
};

export const getRecruitmentLink = async (id: string) => {
  const { data } = await axios.get(`/recruitments/${id}/getLink`);

  if (!data) {
    return undefined;
  }
  return RecruitmentLinkSchema.parse(data);
};

export const endRecruitment = async (id: string) => {
  await axios.post(`/recruitments/${id}/end`);
};

export const startRecruitment = async (id: string) => {
  await axios.put(`/recruitments/${id}/generateLink`);
};
