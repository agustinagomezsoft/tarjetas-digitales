import Link from "next/link";

export default function Home() {
  const tarjetas = [
    { slug: "tarjeta-naza", nombre: "Naza" },
    // Añadí aquí más entradas cuando crees carpetas: { slug: "tarjeta-juan", nombre: "Juan" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      <main className="max-w-2xl mx-auto px-6 py-20 text-center">
        <h1 className="text-4xl font-bold text-slate-900 dark:text-white tracking-tight">
          Tarjetas digitales
        </h1>
        <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">
          Tu tarjeta de presentación en un enlace. Elige una persona para ver su tarjeta.
        </p>
        <ul className="mt-12 space-y-4">
          {tarjetas.map((t) => (
            <li key={t.slug}>
              <Link
                href={`/${t.slug}`}
                className="block py-4 px-6 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-medium text-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors shadow-sm"
              >
                Ver tarjeta de {t.nombre}
              </Link>
            </li>
          ))}
        </ul>
        <p className="mt-12 text-sm text-slate-500 dark:text-slate-500">
          Para agregar una tarjeta nueva: crea una carpeta en <code className="bg-slate-200 dark:bg-slate-700 px-1.5 py-0.5 rounded">app/tarjeta-[nombre]/page.tsx</code> y usa el componente <code className="bg-slate-200 dark:bg-slate-700 px-1.5 py-0.5 rounded">TarjetaDigital</code>.
        </p>
      </main>
    </div>
  );
}
