import Link from "next/link";
import { Sparkles, Heart, Mail, Instagram } from "lucide-react";

export default function Home() {
  const tarjetas = [
    {
      slug: "tarjeta-naza",
      nombre: "Nazarena",
      tipo: "XV Años",
      tema: "Frozen",
      fecha: "11 de Abril 2026"
    },
    // Añadí aquí más tarjetas cuando las crees
    // { slug: "tarjeta-ejemplo", nombre: "Nombre", tipo: "Boda", tema: "Elegante", fecha: "Fecha" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-purple-50 to-indigo-100">
      {/* Header */}
      <header className="pt-12 pb-8 px-6">
        <div className="max-w-2xl mx-auto text-center">
          {/* Logo / Título */}
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="w-6 h-6 text-rose-400" />
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-rose-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent">
              Agustina
            </h1>
            <Sparkles className="w-6 h-6 text-indigo-400" />
          </div>
          <p className="text-lg text-slate-600 font-medium tracking-wide">
            Tarjetas Digitales
          </p>

          {/* Descripción */}
          <p className="mt-6 text-slate-500 max-w-md mx-auto leading-relaxed">
            Invitaciones digitales únicas y personalizadas para tus momentos más especiales.
            <span className="text-rose-500"> XV años</span>,
            <span className="text-purple-500"> bodas</span>,
            <span className="text-indigo-500"> cumpleaños</span> y más.
          </p>
        </div>
      </header>

      {/* Main */}
      <main className="max-w-2xl mx-auto px-6 pb-12">
        {/* Sección de tarjetas */}
        <section>
          <div className="flex items-center justify-center gap-2 mb-8">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-slate-300" />
            <Heart className="w-4 h-4 text-rose-400" />
            <span className="text-sm text-slate-400 uppercase tracking-widest">Mis trabajos</span>
            <Heart className="w-4 h-4 text-rose-400" />
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-slate-300" />
          </div>

          <ul className="space-y-4">
            {tarjetas.map((t) => (
              <li key={t.slug}>
                <Link
                  href={`/${t.slug}`}
                  className="group block p-5 rounded-2xl bg-white/80 backdrop-blur-sm border border-white shadow-lg shadow-slate-200/50 hover:shadow-xl hover:shadow-purple-200/50 hover:border-purple-200 transition-all duration-300"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-medium text-white bg-gradient-to-r from-rose-400 to-purple-400 px-2 py-0.5 rounded-full">
                          {t.tipo}
                        </span>
                        <span className="text-xs text-slate-400">
                          {t.tema}
                        </span>
                      </div>
                      <h3 className="text-lg font-semibold text-slate-800 group-hover:text-purple-600 transition-colors">
                        {t.nombre}
                      </h3>
                      <p className="text-sm text-slate-500">{t.fecha}</p>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-rose-100 to-purple-100 flex items-center justify-center group-hover:from-rose-200 group-hover:to-purple-200 transition-colors">
                      <span className="text-lg">💌</span>
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>

          {tarjetas.length === 0 && (
            <div className="text-center py-12 text-slate-400">
              <p>Próximamente más tarjetas...</p>
            </div>
          )}
        </section>

        {/* CTA */}
        <section className="mt-16 text-center">
          <div className="bg-gradient-to-br from-rose-500 via-purple-500 to-indigo-500 rounded-3xl p-8 text-white shadow-xl shadow-purple-200/50">
            <Sparkles className="w-8 h-8 mx-auto mb-4 opacity-80" />
            <h2 className="text-xl font-semibold mb-2">¿Querés tu tarjeta digital?</h2>
            <p className="text-white/80 text-sm mb-6 max-w-sm mx-auto">
              Creamos invitaciones únicas y personalizadas para tu evento especial.
            </p>
            <a
              href="https://wa.me/5493814XXXXXX?text=Hola%20Agustina!%20Quiero%20una%20tarjeta%20digital"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-purple-600 font-semibold rounded-full hover:bg-purple-50 transition-colors"
            >
              <Mail className="w-4 h-4" />
              Contactame
            </a>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-slate-200/50">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-slate-400 text-sm flex items-center justify-center gap-2">
            Hecho con <Heart className="w-4 h-4 text-rose-400 fill-rose-400" /> por Agustina
          </p>
          <div className="mt-4 flex items-center justify-center gap-4">
            <a
              href="https://instagram.com/tu_usuario"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-rose-500 transition-colors"
            >
              <Instagram className="w-5 h-5" />
            </a>
          </div>
          <p className="mt-4 text-xs text-slate-300">
            © {new Date().getFullYear()} Agustina Tarjetas Digitales
          </p>
        </div>
      </footer>
    </div>
  );
}