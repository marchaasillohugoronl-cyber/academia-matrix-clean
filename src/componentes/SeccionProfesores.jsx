'use client'
import { useAparecer } from './useAparecer'
import styles from './SeccionProfesores.module.css'

const PROFESORES = [
  {
    foto: '/team/profesor1.jpg',
    nombre: 'Prof. Nombre',
    especialidad: 'Álgebra · Aritmética · UNI',
    descripcion: 'Especialista en razonamiento algebraico con más de 8 años preparando ingresantes a UNI y San Marcos. Alta tasa de aprobación en exámenes de admisión.',
    iniciales: 'PN',
  },
  {
    foto: '/team/profesor2.jpg',
    nombre: 'Prof. Apellido',
    especialidad: 'Geometría · Trigonometría',
    descripcion: 'Metodología visual e intuitiva que transforma alumnos de nivel básico en competidores fuertes para cualquier examen universitario.',
    iniciales: 'PA',
  },
  {
    foto: '/team/profesor3.jpg',
    nombre: 'Prof. Nombre',
    especialidad: 'Geometría Analítica · Pre-U',
    descripcion: 'Enfoque progresivo y dominio de problemas complejos. Especialista en preparación para Ingeniería con resultados comprobados.',
    iniciales: 'PN',
  },
]

function TarjetaProfesor({ foto, nombre, especialidad, descripcion, iniciales, retraso }) {
  const { ref, visible } = useAparecer()

  return (
    <div
      ref={ref}
      className={`${styles.card} ${visible ? styles.visible : ''}`}
      style={{ transitionDelay: `${retraso}ms` }}
    >
      <div className={styles.fotoWrap}>
        {/* El placeholder se muestra si la foto no carga */}
        <div className={styles.fotoPlaceholder}>{iniciales}</div>
        <img src={foto} alt={nombre} className={styles.fotoImg} />
      </div>
      <div className={styles.info}>
        <h3 className={styles.nombre}>{nombre}</h3>
        <p className={styles.especialidad}>{especialidad}</p>
        <p className={styles.descripcion}>{descripcion}</p>
      </div>
    </div>
  )
}

export default function SeccionProfesores() {
  return (
    <section id="profesores" className="contenedor-seccion">
      <div className="etiqueta-seccion">El equipo</div>
      <h2 className="titulo-seccion">Nuestros profesores</h2>
      <p className={styles.intro}>
        Especialistas en matemáticas con experiencia comprobada en preparación
        universitaria. Cada profesor domina su área y conoce los exámenes de admisión
        de las principales universidades del país.
      </p>
      <div className={styles.grid}>
        {PROFESORES.map((p, i) => (
          <TarjetaProfesor key={`${p.nombre}-${i}`} {...p} retraso={i * 150} />
        ))}
      </div>
    </section>
  )
}
