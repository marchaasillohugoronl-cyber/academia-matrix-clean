'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import styles from './Portada.module.css'
import Link from 'next/link'
import { Clock, CalendarCheck, BookOpen, GraduationCap, Target, UserCheck } from 'lucide-react'
import { useAparecer } from './useAparecer'

const LOGOS_BG = [
  { src: '/universidad/Uni.png',         alt: 'UNI'   },
  { src: '/universidad/UNMSM.svg',       alt: 'UNMSM' },
  { src: '/universidad/Escudo_UNSA.png', alt: 'UNSA'  },
  { src: '/universidad/Logo_UNAP.png',   alt: 'UNAP'  },
  { src: '/universidad/uni_juliaca.svg', alt: 'UNJ'   },
  { src: '/universidad/uman.svg',        alt: 'UMAN'  },
  { src: '/escuela/coar.png',            alt: 'COAR'  },
  { src: '/escuela/escuela.png',         alt: 'Esc'   },
]

const NIVELES = [
  { id: 'primaria',         icono: BookOpen,      nombre: 'Primaria'        },
  { id: 'secundaria',       icono: GraduationCap, nombre: 'Secundaria'      },
  { id: 'preuniversitario', icono: Target,        nombre: 'Preuniversitario'},
]

function NivelBtn({ id, icono: Icono, nombre, retraso }) {
  const { ref, visible } = useAparecer()
  const navegar = useRouter()
  return (
    <button
      ref={ref}
      onClick={() => navegar.push(`/ciclos/sabatino/nivel/${id}`)}
      className={`${styles.nivelBtn} ${visible ? styles.nivelBtnVisible : ''}`}
      style={{ transitionDelay: `${retraso}ms` }}
    >
      <Icono size={22} />
      <span>{nombre}</span>
    </button>
  )
}

const SLOTS = [
  { top: '50%', left: '50%', delay: 200, startIdx: 0 },
]

function LogoSlot({ style, delay, startIdx }) {
  const [idx,     setIdx]     = useState(startIdx)
  const [visible, setVisible] = useState(false)
  const iRef = useRef(null)
  const tRef = useRef(null)

  useEffect(() => {
    tRef.current = setTimeout(() => {
      setVisible(true)
      iRef.current = setInterval(() => {
        setVisible(false)
        tRef.current = setTimeout(() => {
          setIdx(i => (i + 1) % LOGOS_BG.length)
          setVisible(true)
        }, 500)
      }, 3000)
    }, delay)
    return () => { clearTimeout(tRef.current); clearInterval(iRef.current) }
  }, [delay])

  const hidden = { opacity: 0, transform: 'translate(-50%, -50%) scale(0.82)' }
  return (
    <img
      src={LOGOS_BG[idx].src}
      alt=""
      aria-hidden="true"
      className={styles.logoBg}
      style={visible ? style : { ...style, ...hidden }}
    />
  )
}

const FORMULAS = [
  { text: 'x² + y² = r²',    top: '6%',  left: '1%',   delay: '0s',    dur: '9s'   },
  { text: '∫ f(x) dx',       top: '14%', right: '0%',  delay: '1.4s',  dur: '7.5s' },
  { text: 'E = mc²',         top: '46%', left: '0%',   delay: '3.2s',  dur: '11s'  },
  { text: 'ax²+bx+c = 0',    top: '60%', right: '0%',  delay: '2.1s',  dur: '8.5s' },
  { text: 'sin²θ+cos²θ = 1', top: '26%', left: '-2%',  delay: '4.1s',  dur: '10s'  },
  { text: 'π ≈ 3.14159…',    top: '37%', right: '-1%', delay: '0.7s',  dur: '12s'  },
  { text: '√(a²+b²) = c',    top: '74%', left: '1%',   delay: '2.7s',  dur: '9.2s' },
  { text: 'Δ = b²−4ac',      top: '83%', right: '1%',  delay: '1.3s',  dur: '8.3s' },
  { text: 'lím x→∞ f(x)',    top: '5%',  right: '25%', delay: '3.6s',  dur: '10s'  },
  { text: 'Σ nᵢ = S',        top: '91%', left: '40%',  delay: '5s',    dur: '11s'  },
]

