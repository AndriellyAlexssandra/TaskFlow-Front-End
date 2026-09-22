import { useEffect, useRef } from "react";
import { Link } from "react-router";
import "./Pagina404.css";

function Pagina404() {
  const astronautaRef = useRef(null);

  useEffect(() => {
    function mover(e) {
      const moveX = (e.clientX - window.innerWidth / 2) / 25;
      const moveY = (e.clientY - window.innerHeight / 2) / 25;
      if (astronautaRef.current) {
        astronautaRef.current.style.transform = `translate(${moveX}px, ${moveY}px) rotate(${moveX * 0.5}deg)`;
      }
    }
    document.addEventListener("mousemove", mover);
    return () => document.removeEventListener("mousemove", mover);
  }, []);

  return (
    <div className="nf-pagina">
      <div className="nf-stars"></div>
      <div className="nf-container">
        <div className="nf-space-scene">
          <svg
            ref={astronautaRef}
            className="nf-astronaut"
            viewBox="0 0 512 512"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M376,192H136c-22.09,0-40,17.91-40,40v144c0,22.09,17.91,40,40,40h240c22.09,0,40-17.91,40-40V232C416,209.91,398.09,192,376,192z" fill="#e6e6e6" />
            <path d="M256,96c-53.02,0-96,42.98-96,96h192C352,138.98,309.02,96,256,96z" fill="#cccccc" />
            <circle cx="256" cy="272" fill="#333333" r="56" />
            <path d="M256,224c-26.51,0-48,21.49-48,48s21.49,48,48,48s48-21.49,48-48S282.51,224,256,224z" fill="#1a1a1a" />
            <path d="M280,248c0-4.42-3.58-8-8-8h-32c-4.42,0-8,3.58-8,8s3.58,8,8,8h32C276.42,256,280,252.42,280,248z" fill="#66ccff" opacity="0.6" />
            <rect fill="#cccccc" height="120" rx="10" width="20" x="106" y="240" />
            <rect fill="#cccccc" height="120" rx="10" width="20" x="386" y="240" />
            <path d="M208,416h16v48c0,8.84-7.16,16-16,16h-16c-8.84,0-16-7.16-16-16v-48H208z" fill="#b3b3b3" />
            <path d="M304,416h16v48c0,8.84-7.16,16-16,16h-16c-8.84,0-16-7.16-16-16v-48H304z" fill="#b3b3b3" />
          </svg>
        </div>

        <h1>404</h1>
        <p>Ops! Você flutuou para longe do mapa.</p>
        <Link to="/" className="nf-btn-home">Voltar para a Terra</Link>
      </div>
    </div>
  );
}

export default Pagina404;