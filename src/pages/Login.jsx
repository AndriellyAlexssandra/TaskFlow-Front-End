import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import api from "../api";
import "./Login.css";

function Login() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [erro, setErro] = useState("");
  const [shake, setShake] = useState(false);

  const navigate = useNavigate();

  async function handleLogin() {
    setErro("");
    try {
      const resposta = await api.post("/auth/login", { email, senha });
      const { token, usuario } = resposta.data;
      login(usuario, token);
      navigate("/");
    } catch (err) {
      console.log(err);
      setErro(err.response?.data?.erro || "Erro ao fazer login :( ");
      setShake(true);
      setTimeout(() => setShake(false), 500);
    }
  }

  return (
    <div className="login-container">
      <div className={`login-card ${shake ? "shake" : ""}`}>
        <div className="login-avatar">
          <svg viewBox="0 0 24 24" width="34" height="34" fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx="12" cy="8" r="4" />
            <path d="M4 20c0-4 3.5-6 8-6s8 2 8 6" />
          </svg>
        </div>

        <h1>Login</h1>
        <p className="login-subtitulo">Acesse com seus dados para prosseguir</p>

        <div className="login-campo">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5">
            <rect x="3" y="5" width="18" height="14" rx="2" />
            <path d="M3 7l9 6 9-6" />
          </svg>
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="login-campo-senha">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5">
            <rect x="5" y="11" width="14" height="9" rx="2" />
            <path d="M8 11V8a4 4 0 0 1 8 0v3" />
          </svg>
          <input
            type={mostrarSenha ? "text" : "password"}
            placeholder="Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleLogin()}
          />
          <button
            type="button"
            className="login-olho"
            onClick={() => setMostrarSenha((v) => !v)}
            title={mostrarSenha ? "Ocultar senha" : "Mostrar senha"}
          >
            {mostrarSenha ? (
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M3 3l18 18" />
                <path d="M10.6 10.6a2 2 0 0 0 2.8 2.8" />
                <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c5 0 9 4 9 8-.35.7-.87 1.55-1.53 2.36M6.2 6.2C4.3 7.5 2.9 9.6 2 12c1 3.5 4.5 6.5 9 8 1.06-.3 2.02-.72 2.9-1.24" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6-10-6-10-6z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            )}
          </button>
        </div>

        {erro && <p className="login-erro">{erro}</p>}

        <button className="login-btn" onClick={handleLogin}>
          Entrar
        </button>

        <p className="login-aviso">
          Este Login é apenas para fins didáticos! Credencias reais vem no
          modulo do Back-end.
        </p>
      </div>
    </div>
  );
}
export default Login;