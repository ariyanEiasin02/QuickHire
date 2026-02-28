import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api",
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("qh_token");
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
  job: ApiJob | string;
  name: string;
  email: string;
  resumeLink: string;
  coverNote: string;
  createdAt: string;
}

export const authAPI = {
  login: (email: string, password: string) =>
    api.post("/auth/login", { email, password }),
  register: (name: string, email: string, password: string, role?: string) =>
    api.post("/auth/register", { name, email, password, role }),
  getMe: () => api.get("/auth/me"),
};

export const jobsAPI = {
  getAll: (params?: { search?: string; category?: string; location?: string }) =>
    api.get<{ success: boolean; count: number; data: ApiJob[] }>("/jobs", { params }),
  getById: (id: string) =>
    api.get<{ success: boolean; data: ApiJob }>(`/jobs/${id}`),
  create: (data: {
    title: string;
    company: string;
    location: string;
    category: string;
    description: string;
  }) => api.post("/jobs", data),
  remove: (id: string) => api.delete(`/jobs/${id}`),
};

export const applicationsAPI = {
  submit: (data: {
    job: string;
    name: string;
    email: string;
    resumeLink: string;
    coverNote: string;
  }) => api.post<{ success: boolean; data: ApiApplication }>("/applications", data),
  getAll: () =>
    api.get<{ success: boolean; count: number; data: ApiApplication[] }>("/applications"),
};

export default api;
