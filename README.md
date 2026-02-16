# Tarjetas digitales

Web de presentación con tarjetas digitales personalizadas. Cada persona tiene su propia URL según la carpeta en el proyecto.

## Estructura de URLs

- **/** → Página de presentación (listado de tarjetas)
- **/tarjeta-naza** → Tarjeta de Naza (carpeta `app/tarjeta-naza/page.tsx`)
- **/tarjeta-juan** → Tarjeta de Juan (crear `app/tarjeta-juan/page.tsx`)

## Cómo agregar una tarjeta nueva

1. Crea una carpeta dentro de `app/` con el nombre de la ruta que quieras, por ejemplo: `app/tarjeta-maria/`
2. Dentro, crea `page.tsx` que use el componente `TarjetaDigital`:

```tsx
import { TarjetaDigital } from "../components/TarjetaDigital";

export const metadata = {
  title: "María | Tarjeta digital",
  description: "Tarjeta digital de María",
};

export default function TarjetaMariaPage() {
  return (
    <TarjetaDigital
      nombre="María"
      titulo="Diseñadora"
      empresa="Studio"
      email="maria@ejemplo.com"
      telefono="+54 11 9876-5432"
      links={[
        { label: "LinkedIn", href: "https://linkedin.com/in/maria" },
      ]}
    />
  );
}
```

3. Añade la entrada en la lista de la página principal (`app/page.tsx`) en el array `tarjetas` si quieres que aparezca en el listado.

## Desarrollo local

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

## Subir a Git

```bash
git add .
git commit -m "Tarjetas digitales - landing y ejemplo tarjeta-naza"
git remote add origin https://github.com/TU-USUARIO/tarjeta-digital-agus.git
git branch -M main
git push -u origin main
```

## Desplegar en Vercel

1. Entra en [vercel.com](https://vercel.com) e inicia sesión (con GitHub si ya subiste el repo).
2. **Add New Project** → importa el repositorio `tarjeta-digital-agus`.
3. Vercel detecta Next.js automáticamente. Deja las opciones por defecto y haz clic en **Deploy**.
4. Tu sitio quedará en `https://tarjeta-digital-agus.vercel.app` (o el nombre que elijas). Cada push a `main` se desplegará solo.

Si prefieres usar la CLI:

```bash
npm i -g vercel
vercel
```

Sigue los pasos y enlaza el proyecto a tu repo de Git para despliegues automáticos.
