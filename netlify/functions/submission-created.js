// netlify/functions/submission-created.js

export const handler = async (event) => {
  const body = JSON.parse(event.body);

  if (body.event !== "submission_created") {
    return {
      statusCode: 200,
      body: "Not a form submission event",
    };
  }

  const submission = body.payload.data;
  const text = `📩 *New Contact Form Submission:*\n
*Name:* ${submission.name || "-"}\n
*Email:* ${submission.email || "-"}\n
*Message:* ${submission.message || "-"}`;

  try {
    const response = await fetch(process.env.SLACK_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });

    if (!response.ok) {
      throw new Error(`Slack responded with ${response.status}`);
    }

    return {
      statusCode: 200,
      body: "Message sent to Slack",
    };
  } catch (error) {
    console.error("Slack webhook failed:", error);
    return {
      statusCode: 500,
      body: "Error sending message to Slack",
    };
  }
};
