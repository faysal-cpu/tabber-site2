import type { PingResponse } from "@/lib/shared/api";

export async function GET() {
  const ping = process.env.PING_MESSAGE ?? "ping";
  const response: PingResponse = { message: ping };
  return Response.json(response);
}
