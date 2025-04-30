import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";
import { auth } from "./firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/dashboard");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-xl font-bold">Iniciar sesión</h2>
      <input placeholder="Email" className="border p-2 w-full" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input placeholder="Password" type="password" className="border p-2 w-full" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button className="bg-blue-500 text-white px-4 py-2" onClick={handleLogin}>Entrar</button>
      <p>¿No tienes cuenta? <Link to="/register" className="text-blue-600">Regístrate</Link></p>
    </div>
  );
}

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/dashboard");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-xl font-bold">Registro</h2>
      <input placeholder="Email" className="border p-2 w-full" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input placeholder="Password" type="password" className="border p-2 w-full" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button className="bg-green-500 text-white px-4 py-2" onClick={handleRegister}>Registrar</button>
      <p>¿Ya tienes cuenta? <Link to="/" className="text-blue-600">Inicia sesión</Link></p>
    </div>
  );
}

function Dashboard() {
  const navigate = useNavigate();
  const logout = async () => {
    await signOut(auth);
    navigate("/");
  };

  const [movida, setMovida] = useState({
    loadId: "",
    trailer: "",
    broker: "",
    driver: "",
    from: "",
    fromAppt: "",
    to: "",
    toAppt: "",
    comentario: "",
    miles: "",
    rate: "",
    rateMi: "",
    dh: "",
    detention: ""
  });

  const handleChange = (e) => {
    setMovida({ ...movida, [e.target.name]: e.target.value });
  };

  const handleGuardar = () => {
    console.log("Movida registrada:", movida);
    alert("Movida registrada en consola");
    setMovida({ loadId: "", trailer: "", broker: "", driver: "", from: "", fromAppt: "", to: "", toAppt: "", comentario: "", miles: "", rate: "", rateMi: "", dh: "", detention: "" });
  };

  return (
    <div className="p-4 space-y-4">
      <div className="flex justify-between">
        <h2 className="text-xl font-bold">Registro de Movidas</h2>
        <button className="bg-red-500 text-white px-4 py-2" onClick={logout}>Cerrar sesión</button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <input name="loadId" value={movida.loadId} onChange={handleChange} placeholder="Load ID" className="border p-2" />
        <input name="trailer" value={movida.trailer} onChange={handleChange} placeholder="Trailer #" className="border p-2" />
        <input name="broker" value={movida.broker} onChange={handleChange} placeholder="Broker" className="border p-2" />
        <input name="driver" value={movida.driver} onChange={handleChange} placeholder="Driver Name" className="border p-2" />
        <input name="from" value={movida.from} onChange={handleChange} placeholder="From" className="border p-2" />
        <input name="fromAppt" value={movida.fromAppt} onChange={handleChange} placeholder="Appt (From)" className="border p-2" />
        <input name="to" value={movida.to} onChange={handleChange} placeholder="To" className="border p-2" />
        <input name="toAppt" value={movida.toAppt} onChange={handleChange} placeholder="Appt (To)" className="border p-2" />
        <input name="comentario" value={movida.comentario} onChange={handleChange} placeholder="Comentario" className="border p-2" />
        <input name="miles" value={movida.miles} onChange={handleChange} placeholder="Miles" className="border p-2" />
        <input name="rate" value={movida.rate} onChange={handleChange} placeholder="Rate" className="border p-2" />
        <input name="rateMi" value={movida.rateMi} onChange={handleChange} placeholder="$ / mi" className="border p-2" />
        <input name="dh" value={movida.dh} onChange={handleChange} placeholder="DH" className="border p-2" />
        <input name="detention" value={movida.detention} onChange={handleChange} placeholder="Detention" className="border p-2" />
      </div>
      <button className="bg-green-600 text-white px-4 py-2 mt-4" onClick={handleGuardar}>Guardar Movida</button>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}