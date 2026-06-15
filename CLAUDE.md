# tarjeta-digital-agus

Plataforma de invitaciones y tarjetas digitales para eventos (XV años, bodas, cumpleaños, etc.), creada por Agustina Gomez (Tucumán, Argentina). El idioma de todo el proyecto es **español**.

## Stack

- **Next.js 16** (App Router, `app/` directory)
- **React 19** + **TypeScript 5**
- **Tailwind CSS v4** (PostCSS, sin archivo `tailwind.config.js` — configuración inline)
- **Framer Motion** — animaciones de entrada/salida
- **Google Fonts**: Cinzel (`frozen-title`), Great Vibes (`frozen-name`), Geist
- **Cloudinary** — almacenamiento y upload de fotos de invitados
- **Google Sheets API** — guarda confirmaciones de asistencia (RSVP) y registro de fotos subidas
- **clsx** — clases condicionales
- **Lucide React** — íconos

## Comandos

```bash
npm run dev     # servidor de desarrollo
npm run build   # build de producción
npm run start   # servidor de producción
npm run lint    # ESLint
```

## Estructura del proyecto

```
app/
  layout.tsx                        # Root layout: fuentes globales y metadata SEO
  globals.css                       # Estilos globales + animaciones del tema Frozen
  page.tsx                          # Home/landing (portafolio)
  tarjeta-naza/                     # Tarjeta de XV años de Nazarena (tema Disney Frozen)
    layout.tsx
    page.tsx                        # Invitación genérica (sin personalizar)
    opengraph-image.tsx             # OG image para redes sociales
    twitter-image.tsx
    slideshow/page.tsx              # Slideshow de fotos
    album/page.tsx                  # Página del álbum compartido (upload de fotos)
    invitacion/[familia]/
      layout.tsx
      page.tsx                      # Invitación personalizada por familia/persona
      opengraph-image.tsx
      twitter-image.tsx
api/
  confirmacion/route.ts             # POST: guarda RSVP en Google Sheets
  album/
    upload/route.ts                 # POST: sube foto a Cloudinary + registra en Sheet
    fotos/route.ts                  # GET: obtiene fotos desde Cloudinary
public/
  audio/                            # Música de fondo (MP3)
```

## Cómo crear una nueva tarjeta

1. Crear carpeta `app/tarjeta-[nombre]/` copiando la estructura de `tarjeta-naza/`
2. Editar el objeto `CONFIG` al inicio del `page.tsx` con los datos del nuevo evento
3. Ajustar colores del tema (variables de color en los classnames de Tailwind)
4. Agregar audio en `public/audio/`
5. Si las fotos vienen de un dominio nuevo, agregarlo en `next.config.ts` → `images.remotePatterns`

## El objeto CONFIG (punto central de personalización)

Cada `page.tsx` tiene un `CONFIG` en el tope del archivo con todos los datos del evento:

```ts
const CONFIG = {
  nombre: "Nazarena",
  fechaEvento: new Date("2026-04-11T22:00:00"),
  evento: { dia, mes, anio, hora },
  misa: { fecha, hora, lugar, direccion, mapsUrl },
  fiesta: { fecha, hora, lugar, direccion, mapsUrl },
  dressCode: "Elegante",
  dressCodeNota: "...",
  fechaLimiteConfirmacion: "17 de Marzo de 2026",
  regalo: { alias: "nazamedina16" },
  fotos: ["url1", "url2", "url3", "url4"],   // ibb.co
  quiz: [{ pregunta, opciones, respuestaCorrecta }],
};
```

**Cambiar este objeto es suficiente para adaptar el contenido de una tarjeta.**

## Estructura de secciones (page.tsx)

Los pages están compuestos de componentes de sección numerados:

