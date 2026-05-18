'use client'
import { useRouter }  from 'next/navigation'
import * as Icons     from 'lucide-react'
import BarraCTAMobile from '@/componentes/BarraCTAMobile'
import {
  Clock, BookOpen, Rocket, Timer, Phone,
  Hash, Waves, Zap, FlaskConical,
  Brain, Variable, Shapes, ArrowLeft,
} from 'lucide-react'
import styles from './PaginaCursosNivel.module.css'

const ICONOS_CURSO = {
  'álgebra':                 Variable,
  'aritmética':              Hash,
  'geometría':               Shapes,
  'trigonometría':           Waves,
  'física':                  Zap,
  'química':                 FlaskConical,
  'razonamiento matemático': Brain,
  'razonamiento verbal':     BookOpen,
}

function obtenerIconoCurso(nombre) {
  const clave = nombre.toLowerCase()
  for (const [key, Icon] of Object.entries(ICONOS_CURSO)) {
    if (clave.includes(key)) return Icon
  }
  return BookOpen
}

export default function PaginaCursosNivel({ ciclo, nivel, cursos, sitio }) {
  const navegar    = useRouter()
  const IconoNivel = nivel.icono ? Icons[nivel.icono] : null

  // Elimina cursos con nombre duplicado, conserva el primero de cada uno
  const cursosUnicos = cursos.filter(
    (c, i, arr) => arr.findIndex(x => x.nombre.trim().toLowerCase() === c.nombre.trim().toLowerCase()) === i
  )

  return (
    <>
    <div className={styles.page}>

      {/* ── Encabezado ─────────────────────────── */}
      <div className={styles.header} style={{ '--level-color': nivel.color }}>
        <div className={styles.headerInner}>

          {/* Volver */}
          <button
            type="button"
            className={styles.backBtn}
            onClick={() => navegar.push('/')}
          >
            <ArrowLeft size={15} />
            {ciclo.nombre}
          </button>

          {/* Título del nivel */}
          <div className={styles.headerTop}>
            <div className={styles.levelIconBox} style={{ borderColor: `${nivel.color}55`, color: nivel.color }}>
              {IconoNivel && <IconoNivel size={26} strokeWidth={1.5} />}
            </div>
            <div>
              <span className={styles.badge} style={{ color: nivel.color, borderColor: `${nivel.color}44` }}>
                {ciclo.nombre}
              </span>
              <h1 className={styles.title}>Nivel {nivel.nombre}</h1>
              <p className={styles.sub}>{cursosUnicos.length} cursos · {ciclo.duracion}</p>
            </div>
          </div>

          {/* Stats rápidas */}
          <div className={styles.statsRow}>
            <div className={styles.statItem}>
              <Rocket size={14} style={{ color: nivel.color }} />
              <span className={styles.statLabel}>Inicio</span>
              <span className={styles.statValue}>{ciclo.inicioClases}</span>
            </div>
            {ciclo.totalHoras && (
              <div className={styles.statItem}>
                <Clock size={14} style={{ color: nivel.color }} />
                <span className={styles.statLabel}>Horas</span>
                <span className={styles.statValue}>{ciclo.totalHoras}</span>
              </div>
            )}
            {ciclo.turnos?.length > 0 && (
              <div className={styles.statItem}>
                <Timer size={14} style={{ color: nivel.color }} />
                <span className={styles.statLabel}>Turnos</span>
                <span className={styles.statValue}>{ciclo.turnos.join(' / ')}</span>
              </div>
            )}
            <div className={styles.statItem}>
              <BookOpen size={14} style={{ color: nivel.color }} />
              <span className={styles.statLabel}>Inscripciones</span>
              <span className={styles.statValue}>{ciclo.inicioInscripcion}</span>
            </div>
          </div>

        </div>
      </div>

      {/* ── Cuerpo ─────────────────────────────── */}
      <div className={styles.body}>

        {/* Cursos */}
        <div>
          <h2 className={styles.sectionTitle}>Cursos del nivel</h2>
          <div className={styles.coursesGrid}>
            {cursosUnicos.map((curso, i) => {
              const IconoCurso = obtenerIconoCurso(curso.nombre)
              return (
                <div
                  key={curso.id ?? curso.nombre}
                  className={styles.courseCard}
                  style={{ animationDelay: `${i * 50}ms`, '--level-color': nivel.color }}
                >
                  <div className={styles.courseIconWrap}>
                    <IconoCurso size={20} strokeWidth={1.5} />
                  </div>
                  <div className={styles.courseName}>{curso.nombre}</div>
                  <div className={styles.courseNum}>{String(i + 1).padStart(2, '0')}</div>
                </div>
              )
            })}
          </div>
        </div>

        {/* CTA */}
        <div className={styles.cta} style={{ '--level-color': nivel.color }}>
          <div>
            <h3 className={styles.ctaTitle}>
              ¿Listo para inscribirte en{' '}
              <span style={{ color: nivel.color }}>nivel {nivel.nombre}</span>?
            </h3>
            <p className={styles.ctaSub}>
              Inscripciones abiertas: {ciclo.inicioInscripcion} — {ciclo.finInscripcion}
            </p>
          </div>
          <a
            href={sitio?.whatsapp ?? '#'}
            target="_blank"
            rel="noreferrer"
            className={styles.waBtn}
          >
            <Phone size={16} />
            Inscribirme · {sitio?.telefono ?? ''}
          </a>
        </div>

      </div>
    </div>

    <BarraCTAMobile
      href={sitio?.whatsapp ?? '#'}
      telefono={sitio?.telefono}
      label="Inscribirme ahora"
    />
    </>
  )
}
