export const fetchMoodEntries = async (userId) => {
    const res = await fetch(`http://localhost:3000/api/chat/${userId}`, {
      method: "GET",
      credentials: "include",
    });
  
    const response = await res.json();
  
    if (!res.ok) {
      throw new Error(response.error || "Failed to fetch mood entries");
    }
  
    const fetchedData = response.data.map((entry) => ({
      id: entry._id,
      date: new Date(entry.createdAt).toISOString().split("T")[0],
      mood: Number(entry.mood.score),
      moodLabel: entry.mood.mood,
      message: entry.prompt || "No message available",
    }));
  
    return fetchedData;
  };
  
  export const deleteAllMoodEntries = async (userId) => {
    const res = await fetch(`http://localhost:3000/api/chat/${userId}`, {
      method: "DELETE",
      credentials: "include",
    });
  
    const response = await res.json();
  
    if (!res.ok) {
      throw new Error(response.error || "Failed to delete mood entries");
    }
  
    return response;
  };
  