"use client";

export type TarjetaDigitalProps = {
  nombre: string;
  titulo?: string;
  empresa?: string;
  email?: string;
  telefono?: string;
  links?: { label: string; href: string }[];
  imagen?: string;
};

export function TarjetaDigital({
  nombre,
  titulo,
  empresa,
  email,
  telefono,
  links = [],
  imagen,
}: TarjetaDigitalProps) {
  return (
    <main className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-900 dark:to-slate-800">
      <article className="w-full max-w-md rounded-2xl bg-white dark:bg-slate-800 shadow-xl overflow-hidden border border-slate-200/80 dark:border-slate-700">
        <div className="p-8 text-center">
          {imagen ? (
            <div className="mx-auto mb-6 w-24 h-24 rounded-full overflow-hidden bg-slate-200 dark:bg-slate-600">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={imagen} alt={nombre} className="w-full h-full object-cover" />
            </div>
          ) : (
            <div className="mx-auto mb-6 w-24 h-24 rounded-full bg-slate-300 dark:bg-slate-600 flex items-center justify-center text-3xl font-bold text-slate-600 dark:text-slate-300">
              {nombre.charAt(0)}
            </div>
          )}
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">{nombre}</h1>
          {titulo && (
            <p className="mt-1 text-slate-600 dark:text-slate-300 font-medium">{titulo}</p>
          )}
          {empresa && (
            <p className="text-slate-500 dark:text-slate-400 text-sm">{empresa}</p>
          )}
          <div className="mt-6 space-y-3">
            {email && (
              <a
                href={`mailto:${email}`}
                className="block w-full py-3 px-4 rounded-xl bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-200 font-medium hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
              >
                {email}
              </a>
            )}
            {telefono && (
              <a
                href={`tel:${telefono.replace(/\s/g, "")}`}
                className="block w-full py-3 px-4 rounded-xl bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-200 font-medium hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
              >
                {telefono}
              </a>
            )}
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full py-3 px-4 rounded-xl bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-200 font-medium hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </article>
    </main>
  );
}
