import { useState } from "react";
import "./App.css";

// Datos de los horóscopos (puedes personalizarlos)
const horoscopos = {
  aries:
    "Hoy es un día para la acción. Tu energía está en su punto más alto, ¡aprovéchala para iniciar ese proyecto que tienes en mente!",
  tauro:
    "La paciencia será tu mejor aliada. No te apresures en tomar decisiones importantes, medita bien cada paso que das.",
  geminis:
    "Tu habilidad para comunicarte brilla hoy. Es un excelente día para negociaciones, conversaciones importantes o simplemente para socializar.",
  cancer:
    "Conecta con tus emociones y tu hogar. Pasar tiempo con tus seres queridos te recargará de energía y te dará paz.",
  leo: "Tu creatividad está desbordante. Dedica tiempo a tus pasiones y no tengas miedo de mostrarle al mundo tu talento.",
  virgo:
    "El orden y la planificación te llevarán al éxito. Organiza tus tareas y verás cómo todo fluye de manera más sencilla.",
  libra:
    "Busca el equilibrio en tus relaciones. La diplomacia y la cooperación serán claves para resolver cualquier conflicto.",
  escorpio:
    "Es un día de transformación. No temas dejar atrás lo que ya no te sirve para dar paso a nuevas oportunidades.",
  sagitario:
    "Tu espíritu aventurero te llama. Anímate a explorar nuevos lugares o ideas, la inspiración está a la vuelta de la esquina.",
  capricornio:
    "Tu disciplina y esfuerzo están a punto de dar frutos. Sigue trabajando con constancia y alcanzarás tus metas.",
  acuario:
    "La originalidad es tu superpoder. Piensa fuera de la caja y encontrarás soluciones innovadoras a los problemas.",
  piscis:
    "Escucha a tu intuición. Tu sexto sentido está muy agudo hoy y te guiará por el camino correcto.",
};

function App() {
  const [nombre, setNombre] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState("");
  const [resultado, setResultado] = useState(null);

  const calcularSigno = (fecha) => {
    // Obtenemos el día y el mes
    const [, mes, dia] = fecha.split("-").map(Number);

    if ((mes === 3 && dia >= 21) || (mes === 4 && dia <= 19)) return "aries";
    if ((mes === 4 && dia >= 20) || (mes === 5 && dia <= 20)) return "tauro";
    if ((mes === 5 && dia >= 21) || (mes === 6 && dia <= 20)) return "geminis";
    if ((mes === 6 && dia >= 21) || (mes === 7 && dia <= 22)) return "cancer";
    if ((mes === 7 && dia >= 23) || (mes === 8 && dia <= 22)) return "leo";
    if ((mes === 8 && dia >= 23) || (mes === 9 && dia <= 22)) return "virgo";
    if ((mes === 9 && dia >= 23) || (mes === 10 && dia <= 22)) return "libra";
    if ((mes === 10 && dia >= 23) || (mes === 11 && dia <= 21))
      return "escorpio";
    if ((mes === 11 && dia >= 22) || (mes === 12 && dia <= 21))
      return "sagitario";
    if ((mes === 12 && dia >= 22) || (mes === 1 && dia <= 19))
      return "capricornio";
    if ((mes === 1 && dia >= 20) || (mes === 2 && dia <= 18)) return "acuario";
    if ((mes === 2 && dia >= 19) || (mes === 3 && dia <= 20)) return "piscis";
    return null;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!fechaNacimiento || !nombre) {
      alert("Por favor, completa todos los campos.");
      return;
    }
    const signoCalculado = calcularSigno(fechaNacimiento);
    if (signoCalculado) {
      setResultado({
        nombre: nombre,
        signo: signoCalculado,
        horoscopo: horoscopos[signoCalculado],
        imagen: `/zodiaco/${signoCalculado}.png`, // Ruta a la imagen en la carpeta public
      });
    }
  };

  return (
    <>
      <h1>Horóscopo React</h1>
      <main className="main-container">
        {/* LADO IZQUIERDO: FORMULARIO */}
        <div className="card form-card">
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label htmlFor="nombre">Nombre</label>
              <input
                type="text"
                id="nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                placeholder="Escribe tu nombre"
              />
            </div>
            <div className="input-group">
              <label htmlFor="fecha">Fecha de nacimiento</label>
              <input
                type="date"
                id="fecha"
                value={fechaNacimiento}
                onChange={(e) => setFechaNacimiento(e.target.value)}
              />
            </div>
            <button type="submit">Calcular Horóscopo</button>
          </form>
        </div>

        {/* LADO DERECHO: RESULTADO */}
        <div className="card result-card">
          {resultado ? (
            <>
              <h2>
                Tu signo es:{" "}
                {resultado.signo.charAt(0).toUpperCase() +
                  resultado.signo.slice(1)}
              </h2>
              <img
                src={resultado.imagen}
                alt={`Imagen del signo ${resultado.signo}`}
                className="result-sign-img"
              />
              <h3>{resultado.nombre}:</h3>
              <p className="horoscope-text">{resultado.horoscopo}</p>
            </>
          ) : (
            <p>Ingresa tus datos para ver tu horóscopo.</p>
          )}
        </div>
      </main>
    </>
  );
}

export default App;
