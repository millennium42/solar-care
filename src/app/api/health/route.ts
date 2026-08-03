export function GET() {
  return Response.json({
    environment: process.env.APP_ENV ?? "development",
    ok: true,
    service: "solar-care-web",
    uptime: Math.round(process.uptime()),
  });
}
