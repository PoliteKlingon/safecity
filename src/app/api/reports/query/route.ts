import { sql } from "@vercel/postgres";

const getReports = async (
  latitude: number | undefined,
  longitude: number | undefined,
) => {
  if (!latitude || !longitude) return [];

  const now = new Date();
  const eightHoursAgo = new Date(now.getTime() - 8 * 60 * 60 * 1000);

  // Define a reasonable distance threshold in kilometers (e.g., 10km)
  const distanceThreshold = 10;

  // ChatGPT generated, not tested
  return (
    await sql`
      SELECT 
        *, 
        ( 6371 * acos( cos( radians(${latitude}) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians(${longitude}) ) + sin( radians(${latitude}) ) * sin( radians( latitude ) ) ) ) AS distance 
      FROM reports 
      WHERE 
        date >= ${eightHoursAgo.toISOString()} 
      HAVING 
        distance <= ${distanceThreshold}
    `
  ).rows;
};

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { latitude, longitude } = body;
    const reports = await getReports(latitude, longitude);
    if (reports) {
      return new Response(JSON.stringify(reports), { status: 200 });
    } else {
      return new Response("Not found", { status: 404 });
    }
  } catch (e) {
    console.log(e);
    return new Response("Internal error", { status: 500 });
  }
}
