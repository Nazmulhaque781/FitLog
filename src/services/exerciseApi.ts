const API_URL = "https://api.abcz.workers.dev/api/fitlog";

export const getExercises = async () => {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error(`Failed to fetch exercises: ${response.status}`);
  }

  const data = await response.json();

  return data;
};


// Single Exercise
export const getExerciseById = async (id: string) => {
  const response = await fetch(`${API_URL}/${id}`);

  if (!response.ok) {
    throw new Error(`Exercise not found: ${response.status}`);
  }

  const data = await response.json();

  return data;
};