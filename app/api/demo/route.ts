import type { DemoResponse } from "@/lib/shared/api";

export async function GET() {
  const response: DemoResponse = {
    message: "Hello from Next.js API route",
  };
  return Response.json(response);
}
