export const downloadUserPdf = async (userId) => {
  try {
    const response = await fetch(`http://localhost:3000/api/pdf/${userId}`, {
      method: "GET",
      credentials: "include",
    });

    const blob = await response.blob();
    const pdfUrl = URL.createObjectURL(blob);
    window.open(pdfUrl);
  } catch (error) {
    console.error("PDF download error:", error);
    throw error;
  }
};
