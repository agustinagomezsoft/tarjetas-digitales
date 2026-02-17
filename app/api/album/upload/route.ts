import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import { google } from "googleapis";

// Configurar Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Configurar Google Sheets
function getGoogleAuth() {
    const clientEmail = process.env.GOOGLE_CLIENT_EMAIL;
    const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n");
    if (!clientEmail || !privateKey) {
        throw new Error("Faltan credenciales de Google");
    }
    return new google.auth.GoogleAuth({
        credentials: { client_email: clientEmail, private_key: privateKey },
        scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });
}

async function saveToSheet(photoData: { url: string; publicId: string; uploaderName: string; timestamp: string }) {
    const spreadsheetId = process.env.GOOGLE_SHEET_ID;
    if (!spreadsheetId) return;

    try {
        const auth = getGoogleAuth();
        const sheets = google.sheets({ version: "v4", auth });

        // Verificar si existe la hoja "Fotos", si no crearla
        const spreadsheet = await sheets.spreadsheets.get({ spreadsheetId });
        const fotosSheet = spreadsheet.data.sheets?.find(s => s.properties?.title === "Fotos");

        if (!fotosSheet) {
            // Crear hoja "Fotos"
            await sheets.spreadsheets.batchUpdate({
                spreadsheetId,
                requestBody: {
                    requests: [{ addSheet: { properties: { title: "Fotos" } } }],
                },
            });
            // Agregar headers
            await sheets.spreadsheets.values.update({
                spreadsheetId,
                range: "'Fotos'!A1:D1",
                valueInputOption: "RAW",
                requestBody: { values: [["Fecha", "Subido por", "URL", "Public ID"]] },
            });
        }

        // Agregar la foto
        await sheets.spreadsheets.values.append({
            spreadsheetId,
            range: "'Fotos'!A:D",
            valueInputOption: "USER_ENTERED",
            requestBody: {
                values: [[photoData.timestamp, photoData.uploaderName, photoData.url, photoData.publicId]],
            },
        });
    } catch (err) {
        console.error("Error guardando en Sheet:", err);
    }
}

export async function POST(request: Request) {
    try {
        const formData = await request.formData();
        const file = formData.get("file") as File | null;
        const uploaderName = (formData.get("name") as string) || "Anónimo";

        if (!file) {
            return NextResponse.json({ success: false, error: "No se recibió archivo" }, { status: 400 });
        }

        // Validar tipo de archivo
        const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/heic", "image/heif", "image/gif"];
        if (!allowedTypes.includes(file.type)) {
            return NextResponse.json({ success: false, error: "Solo se permiten imágenes" }, { status: 400 });
        }

        // Validar tamaño (máx 10MB)
        const maxSize = 10 * 1024 * 1024;
        if (file.size > maxSize) {
            return NextResponse.json({ success: false, error: "Máximo 10MB por foto" }, { status: 400 });
        }

        // Convertir a base64 para Cloudinary
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        const base64 = `data:${file.type};base64,${buffer.toString("base64")}`;

        // Subir a Cloudinary
        const timestamp = Date.now();
        const result = await cloudinary.uploader.upload(base64, {
            folder: "xv-nazarena",
            public_id: `foto_${timestamp}_${uploaderName.replace(/[^a-zA-Z0-9]/g, "_").substring(0, 20)}`,
            transformation: [
                { quality: "auto:good" },
                { fetch_format: "auto" },
            ],
        });

        // Guardar en Google Sheet
        const now = new Date().toLocaleString("es-AR", { dateStyle: "short", timeStyle: "short" });
        await saveToSheet({
            url: result.secure_url,
            publicId: result.public_id,
            uploaderName,
            timestamp: now,
        });

        return NextResponse.json({
            success: true,
            photo: {
                url: result.secure_url,
                publicId: result.public_id,
            },
        });
    } catch (err) {
        console.error("Error al subir foto:", err);
        return NextResponse.json(
            { success: false, error: "No se pudo subir la foto. Intentá de nuevo." },
            { status: 500 }
        );
    }
}