export default function Portada() {
  return (
    <section className={styles.hero}>

      {/* ── Fórmulas flotantes ───────────────────── */}
      <div className={styles.formulasWrapper} aria-hidden="true">
        {FORMULAS.map((f, i) => (
          <span
            key={i}
            className={styles.formula}
            style={{
              top: f.top,
              ...(f.left  !== undefined && { left:  f.left  }),
              ...(f.right !== undefined && { right: f.right }),
              animationDelay:    f.delay,
              animationDuration: f.dur,
            }}
          >
            {f.text}
          </span>
        ))}
        {SLOTS.map((s, i) => (
          <LogoSlot
            key={i}
            style={{ top: s.top, left: s.left, right: s.right }}
            delay={s.delay}
            startIdx={s.startIdx}
          />
        ))}
      </div>

      {/* ── Top: título + foto ──────────────────── */}
      <div className={styles.heroTop}>

        <div className={styles.heroTexto}>

          <div className={styles.heroTitle}>
            <h2>ACADEMIA<br />MATRIX</h2>
          </div>

          <p className={styles.subtitle}>Academia de Matemáticas</p>

          <span className={styles.badgePresencial}>100&nbsp;%&nbsp;PRESENCIAL</span>

          <h3 className={styles.cicloNombre}>CICLO SÁBADOS</h3>

          <div className={styles.ubicacion}>
            <span>CABANILLAS</span>
            <svg className={styles.pinIcon} viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
            </svg>
          </div>

        </div>

        {/* Foto del profesor principal */}
        <div className={styles.heroFoto}>
          <div className={styles.fotoWrapper}>
            <img src="/team/logo.png" alt="Profesor Principal" className={styles.fotoImg} />
          </div>
        </div>
 
      </div>

      {/* ── Niveles ──────────────────────────────── */}
      <div className={styles.nivelesInfo}>

      {/* ── CTAs ─────────────────────────────────── */}
      <div className={styles.ctaRow}>
        <Link href="/registro" className={styles.btnInscribirse}>
          &nbsp;Inscribirme
        </Link>
        <Link href="/portal" className={styles.btnPortal}>
          Portal alumno
        </Link>
      </div>


        <div className={styles.nivelSection}>
          <h4 className={styles.nivelTitulo}>PRIMARIA</h4>
          <div className={styles.nivelPill}>
            <span>INGENIERITOS PERÚ</span>
          </div>
        </div>

        <div className={styles.nivelSection}>
          <h4 className={styles.nivelTitulo}>SECUNDARIA</h4>
          <div className={styles.nivelPill}>
            <span>COAR</span>
            <div className={styles.escudos}>
            </div>
          </div>
        </div>

        <div className={styles.nivelSection}>
          <h4 className={styles.nivelTitulo}>PREUNIVERSITARIO</h4>
          <div className={styles.nivelPill}>
            <span>UNAP, UNAJ, UNSA</span>
          </div>
        </div>

      </div>

      {/* ── Tarjetas de info ─────────────────────── */}
      <div className={styles.infoCards}>

        <div className={styles.infoCard}>
          <div className={styles.infoIconWrap}>
            <Clock size={30} strokeWidth={1.5} />
          </div>
          <span className={styles.infoLabel}>DURACIÓN:</span>
          <span className={styles.infoValor}>CONTINUO</span>
        </div>

        <div className={styles.infoCard}>
          <div className={styles.infoIconWrap}>
            <CalendarCheck size={30} strokeWidth={1.5} />
          </div>
          <span className={styles.infoLabel}>INICIO:</span>
          <span className={styles.infoValor}>SÁBADO<br />23 DE MAYO</span>
        </div>

        <div className={styles.infoCard}>
          <div className={styles.infoIconWrap}>
            <UserCheck size={30} strokeWidth={1.5} />
          </div>
          <span className={styles.infoLabel}>INSCRIPCIONES:</span>
          <span className={styles.infoValor}>ABIERTAS<br />DESDE YA</span>
        </div>

      </div>
    </section>
  )
}
