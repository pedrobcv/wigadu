import { useEffect, useState } from 'react'
import {
  GoogleAuthProvider,
  OAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from 'firebase/auth'
import { doc, serverTimestamp, setDoc } from 'firebase/firestore'
import { Link, Navigate, Route, Routes, useLocation, useNavigate, useParams } from 'react-router-dom'
import { LanguageSelector } from './components/LanguageSelector'
import { auth, db, firebaseReady } from './lib/firebase'
import { useI18n } from './i18n/I18nProvider'

const providerFactories = {
  google: () => new GoogleAuthProvider(),
  microsoft: () => new OAuthProvider('microsoft.com'),
  apple: () => new OAuthProvider('apple.com'),
}

function getAuthErrorMessage(authError, copy, providerId) {
  const providerHint = copy.auth.providers.find((item) => item.id === providerId)?.hint || copy.auth.authMissing

  switch (authError?.code) {
    case 'auth/unauthorized-domain':
      return copy.auth.unauthorizedDomain
    case 'auth/popup-blocked':
      return copy.auth.popupBlocked
    case 'auth/popup-closed-by-user':
    case 'auth/cancelled-popup-request':
      return copy.auth.popupClosed
    case 'auth/operation-not-allowed':
      return providerHint
    default:
      return authError?.message || copy.auth.authMissing
  }
}

const adminAllowlist = new Set(
  (import.meta.env.VITE_ADMIN_EMAILS ?? '')
    .split(',')
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean),
)

function syncUserProfile(user, providerId, created = false) {
  if (!db || !user) return Promise.resolve()

  return setDoc(
    doc(db, 'users', user.uid),
    {
      uid: user.uid,
      email: user.email ?? '',
      displayName: user.displayName ?? '',
      photoURL: user.photoURL ?? '',
      providerId,
      role: 'teacher',
      lastLoginAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      ...(created ? { createdAt: serverTimestamp() } : {}),
    },
    { merge: true },
  )
}

function AccessNotice({ eyebrow, title, text, ctaLabel, ctaTo = '/login' }) {
  return (
    <section className="section panel access-gate">
      <div className="access-gate-copy">
        <span className="eyebrow">{eyebrow}</span>
        <h1>{title}</h1>
        <p>{text}</p>
        <div className="access-gate-actions">
          <Link to={ctaTo} className="button primary">
            {ctaLabel}
          </Link>
        </div>
      </div>
    </section>
  )
}

function Shell({ children, user, isAdminUser, onSignOut }) {
  const { copy } = useI18n()
  const { nav } = copy

  return (
    <div className="app-shell app-shell-light">
      <header className="topbar kahoot-topbar">
        <Link to="/" className="brand kahoot-brand">
          <span className="brand-mark">W</span>
          <span>
            <strong>{copy.brand.name}</strong>
            <small>{copy.brand.tagline}</small>
          </span>
        </Link>

        <nav className="nav kahoot-nav">
          <div className="nav-primary">
            <Link to="/#juegos" className="nav-link nav-main-link">
              {nav.games}
            </Link>
            <Link to="/#precios" className="nav-link nav-main-link">
              {nav.prices}
            </Link>
            <Link to="/#historias" className="nav-link nav-main-link">
              {nav.stories}
            </Link>
            <Link to="/#acerca" className="nav-link nav-main-link">
              {nav.about}
            </Link>
          </div>

          <div className="nav-actions">
            {user ? (
              <>
                <Link to="/dashboard" className="nav-link nav-main-link">
                  {nav.dashboard}
                </Link>
                {isAdminUser ? (
                  <Link to="/admin" className="nav-link nav-main-link">
                    {nav.admin}
                  </Link>
                ) : null}
                <button className="nav-cta nav-button" type="button" onClick={onSignOut}>
                  {nav.logout}
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="nav-cta nav-button">
                  {nav.startFree}
                </Link>
                <Link to="/login" className="nav-link nav-main-link">
                  {nav.login}
                </Link>
              </>
            )}
            <LanguageSelector variant="topbar" />
          </div>
        </nav>
      </header>

      <main>{children}</main>
    </div>
  )
}

