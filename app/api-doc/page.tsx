
"use client";

import "swagger-ui-react/swagger-ui.css";
import dynamic from "next/dynamic";

const SwaggerUI = dynamic(() => import("swagger-ui-react"), {
  ssr: false,
});

const spec = {
  openapi: "3.0.3",
  info: {
    title: "Dravit Portfolio API",
    version: "1.0.0",
    description: "API documentation for dravit.in",
  },
  servers: [
    { url: "https://dravit.in", description: "Production" },
    {
      url: "https://urban-couscous-rqq94q9w6g5fp7p9-3000.app.github.dev",
      description: "GitHub Codespaces",
    },
  ],
  paths: {
    "/api/contact": {
      post: {
        summary: "Submit contact form",
        description: "Submit a message through the portfolio contact form.",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  name: { type: "string" },
                  email: { type: "string", format: "email" },
                  message: { type: "string" },
                },
                required: ["name", "email", "message"],
              },
            },
          },
        },
        responses: {
          "200": { description: "Request processed successfully" },
          "400": { description: "Invalid request" },
          "500": { description: "Server error" },
        },
      },
    },
  },
};

export default function ApiDocumentationPage() {
  return (
    <main>
      <SwaggerUI spec={spec} />
    </main>
  );
}
