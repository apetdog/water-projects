import { audits, notices, performances, personnel, projects, resources } from '#/mock/water-data';

export async function getProjectsApi() {
  return Promise.resolve(projects);
}

export async function getPersonnelApi() {
  return Promise.resolve(personnel);
}

export async function getNoticesApi() {
  return Promise.resolve(notices);
}

export async function getAuditsApi() {
  return Promise.resolve(audits);
}

export async function getPerformancesApi() {
  return Promise.resolve(performances);
}

export async function getResourcesApi() {
  return Promise.resolve(resources);
}
