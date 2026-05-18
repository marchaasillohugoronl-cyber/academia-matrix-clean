'use client'
import { useAparecer } from './useAparecer'
import styles from './SeccionCaracteristicas.module.css'
import {
  Calculator, Brain, TrendingUp,
  UserCheck, FileText, Trophy,
} from 'lucide-react'

const CARACTERISTICAS = [
  {
    icono: Calculator,
    titulo: 'Reforzamiento matemático',
    descripcion: 'Identificamos y corregimos vacíos conceptuales con ejercicios prácticos y progresivos.',
  },
  {
    icono: TrendingUp,
    titulo: 'Metodología progresiva',
    descripcion: 'Nuestra plataforma y app están diseñadas para guiarte paso a paso, comenzando con lo esencial y avanzando de forma estructurada hacia niveles más avanzados para un aprendizaje sólido y continuo.',
  },
  {
    icono: FileText,
    titulo: 'Material incluido',
    descripcion: 'Todo el material de trabajo está cubierto en el costo del ciclo. Sin gastos extra.',
  },

]

function TarjetaCaracteristica({ icono: Icono, titulo, descripcion, retraso }) {
  const { ref, visible } = useAparecer()

  return (
    <div
      ref={ref}
      className={`${styles.card} ${visible ? styles.visible : ''}`}
      style={{ transitionDelay: `${retraso}ms` }}
    >
      <div className={styles.iconWrap}>
        <Icono size={22} strokeWidth={1.5} />
      </div>
      <div>
        <h3 className={styles.title}>{titulo}</h3>
        <p className={styles.desc}>{descripcion}</p>
      </div>
    </div>
  )
}

export default function SeccionCaracteristicas() {
  return (
    <section className={`contenedor-seccion ${styles.seccion}`}>
      <div className="etiqueta-seccion">Metodología</div>
      <h2 className="titulo-seccion">¿Por qué MATRIX?</h2>
      <div className={styles.grid}>
        {CARACTERISTICAS.map((c, i) => (
          <TarjetaCaracteristica key={c.titulo} {...c} retraso={i * 80} />
        ))}
      </div>
    </section>
  )
}
