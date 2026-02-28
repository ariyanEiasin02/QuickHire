import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api",
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("qha_token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export interface ApiJob {
  _id: string;
  title: string;
  company: string;
  location: string;
  category: string;
  description: string;
  createdAt: string;
}

export interface ApiApplication {
  _id: string;
  job: { _id: string; title: string; company: string } | string;
  name: string;
  email: string;
  resumeLink: string;
  coverNote: string;
  createdAt: string;
}

export const authAPI = {
  login: (email: string, password: string) =>
    api.post("/auth/login", { email, password }),
  getMe: () => api.get("/auth/me"),
};

export const jobsAPI = {
  getAll: () => api.get<{ data: ApiJob[] }>("/jobs"),
  getById: (id: string) => api.get<{ data: ApiJob }>(`/jobs/${id}`),
  create: (data: Omit<ApiJob, "_id" | "createdAt">) => api.post<{ data: ApiJob }>("/jobs", data),
  update: (id: string, data: Omit<ApiJob, "_id" | "createdAt">) => api.put<{ data: ApiJob }>(`/jobs/${id}`, data),
  remove: (id: string) => api.delete(`/jobs/${id}`),
};

export const applicationsAPI = {
  getAll: () => api.get<{ data: ApiApplication[] }>("/applications"),
};

export default api;
