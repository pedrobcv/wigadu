import { Link, NavLink, Route, Routes, useParams } from 'react-router-dom'
import { gameCatalog } from './data/games'
import { firebaseReady } from './lib/firebase'

const sections = [
  {
    title: 'Actividades de Diagnóstico',
    text: 'Juegos cortos al inicio de la clase para descubrir qué saben tus alumnos antes de empezar un tema.',
  },
  {
    title: 'Práctica Formativa',
    text: 'Dinámicas interactivas a mitad de unidad para fijar conceptos y aprender a partir del error.',
  },
  {
    title: 'Quizes Temáticos',
    text: 'Cuestionarios ágiles y divertidos para cerrar la clase y medir la retención en segundos.',
  },
  {
    title: 'Desafíos de Gamificación',
    text: 'Competiciones sanas en el aula con puntos, récords y logros que impulsan la participación.',
  },
]

const styles = [
  {
    title: 'Moderno & Vectorial',
    text: 'Limpio, fluido y profesional para secundaria, bachillerato y universidad.',
  },
  {
    title: 'Aventura Retro',
    text: 'Pixel-art 8 y 16 bits con nostalgia arcade para hacer el aprendizaje memorable.',
  },
  {
    title: 'Temático Infantil',
    text: 'Colorido, amigable y legible para primaria y primeros ciclos.',
  },
  {
    title: 'Corporativo / Serio',
    text: 'Minimalista y sobrio para capacitación empresarial y onboarding.',
  },
]

const steps = [
  'Selecciona la dinámica: plataformas, trivia rápida o carrera contra el tiempo.',
  'Define el objetivo educativo: preguntas, verdadero/falso, ejercicios o conceptos clave.',
  'Elige la estética: sprites, fondos e interfaz para tu grupo.',
  'Comparte el link: acceso instantáneo desde móvil, tablet o computadora.',
]

function Shell({ children }) {
  return (
    <div className="app-shell">
      <header className="topbar">
        <Link to="/" className="brand">
          <span className="brand-mark">W</span>
          <span>
            <strong>Wigadu</strong>
            <small>La plataforma donde el contenido educativo se convierte en juego.</small>
          </span>
        </Link>

        <nav className="nav">
          <NavLink to="/" end>Inicio</NavLink>
          <NavLink to="/games">Juegos</NavLink>
          <NavLink to="/dashboard">Dashboard</NavLink>
          <NavLink to="/admin">Admin</NavLink>
          <NavLink to="/login" className="nav-cta">Entrar</NavLink>
        </nav>
      </header>

      <main>{children}</main>

      <footer className="footer">
        <div>
          <strong>Wigadu</strong>
          <p>Aprendizaje interactivo para educación y capacitación.</p>
        </div>
        <p>Firebase-ready · React + Vite · Play online o descarga tus juegos.</p>
      </footer>
    </div>
  )
}

