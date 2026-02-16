import { TarjetaDigital } from "../components/TarjetaDigital";

export const metadata = {
  title: "Naza | Tarjeta digital",
  description: "Tarjeta digital de Naza",
};

export default function TarjetaNazaPage() {
  return (
    <TarjetaDigital
      nombre="Naza"
      titulo="Desarrollador"
      empresa="Mi Empresa"
      email="naza@ejemplo.com"
      telefono="+54 11 1234-5678"
      links={[
        { label: "LinkedIn", href: "https://linkedin.com/in/naza" },
        { label: "GitHub", href: "https://github.com/naza" },
      ]}
    />
  );
}
