export const submitJournalEntry = async (userName, journal) => {
  const res = await fetch("http://localhost:3000/api/journal", {
    credentials: "include",
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userName, journal }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || "Unable to save journal entry.");
  }

  return data;
};
