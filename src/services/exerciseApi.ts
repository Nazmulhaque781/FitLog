const API_URL = "https://api.api-store.workers.dev/api/fitlog";

export const getExercises = async () => {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Failed to fetch exercises");
  }

  return response.json();
};

export const getExerciseById = async (id: string) => {
  const response = await fetch(`${API_URL}/${id}`);

  if (!response.ok) {
    throw new Error("Failed to fetch exercise");
  }

  return response.json();
};