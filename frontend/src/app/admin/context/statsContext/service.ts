/*
import { StatsFilter } from "./types";

export const fetchStats = async (filter: StatsFilter, token: string) => {
  try {
    const response = await fetch(`/api/stats/${filter}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erro ao buscar estatísticas:", error);
    throw error;
  }
};
*/