function Landing() {
  return (
    <>
      <section className="hero panel">
        <div className="hero-copy">
          <span className="eyebrow">Aprender jugando, sin instalar nada</span>
          <h1>Crea experiencias de aprendizaje interactivas en minutos.</h1>
          <p>
            Transforma tus quizes, lecciones y actividades formativas en videojuegos dinámicos.
            Elige el estilo visual que prefieras y haz que estudiantes y equipos aprendan jugando.
          </p>
          <div className="hero-actions">
            <Link to="/login" className="button primary">Diseñar una Actividad Gratis</Link>
            <Link to="/games" className="button secondary">Ver Juegos</Link>
          </div>
          <div className="hero-badges">
            <span>Capacitación</span>
            <span>Estudiantes</span>
            <span>Online / descarga</span>
          </div>
        </div>

        <div className="hero-card">
          <div className="preview-window">
            <div className="preview-top">
              <span />
              <span />
              <span />
            </div>
            <div className="preview-body">
              <div className="preview-game">
                <div>
                  <p>Juego destacado</p>
                  <h3>Reto Arcade</h3>
                </div>
                <span className="pill">Play now</span>
              </div>
              <div className="preview-grid">
                <article>
                  <strong>12</strong>
                  <span>Preguntas</span>
                </article>
                <article>
                  <strong>4</strong>
                  <span>Estilos</span>
                </article>
                <article>
                  <strong>Online</strong>
                  <span>Sin registro</span>
                </article>
                <article>
                  <strong>Firebase</strong>
                  <span>Listo para crecer</span>
                </article>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section panel">
        <div className="section-heading">
          <span className="eyebrow">Más allá del examen tradicional</span>
          <h2>Formatos pensados para toda la ruta de aprendizaje.</h2>
        </div>
        <div className="card-grid four-up">
          {sections.map((item) => (
            <article key={item.title} className="info-card">
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section panel">
        <div className="section-heading">
          <span className="eyebrow">Elige la estética</span>
          <h2>Una sola plataforma, distintos lenguajes visuales.</h2>
        </div>
        <div className="card-grid four-up">
          {styles.map((item) => (
            <article key={item.title} className="style-card">
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section panel split">
        <div>
          <span className="eyebrow">Cómo funciona</span>
          <h2>Un flujo simple, pensado para docentes y equipos de capacitación.</h2>
          <div className="timeline">
            {steps.map((step, index) => (
              <div key={step} className="timeline-item">
                <span>{index + 1}</span>
                <p>{step}</p>
              </div>
            ))}
          </div>
        </div>
        <aside className="benefit-box">
          <span className="eyebrow">Beneficio pedagógico</span>
          <h3>Evaluación formativa invisible.</h3>
          <p>
            Obtén datos en tiempo real del progreso mientras el alumno siente que está superando un nivel.
          </p>
          <ul>
            <li>Feedback inmediato</li>
            <li>Accesibilidad y carga ligera</li>
            <li>Funciona en cualquier dispositivo</li>
          </ul>
        </aside>
      </section>

      <section className="section panel">
        <div className="section-heading row-between">
          <div>
            <span className="eyebrow">Catálogo</span>
            <h2>Juegos disponibles en recuadros para jugar en línea o descargar.</h2>
          </div>
          <Link to="/games" className="button secondary">Ir al catálogo</Link>
        </div>
        <div className="game-grid">
          {gameCatalog.map((game) => (
            <Link key={game.slug} to={`/games/${game.slug}`} className="game-card">
              <span className="game-tag">{game.type}</span>
              <h3>{game.title}</h3>
              <p>{game.description}</p>
              <div className="game-meta">
                <span>{game.mode}</span>
                <span>{game.palette}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="section panel cta">
        <div>
          <span className="eyebrow">Slogan</span>
          <h2>Wigadu: la plataforma donde el contenido educativo se convierte en juego.</h2>
        </div>
        <Link to="/login" className="button primary">Crear cuenta</Link>
      </section>
    </>
  )
}

function GamesPage() {
  return (
    <section className="section panel">
      <div className="section-heading">
        <span className="eyebrow">Catálogo completo</span>
        <h1>Explora todos los juegos disponibles.</h1>
        <p>Los juegos pueden abrirse en línea o prepararse para descarga según el módulo.</p>
      </div>
      <div className="game-grid">
        {gameCatalog.map((game) => (
          <Link key={game.slug} to={`/games/${game.slug}`} className="game-card">
            <span className="game-tag">{game.type}</span>
            <h3>{game.title}</h3>
            <p>{game.description}</p>
            <div className="game-meta">
              <span>{game.mode}</span>
              <span>{game.palette}</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}

function GameDetailPage() {
  const { slug } = useParams()
  const game = gameCatalog.find((item) => item.slug === slug)

  if (!game) {
    return (
      <section className="section panel">
        <h1>Juego no encontrado</h1>
        <p>Revisa el catálogo o vuelve al inicio.</p>
        <Link to="/games" className="button secondary">Volver al catálogo</Link>
      </section>
    )
  }

  return (
    <section className="section panel game-detail">
      <div>
        <span className="eyebrow">Vista de juego</span>
        <h1>{game.title}</h1>
        <p>{game.description}</p>
        <div className="hero-badges">
          <span>{game.type}</span>
          <span>{game.mode}</span>
          <span>{game.palette}</span>
        </div>
      </div>
      <div className="game-player">
        <div className="placeholder-stage">
          <strong>Jugar en línea</strong>
          <p>Espacio reservado para el motor del juego incrustado.</p>
        </div>
        <div className="hero-actions">
          <button className="button primary" type="button">Abrir juego</button>
          <button className="button secondary" type="button">Descargar</button>
        </div>
      </div>
    </section>
  )
}

function LoginPage() {
  return (
    <section className="section panel auth-layout">
      <div>
        <span className="eyebrow">Acceso</span>
        <h1>Entra a tu cuenta de Wigadu.</h1>
        <p>Firebase Auth quedará conectado aquí para docentes, administradores y estudiantes.</p>
      </div>
      <form className="auth-card">
        <label>
          Email
          <input type="email" placeholder="tu@email.com" />
        </label>
        <label>
          Contraseña
          <input type="password" placeholder="••••••••" />
        </label>
        <button className="button primary" type="button">Iniciar sesión</button>
        <p className="muted">{firebaseReady ? 'Firebase configurado' : 'Pendiente de configurar Firebase'}</p>
      </form>
    </section>
  )
}

function DashboardPage() {
  return (
    <section className="section panel dashboard">
      <div>
        <span className="eyebrow">Dashboard</span>
        <h1>Administración principal de Wigadu.</h1>
        <p>Vista base para usuarios, juegos publicados y actividad reciente.</p>
      </div>
      <div className="stats-grid">
        <article><strong>24</strong><span>Actividades</span></article>
        <article><strong>8</strong><span>Juegos activos</span></article>
        <article><strong>1.2k</strong><span>Partidas</span></article>
        <article><strong>96%</strong><span>Retención</span></article>
      </div>
    </section>
  )
}

function AdminPage() {
  return (
    <section className="section panel admin-page">
      <div>
        <span className="eyebrow">Administración</span>
        <h1>Panel para gestionar usuarios, juegos y contenido.</h1>
        <p>
          Esta área quedará conectada a Firestore y Storage para administrar colecciones,
          archivos y publicaciones.
        </p>
      </div>
      <div className="admin-columns">
        <article className="info-card">
          <h3>Usuarios</h3>
          <p>Roles, permisos y perfiles para docentes, estudiantes y admins.</p>
        </article>
        <article className="info-card">
          <h3>Juegos</h3>
          <p>Subida, organización y publicación de juegos por carpetas o módulos.</p>
        </article>
        <article className="info-card">
          <h3>Firebase</h3>
          <p>{firebaseReady ? 'Configuración detectada.' : 'Configura variables de entorno para activar Firebase.'}</p>
        </article>
      </div>
    </section>
  )
}

export default function App() {
  return (
    <Shell>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/games" element={<GamesPage />} />
        <Route path="/games/:slug" element={<GameDetailPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </Shell>
  )
}
