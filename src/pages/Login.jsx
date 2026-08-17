import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import "./Login.css";

function Login() {
  const { login } = useAuth();
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [shake, setShake] = useState(false);
  const navigate = useNavigate();

  function handleLogin() {
    if (usuario === "admin" && senha === "1234") {
      login();
      navigate("/");
      return;
    }
    setErro("Usuário ou Senha incorretos");
    setShake(true);
    setTimeout(() => setShake(false), 500);
  }

  return (
    <div className="login-container">
      <div className={`login-card ${shake ? 'shake' : ''}`}>

        <h1>Login</h1>
        <p className="login-subtitulo">Acesse com seus dados para prosseguir</p>
        <input
          className="login-input"
          type="text"
          placeholder="Usuário"
          value={usuario}
          onChange={(e) => setUsuario(e.target.value)}
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