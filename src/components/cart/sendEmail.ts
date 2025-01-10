interface EmailPayload {
  to: string;
  subject: string;
  html: string;
}

export const sendEmail = async (payload: EmailPayload) => {
  const { to, subject, html } = payload;

  try {
    const response = await fetch("http://127.0.0.1:8004/send_email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ to, subject, html }),
    });

    if (!response.ok) {
      throw new Error("Failed to send email. Server responded with an error.");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};
