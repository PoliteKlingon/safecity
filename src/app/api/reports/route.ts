import { sql } from "@vercel/postgres";
import { loginUser } from "@/types/user";
import { loginUserSchema } from "@/schemas/user";
import { HomeFormType, homeFormSchema } from "@/schemas/homeForm";
import { parse } from "path";

const insertReport = async (report: HomeFormType) => {
  const formattedPhotos = `{${report.photos.map((photo) => `"${photo}"`).join(",")}}`;
  return await sql`
  INSERT INTO 
    reports (
      photos, 
      latitude, 
      longitude, 
      address, 
      date, 
      note, 
      contactPolice, 
      isMunicipality
    ) VALUES (
      ${formattedPhotos}, 
      ${report.latitude}, 
      ${report.longitude},
      ${report.address},
      ${report.date},
      ${report.note}, 
      ${report.contactPolice},
      ${report.isMunicipality}
    )
  `;
};

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!homeFormSchema.safeParse(body)) {
      return new Response("Invalid Data", { status: 400 });
    }

    insertReport(body);
    return new Response("Report added successfully", { status: 200 });
  } catch (e) {
    console.log(e);
    return new Response("Internal error", { status: 500 });
  }
}


