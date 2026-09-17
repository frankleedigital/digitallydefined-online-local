// src/features/dashboard/api/dashboardApi.js
// Dashboard data fetching via the backend gateway.

import { callFastAPI } from '../../../api/backend.js';

export async function fetchDashboardData() {
  return callFastAPI('dashboard', {});
}

export async function runAgent(agentName, input = {}) {
  return callFastAPI(agentName, input);
}

export default { fetchDashboardData, runAgent };
