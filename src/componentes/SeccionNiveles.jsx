'use client'
import { useAparecer } from './useAparecer'
import { useRouter }   from 'next/navigation'
import styles from './SeccionNiveles.module.css'
import { BookOpen, GraduationCap, Target, CalendarDays } from 'lucide-react'

const NIVELES = [
  { id: 'primaria',        icono: BookOpen,      nombre: 'Primaria' },
  { id: 'secundaria',      icono: GraduationCap, nombre: 'Secundaria' },
  { id: 'preuniversitario', icono: Target,       nombre: 'Preuniversitario' },
]

function BotonNivel({ icono: Icono, nombre, id, retraso }) {
  const { ref, visible } = useAparecer()
  const navegar = useRouter()

  return (
    <button
      ref={ref}
      onClick={() => navegar.push(`/ciclos/sabatino/nivel/${id}`)}
      className={`${styles.btn} ${visible ? styles.visible : ''}`}
      style={{ transitionDelay: `${retraso}ms` }}
    >
      <Icono size={26} />
      <span>{nombre}</span>
    </button>
  )
}

export default function SeccionNiveles() {
  const navegar = useRouter()
  return (
    <section id="niveles" className={styles.seccion}>
      <div className="contenedor-seccion">
        <h2 className={`titulo-seccion ${styles.titulo}`}>Niveles disponibles</h2>
        <div className={styles.buttons}>
          {NIVELES.map((n, i) => (
            <BotonNivel key={n.nombre} {...n} retraso={i * 120} />
          ))}
        </div>
        <button className={styles.btnCiclos} onClick={() => navegar.push('/ciclos/sabatino')}>
          <CalendarDays size={18} />
          Ver ciclos disponibles
        </button>
      </div>
    </section>
  )
}