| Sección | Contenido |
|---|---|
| `Section1Portada` | Hero con cuenta regresiva |
| `Section2Fiesta` | Datos del salón/fiesta |
| `Section3DressCode` | Código de vestimenta |
| `Section4Ceremonia` | Ceremonia religiosa (misa) |
| `Section5Fotos1` | Primeras 2 fotos |
| `Section6Frase` | Frase especial |
| `Section7Album` | Botón al álbum compartido |
| `Section8Regalo` | Alias de transferencia |
| `Section9Fotos2` | Últimas 2 fotos |
| `Section10Quiz` | Quiz "¿Cuánto me conocés?" |
| `Section11Confirmacion` | Formulario RSVP |
| `Section12Despedida` | Cierre final |

## Invitaciones personalizadas por familia

Ruta: `/tarjeta-naza/invitacion/[familia]?p=2`

- `[familia]`: slug de la familia (`familia-medina` → "Familia Medina")
- `?p=N`: cantidad de personas pre-cargada en el formulario (1–5)

La función `formatFamilyName(slug)` convierte el slug a nombre legible.

## Variables de entorno (`.env.local`)

```
GOOGLE_CLIENT_EMAIL=...        # Service account email
GOOGLE_PRIVATE_KEY=...         # Service account private key (con \n escapados)
GOOGLE_SHEET_ID=...            # ID del spreadsheet de Google Sheets

CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...
```

Google Sheets guarda las confirmaciones en la primera hoja y las fotos en una hoja llamada "Fotos" (se crea automáticamente).

## Tema visual: Disney Frozen

**Paleta de colores:**
- Fondo oscuro (cielo nocturno): `#0a1628`, `#1a3a5c`, `#2d5a7b`
- Azul hielo (primario): `#1e90ff`, `#4169e1`
- Azul medio: `#5F84A2`, `#91AEC4`, `#B7D0E1`
- Texto claro: `#E0F4FF`, `#87CEEB`, `#B0D4E8`
- Texto oscuro (secciones claras): `#194569`

**Clases CSS del tema** (definidas en `globals.css`):
- `.frozen-title` — Cinzel, uppercase, letter-spacing amplio
- `.frozen-name` — Great Vibes, cursiva elegante, tamaño grande
- `.frozen-name-night` — Great Vibes, tamaño mediano
- `.frozen-section` — padding estándar + separador visual
- `.frozen-card` / `.frozen-card-light` — tarjetas con glassmorphism
- `.frozen-divider` / `.frozen-divider-light` — divisores decorativos

**Animaciones CSS:**
- `.animate-snowfall` — copos de nieve cayendo
- `.animate-twinkle` — estrellas titilando
- `.animate-spin-slow` — rotación lenta (copos)
- `.animate-float-up` — partículas flotando hacia arriba
- `.animate-frozen-in[-delay-1|-delay-2]` — fade-in con movimiento

**Componentes decorativos reutilizables:**
- `<Snowflakes />` — copos de nieve animados
- `<StarsBackground />` — fondo de estrellas
- `<MagicParticles />` — partículas Sparkles flotando
- `<SnowflakeIcon />` — ícono SVG de copo de nieve
- `<CastleSVG />` — castillo SVG del tema Frozen

## Música de fondo

Audio en `/public/audio/frozen-vuelie.mp3`. El audio intenta reproducirse automáticamente; si el navegador lo bloquea (política de autoplay), se activa con la primera interacción del usuario. Botón Play/Pause fijo en `bottom-6 right-6`.

## Imágenes

- Fotos del evento (perfil/sesión): alojadas en **ibb.co**, referenciadas en `CONFIG.fotos[]`
- Fotos subidas por invitados: **Cloudinary**, carpeta `xv-[nombre]`
- Next.js `<Image>` requiere que el dominio esté en `next.config.ts → images.remotePatterns`

## Convenciones del código

- Todo en **español** (UI, nombres de variables, comentarios cuando se usan)
- Componentes en PascalCase, funciones helper en camelCase
- Sin carpeta `src/` — todo directamente en `app/`
- Los API routes usan `NextResponse.json()` con `{ success: boolean, error?: string }`
- Los decorative components al final del archivo, después de las secciones de contenido
