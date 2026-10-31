import { useEffect, useState } from "react";

export function useTema() {
  const [tema, setTema] = useState(
    () => localStorage.getItem("tema") || "dark",
  );

  useEffect(() => {
    document.documentElement.dataset.theme = tema;
    localStorage.setItem("tema", tema);
  }, [tema]);

  const alternar = () => setTema((t) => (t === "dark" ? "light" : "dark"));
  return { tema, alternar };
}