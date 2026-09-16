import api from "../api";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import "./Login.css";


function Login() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [shake, setShake] = useState(false);

  const navigate = useNavigate();

  async function handleLogin() {
    setErro("");
    try {
      const resposta = await api.post("/auth/login", {
        email,
        senha,
      });
      const { token, usuario } = resposta.data;
      login(usuario, token);
      navigate("/");
    } catch (err) {
      setErro(err.response?.data?.erro || "Erro ao fazer login");
      setShake(true);
      setTimeout(() => setShake(false), 500);
    }
  }
  return (
    <div className="login-container">
      <div className={`login-card ${shake ? "shake" : ""}`}>
        <h1>Login</h1>
        <p className="login-subtitulo">Acesse com seus dados para prosseguir</p>
        <input
          className="login-input"
          type="text"
          placeholder="Usuário"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="login-input"
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleLogin()}
        />
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
