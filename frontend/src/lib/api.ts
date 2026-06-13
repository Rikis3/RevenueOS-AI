import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000/api",
});

export const fetchExecutiveKPIs = async () => {
  const res = await api.get("/executive/kpis");
  return res.data;
};

export const fetchWBR = async () => {
  const res = await api.post("/ai/wbr");
  return res.data;
};

export const fetchRisks = async () => {
  const res = await api.post("/ai/risk-detection");
  return res.data;
};

export const fetchForecastInsights = async () => {
  const res = await api.post("/ai/forecast-insights");
  return res.data;
};

export const fetchNextBestActions = async () => {
  const res = await api.post("/ai/next-best-actions");
  return res.data;
};

export const fetchAttributionNarrative = async () => {
  const res = await api.post("/ai/attribution-narrative");
  return res.data;
};

export const fetchAttributionComparison = async () => {
  const res = await api.get("/attribution/comparison");
  return res.data;
};

export const fetchNLQ = async (question: string) => {
  const res = await api.post("/nlq/query", { question });
  return res.data;
};

// CRM EXPLORATION LAYER ENDPOINTS
export const fetchCRMAccounts = async () => {
  const res = await api.get("/crm/accounts");
  return res.data;
};

export const fetchCRMAccountDetail = async (id: string) => {
  const res = await api.get(`/crm/accounts/${id}`);
  return res.data;
};

export const fetchCRMOpportunities = async () => {
  const res = await api.get("/crm/opportunities");
  return res.data;
};

export const fetchCRMOpportunityDetail = async (id: string) => {
  const res = await api.get(`/crm/opportunities/${id}`);
  return res.data;
};

export const fetchCRMCampaigns = async () => {
  const res = await api.get("/crm/campaigns");
  return res.data;
};

export const fetchCRMCampaignDetail = async (id: string) => {
  const res = await api.get(`/crm/campaigns/${id}`);
  return res.data;
};

export const fetchCRMContacts = async () => {
  const res = await api.get("/crm/contacts");
  return res.data;
};

export const fetchCRMLeads = async () => {
  const res = await api.get("/crm/leads");
  return res.data;
};

export const fetchCRMActivities = async () => {
  const res = await api.get("/crm/activities");
  return res.data;
};
