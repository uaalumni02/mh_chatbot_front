export const sendChatPrompt = async (userName, prompt) => {
    const res = await fetch("http://localhost:3000/api/v1/chat/completions", {
      credentials: "include",
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userName, prompt }),
    });
  
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error || "Something went wrong");
    }
  
    return data.data;
  };
  