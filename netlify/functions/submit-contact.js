export const handler = async (event) => {
  try {
    const data = event.body
      ? Object.fromEntries(new URLSearchParams(event.body))
      : {};

    const name = data.name || "N/A";
    const email = data.email || "N/A";
    const message = data.message || "N/A";

    // your Slack webhook URL
    const webhookUrl = process.env.SLACK_WEBHOOK_URL;

    const payload = {
      text: `:envelope_with_arrow: *New Contact Form Submission:*\n*Name:* ${name}\n*Email:* ${email}\n*Message:* ${message}`,
    };

    await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true }),
    };
  } catch (err) {
    console.error("Error sending to Slack:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to send message" }),
    };
  }
};
