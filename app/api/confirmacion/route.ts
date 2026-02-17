import { NextResponse } from "next/server";
import { google } from "googleapis";

const HEADERS = ["Fecha", "Nombre", "Apellido", "Confirma", "Alimentación", "Canción"];

function getAuth() {
  const clientEmail = process.env.GOOGLE_CLIENT_EMAIL;
  const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n");
  if (!clientEmail || !privateKey) {
    throw new Error("Faltan GOOGLE_CLIENT_EMAIL o GOOGLE_PRIVATE_KEY en las variables de entorno.");
  }
  return new google.auth.GoogleAuth({
    credentials: { client_email: clientEmail, private_key: privateKey },
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });
}

async function ensureHeaderRow(sheets: ReturnType<typeof google.sheets>, spreadsheetId: string, sheetTitle: string) {
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: `'${sheetTitle}'!A1:F1`,
  });
  const values = res.data.values;
  if (!values || values.length === 0 || !values[0]?.length) {
    await sheets.spreadsheets.values.update({
      spreadsheetId,
      range: `'${sheetTitle}'!A1:F1`,
      valueInputOption: "RAW",
      requestBody: { values: [HEADERS] },
    });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { cant, inv } = body as { cant?: string; inv?: { nombre: string; apellido: string; confirma: boolean; alim: string; cancion: string }[] };

    if (!inv || !Array.isArray(inv) || inv.length === 0) {
      return NextResponse.json({ success: false, error: "Datos de invitados requeridos" }, { status: 400 });
    }

    const spreadsheetId = process.env.GOOGLE_SHEET_ID;
    if (!spreadsheetId) {
      return NextResponse.json({ success: false, error: "GOOGLE_SHEET_ID no configurado" }, { status: 500 });
    }

    const auth = getAuth();
    const sheets = google.sheets({ version: "v4", auth });

    const spreadsheet = await sheets.spreadsheets.get({ spreadsheetId });
    const firstSheet = spreadsheet.data.sheets?.[0];
    const sheetTitle = firstSheet?.properties?.title ?? "Sheet1";

    await ensureHeaderRow(sheets, spreadsheetId, sheetTitle);

    const now = new Date().toLocaleString("es-AR", { dateStyle: "short", timeStyle: "short" });
    const rows = inv.map((i) => [
      now,
      i.nombre || "",
      i.apellido || "",
      i.confirma ? "Sí" : "No",
      i.alim || "ninguno",
      i.cancion || "",
    ]);

    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: `'${sheetTitle}'!A:F`,
      valueInputOption: "USER_ENTERED",
      requestBody: { values: rows },
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Error al guardar confirmación en Google Sheet:", err);
    return NextResponse.json(
      { success: false, error: "No se pudo guardar la confirmación" },
      { status: 500 }
    );
  }
}