function Landing() {
  const { copy } = useI18n()
  const { landing } = copy

  return (
    <>
      <section className="hero kahoot-hero">
        <div className="hero-copy kahoot-hero-copy">
          <h1>{landing.heroTitle}</h1>
          <p>{landing.heroText}</p>
          <div className="hero-badges kahoot-badges">
            {landing.heroBadges.map((badge) => (
              <span key={badge}>{badge}</span>
            ))}
          </div>
        </div>
      </section>

      <section id="precios" className="section panel pricing-section">
        <div className="section-heading section-heading-wide">
          <span className="eyebrow">{copy.nav.prices}</span>
          <h2>{landing.pricing.title}</h2>
          <p>{landing.pricing.text}</p>
        </div>
        <div className="product-row">
          {landing.productCards.map((product, index) => (
            <article key={product.title} className={`product-card accent-${product.accent}`}>
              <span className="product-badge">{product.badge}</span>
              <h3>{product.title}</h3>
              <p>{product.subtitle}</p>
              <p>{product.copy}</p>
              <div className="price-block">
                <strong>{product.price}</strong>
                <span>{product.offer}</span>
              </div>
              <div className="hero-actions product-actions">
                <Link to="/login" className="button product-primary">
                  {product.cta}
                </Link>
                <Link to={index === 1 ? `/games/${copy.games[0].slug}` : '/games'} className="button product-secondary">
                  {product.learnMore}
                </Link>
              </div>
              <div className={`mockup mockup-${product.accent}`}>
                {product.mockup === 'season' ? (
                  <div className="mockup-content mockup-plus">
                    <div className="mockup-season" />
                  </div>
                ) : product.mockup === 'quiz' ? (
                  <div className="mockup-content mockup-one">
                    <div className="mockup-question">{copy.landing.mockups.quizQuestion}</div>
                    <div className="mockup-grid-quiz">
                      {copy.landing.mockups.quizOptions.map((option) => (
                        <span key={option}>{option}</span>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="mockup-content mockup-360">
                    <div className="mockup-question">{copy.landing.mockups.chartQuestion}</div>
                    <div className="mockup-chart">
                      <span />
                      <span />
                      <span />
                    </div>
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="juegos" className="section panel games-section">
        <div className="section-heading row-between">
          <div>
            <span className="eyebrow">{copy.landing.catalog.eyebrow}</span>
            <h2>{copy.landing.catalog.title}</h2>
            <p>{copy.landing.gameDetail.intro}</p>
          </div>
          <Link to="/games" className="button secondary">
            {copy.landing.catalog.cta}
          </Link>
        </div>
        <div className="game-grid">
          {copy.games.map((game) => (
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

      <section id="historias" className="section panel stories-section">
        <div className="section-heading section-heading-wide">
          <span className="eyebrow">{copy.nav.stories}</span>
          <h2>{landing.stories.title}</h2>
          <p>{landing.stories.text}</p>
        </div>
        <div className="story-grid">
          {landing.stories.items.map((story) => (
            <article key={story.author} className="story-card">
              <div className="story-quote">“{story.quote}”</div>
              <div className="story-footer">
                <div>
                  <strong>{story.author}</strong>
                  <span>{story.role}</span>
                </div>
                <span className="story-result">{story.result}</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="acerca" className="section panel about-section">
        <div className="section-heading section-heading-wide">
          <span className="eyebrow">{copy.brand.name}</span>
          <h2>{landing.about.title}</h2>
          <p>{landing.about.text}</p>
        </div>
        <div className="about-layout">
          <div className="about-copy">
            <div className="hero-badges about-badges">
              {landing.about.badges.map((badge) => (
                <span key={badge}>{badge}</span>
              ))}
            </div>
            <div className="timeline about-timeline">
              {landing.steps.map((step, index) => (
                <div key={step} className="timeline-item">
                  <span>{index + 1}</span>
                  <p>{step}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="about-grid">
            {landing.about.cards.map((item) => (
              <article key={item.title} className="about-card">
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section panel cta">
        <div>
          <span className="eyebrow">{copy.brand.name}</span>
          <h2>{copy.brand.tagline}</h2>
        </div>
        <Link to="/login" className="button primary">
          {landing.heroCtas.primary}
        </Link>
      </section>
    </>
  )
}

function GamesPage() {
  const { copy } = useI18n()

  return (
    <section className="section panel">
      <div className="section-heading">
        <span className="eyebrow">{copy.landing.catalog.eyebrow}</span>
        <h1>{copy.landing.catalog.title}</h1>
        <p>{copy.landing.gameDetail.intro}</p>
      </div>
      <div className="game-grid">
        {copy.games.map((game) => (
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
  const { copy } = useI18n()
  const game = copy.games.find((item) => item.slug === slug)

  if (!game) {
    return (
      <section className="section panel">
        <h1>{copy.landing.catalog.empty}</h1>
        <p>{copy.landing.gameDetail.missingText}</p>
        <Link to="/games" className="button secondary">
          {copy.landing.catalog.back}
        </Link>
      </section>
    )
  }

  return (
    <section className="section panel game-detail">
      <div>
        <span className="eyebrow">{copy.landing.gameDetail.viewLabel}</span>
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
          <strong>{copy.landing.gameDetail.playLabel}</strong>
          <p>{copy.landing.gameDetail.engineText}</p>
        </div>
        <div className="hero-actions">
          <button className="button primary" type="button">
            {copy.landing.gameDetail.open}
          </button>
          <button className="button secondary" type="button">
            {copy.landing.gameDetail.download}
          </button>
        </div>
      </div>
    </section>
  )
}

function LoginPage({ user }) {
  const { copy } = useI18n()
  const navigate = useNavigate()
  const [mode, setMode] = useState('signin')
  const [displayName, setDisplayName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [status, setStatus] = useState('')
  const [error, setError] = useState('')
  const [busyAction, setBusyAction] = useState('')

  const ready = firebaseReady && auth
  const isBusy = Boolean(busyAction)

  useEffect(() => {
    if (user?.displayName && !displayName) {
      setDisplayName(user.displayName)
    }
  }, [displayName, user])

  useEffect(() => {
    if (!user?.email) return

    const emailValue = user.email.toLowerCase()
    navigate(adminAllowlist.has(emailValue) ? '/admin' : '/dashboard', { replace: true })
  }, [navigate, user])

  function goToSignedInArea(authedUser) {
    const emailValue = authedUser?.email?.toLowerCase()
    navigate(emailValue && adminAllowlist.has(emailValue) ? '/admin' : '/dashboard', { replace: true })
  }

  async function handleEmailSubmit(event) {
    event.preventDefault()
    if (!ready) {
      setError(copy.auth.authMissing)
      return
    }

    const action = mode === 'signup' ? 'signup' : 'signin'
    setBusyAction(action)
    setError('')
    setStatus('')

    try {
      if (mode === 'signup') {
        const credential = await createUserWithEmailAndPassword(auth, email, password)
        if (displayName.trim()) {
          await updateProfile(credential.user, { displayName: displayName.trim() })
        }
        await syncUserProfile(credential.user, 'password', true)
        goToSignedInArea(credential.user)
      } else {
        const credential = await signInWithEmailAndPassword(auth, email, password)
        await syncUserProfile(credential.user, 'password', false)
        goToSignedInArea(credential.user)
      }
    } catch (authError) {
      setError(getAuthErrorMessage(authError, copy))
    } finally {
      setBusyAction('')
    }
  }

  async function handleProviderLogin(providerId) {
    if (!ready) {
      setError(copy.auth.authMissing)
      return
    }

    const factory = providerFactories[providerId]
    if (!factory) {
      setError(copy.auth.providers.find((item) => item.id === providerId)?.hint || copy.auth.authMissing)
      return
    }

    setBusyAction(providerId)
    setError('')
    setStatus('')

    try {
      const credential = await signInWithPopup(auth, factory())
      await syncUserProfile(credential.user, providerId, false)
      goToSignedInArea(credential.user)
    } catch (authError) {
      setError(getAuthErrorMessage(authError, copy, providerId))
    } finally {
      setBusyAction('')
    }
  }

  async function handleResetPassword() {
    if (!ready) {
      setError(copy.auth.authMissing)
      return
    }

    if (!email) {
      setError(copy.auth.needEmail)
      return
    }

    setBusyAction('reset')
    setError('')
    setStatus('')

    try {
      await sendPasswordResetEmail(auth, email)
      setStatus(copy.auth.resetSuccess)
    } catch (authError) {
      setError(getAuthErrorMessage(authError, copy))
    } finally {
      setBusyAction('')
    }
  }

  return (
    <div className="auth-page">
      <header className="auth-header">
        <Link to="/" className="auth-brand">
          <span className="auth-brand-mark">W</span>
          <span className="auth-brand-name">{copy.brand.name}</span>
        </Link>
        <LanguageSelector variant="auth" />
      </header>

      <main className="auth-main">
        <section className="auth-window">
          <h1>{copy.auth.title}</h1>

          <div className="social-login-grid">
            {copy.auth.providers.map((item) => (
              <button
                key={item.id}
                className={`social-btn social-${item.id} ${busyAction === item.id ? 'is-busy' : ''}`}
                type="button"
                onClick={() => handleProviderLogin(item.id)}
                disabled={isBusy}
                aria-busy={busyAction === item.id}
              >
                <span className="social-icon" aria-hidden="true">
                  {busyAction === item.id ? <span className="button-spinner" /> : (
                    <>
                      {item.id === 'google' && 'G'}
                      {item.id === 'microsoft' && '□'}
                      {item.id === 'apple' && ''}
                      {item.id === 'clever' && 'C'}
                    </>
                  )}
                </span>
                <span>{busyAction === item.id ? copy.auth.connecting : item.label}</span>
              </button>
            ))}
          </div>

          <button className={`sso-btn ${busyAction === 'sso' ? 'is-busy' : ''}`} type="button" disabled={isBusy}>
            {busyAction === 'sso' ? copy.auth.connecting : copy.auth.sso}
          </button>

          <div className="auth-divider">
            <span>{copy.auth.or}</span>
          </div>

          <form className="auth-form" onSubmit={handleEmailSubmit}>
            {mode === 'signup' ? (
              <label>
                {copy.auth.displayName}
                <input
                  type="text"
                  placeholder={copy.auth.displayNamePlaceholder}
                  value={displayName}
                  onChange={(event) => setDisplayName(event.target.value)}
                  disabled={isBusy}
                />
              </label>
            ) : null}

            <label>
              {copy.auth.email}
              <input
                type="email"
                placeholder={copy.auth.emailPlaceholder}
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                disabled={isBusy}
              />
            </label>

            <label>
              {copy.auth.password}
              <div className="password-field">
                <input
                  type="password"
                  placeholder={copy.auth.passwordPlaceholder}
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  disabled={isBusy}
                />
                <span className="eye-icon">👁</span>
              </div>
            </label>

            <button className="trouble-link" type="button" onClick={handleResetPassword} disabled={isBusy}>
              {busyAction === 'reset' ? copy.auth.connecting : copy.auth.trouble}
            </button>

            <button className={`login-btn ${isBusy ? 'is-busy' : ''}`} type="submit" disabled={isBusy || !email || !password}>
              <span className="button-label">
                {busyAction === 'signup'
                  ? copy.auth.creatingUser
                  : busyAction === 'signin'
                    ? copy.auth.signingIn
                    : mode === 'signup'
                      ? copy.auth.createUser
                      : copy.auth.login}
              </span>
              {isBusy ? <span className="button-spinner" aria-hidden="true" /> : null}
            </button>
          </form>

          <p className="signup-text">
            {mode === 'signin' ? copy.auth.signupPrompt : copy.auth.signin}
            {' '}
            <button className="link-button" type="button" onClick={() => setMode(mode === 'signin' ? 'signup' : 'signin')}>
              {mode === 'signin' ? copy.auth.createAccount : copy.auth.signin}
            </button>
          </p>

          <p className="legal-text">{copy.auth.terms}</p>


          <div className="auth-feedback">
            <p className="muted">{firebaseReady ? copy.auth.authReady : copy.auth.authMissing}</p>
            {copy.auth.providers.map((item) => (
              <p key={item.id} className="muted small-note">
                {item.hint}
              </p>
            ))}
            {status ? <p className="status success">{status}</p> : null}
            {error ? <p className="status error">{error}</p> : null}
          </div>
        </section>
      </main>
    </div>
  )
}

function DashboardPage({ user, onSignOut }) {
  const { copy } = useI18n()

  if (!user) {
    return (
      <AccessNotice
        eyebrow={copy.dashboard.eyebrow}
        title={copy.dashboard.gateTitle}
        text={copy.dashboard.gateText}
        ctaLabel={copy.dashboard.gateCta}
      />
    )
  }

  return (
    <section className="section panel dashboard">
      <div className="dashboard-header">
        <div>
          <span className="eyebrow">{copy.dashboard.eyebrow}</span>
          <h1>{copy.dashboard.title}</h1>
          <p>{copy.dashboard.text}</p>
        </div>
        <div className="session-card">
          <strong>{user.displayName || copy.dashboard.accountLabel}</strong>
          <span>{user.email}</span>
          <button className="button secondary" type="button" onClick={onSignOut}>
            {copy.nav.logout}
          </button>
        </div>
      </div>
      <div className="stats-grid">
        {copy.dashboard.stats.map((stat) => (
          <article key={stat.label}>
            <strong>{stat.value}</strong>
            <span>{stat.label}</span>
          </article>
        ))}
      </div>
    </section>
  )
}

function AdminPage({ user, isAdminUser }) {
  const { copy } = useI18n()

  if (!user) {
    return (
      <AccessNotice
        eyebrow={copy.admin.eyebrow}
        title={copy.admin.gateTitle}
        text={copy.admin.gateText}
        ctaLabel={copy.admin.gateCta}
      />
    )
  }

  if (!isAdminUser) {
    return (
      <section className="section panel admin-page">
        <div className="access-card locked-card">
          <span className="eyebrow">{copy.admin.eyebrow}</span>
          <h1>{copy.admin.lockedTitle}</h1>
          <p>{copy.admin.lockedText}</p>
          <p className="muted small-note">{copy.admin.lockedHint}</p>
        </div>
      </section>
    )
  }

  return (
    <section className="section panel admin-page">
      <div>
        <span className="eyebrow">{copy.admin.eyebrow}</span>
        <h1>{copy.admin.title}</h1>
        <p>{copy.admin.text}</p>
      </div>
      <div className="admin-columns">
        <article className="info-card">
          <h3>{copy.admin.users}</h3>
          <p>{copy.admin.usersText}</p>
          <p className="muted small-note">
            {user ? `${copy.admin.sessionLabel}: ${user.email || user.uid}` : copy.admin.usersHint}
          </p>
        </article>
        <article className="info-card">
          <h3>{copy.admin.games}</h3>
          <p>{copy.admin.gamesText}</p>
        </article>
        <article className="info-card">
          <h3>{copy.admin.firebase}</h3>
          <p>{firebaseReady ? copy.admin.firebaseReady : copy.admin.firebaseMissing}</p>
        </article>
      </div>
    </section>
  )
}

function AppRoutes() {
  const [user, setUser] = useState(null)
  const location = useLocation()
  const isAuthRoute = location.pathname.startsWith('/login')
  const isAdminUser = Boolean(user?.email && adminAllowlist.has(user.email.toLowerCase()))

  useEffect(() => {
    if (!auth) return undefined

    return onAuthStateChanged(auth, (nextUser) => {
      setUser(nextUser)
    })
  }, [])

  useEffect(() => {
    if (!location.hash) return undefined

    const timeoutId = window.setTimeout(() => {
      const target = document.querySelector(location.hash)
      target?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 0)

    return () => window.clearTimeout(timeoutId)
  }, [location.pathname, location.hash])

  async function handleSignOut() {
    if (!auth) return
    await signOut(auth)
  }

  const routes = (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/games" element={<GamesPage />} />
      <Route path="/games/:slug" element={<GameDetailPage />} />
      <Route path="/login" element={<LoginPage user={user} />} />
      <Route path="/dashboard" element={<DashboardPage user={user} onSignOut={handleSignOut} />} />
      <Route path="/admin" element={<AdminPage user={user} isAdminUser={isAdminUser} />} />
    </Routes>
  )

  if (isAuthRoute && user) {
    return <Navigate to={isAdminUser ? '/admin' : '/dashboard'} replace />
  }

  return isAuthRoute ? <>{routes}</> : <Shell user={user} isAdminUser={isAdminUser} onSignOut={handleSignOut}>{routes}</Shell>
}

export default function App() {
  return <AppRoutes />
}
