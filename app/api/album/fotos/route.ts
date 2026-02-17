import { NextResponse } from "next/server";
import { google } from "googleapis";

function getGoogleAuth() {
    const clientEmail = process.env.GOOGLE_CLIENT_EMAIL;
    const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n");
    if (!clientEmail || !privateKey) {
        throw new Error("Faltan credenciales de Google");
    }
    return new google.auth.GoogleAuth({
        credentials: { client_email: clientEmail, private_key: privateKey },
        scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
    });
}

export async function GET() {
    try {
        const spreadsheetId = process.env.GOOGLE_SHEET_ID;
        if (!spreadsheetId) {
            return NextResponse.json({ success: false, error: "GOOGLE_SHEET_ID no configurado" }, { status: 500 });
        }

        const auth = getGoogleAuth();
        const sheets = google.sheets({ version: "v4", auth });

        // Leer fotos de la hoja "Fotos"
        const response = await sheets.spreadsheets.values.get({
            spreadsheetId,
            range: "'Fotos'!A:D",
        });

        const rows = response.data.values;
        if (!rows || rows.length <= 1) {
            return NextResponse.json({ success: true, photos: [] });
        }

        // Saltar header y mapear datos
        const photos = rows.slice(1).map((row, index) => ({
            id: index,
            timestamp: row[0] || "",
            uploaderName: row[1] || "Anónimo",
            url: row[2] || "",
            publicId: row[3] || "",
        })).filter(p => p.url); // Solo fotos con URL válida

        // Ordenar por más reciente primero
        photos.reverse();

        return NextResponse.json({
            success: true,
            photos,
            total: photos.length,
        });
    } catch (err) {
        console.error("Error al obtener fotos:", err);
        // Si la hoja no existe, devolver array vacío
        return NextResponse.json({ success: true, photos: [], total: 0 });
    }
}