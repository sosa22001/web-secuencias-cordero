export interface Cancion {
  title: string;
  url: string;
  format: string;
}

const API_BASE = "https://backend-secuencias-cordero.vercel.app/secuencias";

export const obtenerTodasLaseSecuencias = async (): Promise<Cancion[]> => {
  const res = await fetch(`${API_BASE}/todas`);

  if (!res.ok) throw new Error("Error al cargar secuencias");
  return res.json();
};

export const buscarCancion = async (query): Promise<Cancion> => {
  const res = await fetch(`${API_BASE}/buscarCancion?query=${query}`);

  if (!res.ok) throw new Error("Error al cargar secuencias");
  return res.json();
};
