import { sql } from "@vercel/postgres";
import { loginUser } from "@/types/user";
import { loginUserSchema } from "@/schemas/user";
import { HomeFormType, homeFormSchema } from "@/schemas/homeForm";
import { parse } from "path";

const getReports = async () => {
  return (await sql`SELECT * FROM reports`).rows;
};

const parsePostgresArray = (arrayString: string): string[] => {
  console.log("ARR", arrayString);
  
    // Remove the surrounding curly braces
  const trimmedString = arrayString.slice(1, -1);

  // Split the string by commas, but handle escaping
  const resultArray = [];
  let currentElement = "";
  let inQuotes = false;

  for (let i = 0; i < trimmedString.length; i++) {
    const char = trimmedString[i];

    if (char === '"' && (i === 0 || trimmedString[i - 1] !== "\\")) {
      inQuotes = !inQuotes;
    } else if (char === "," && !inQuotes) {
      resultArray.push(currentElement.replace(/\\(.)/g, "$1"));
      currentElement = "";
    } else {
      currentElement += char;
    }
  }

  // Add the last element
  resultArray.push(currentElement.replace(/\\(.)/g, "$1"));

  return resultArray;
};

const insertReport = async (report: HomeFormType) => {
  const formattedPhotos = `{${report.photos.map((photo) => `"${photo}"`).join(",")}}`;
  return await sql`INSERT INTO reports (photos, latitude, longitude, note, contactPolice) VALUES (${formattedPhotos}, ${report.latitude}, ${report.longitude}, ${report.note}, ${report.contactPolice})`;
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

export async function GET(request: Request) {
  try {
    const reports = await getReports();
    if (reports) {
      return new Response(
        JSON.stringify(reports),
        { status: 200 },
      );
    } else {
      return new Response("Not found", { status: 404 });
    }
  } catch (e) {
    console.log(e);
    return new Response("Internal error", { status: 500 });
  }
}
