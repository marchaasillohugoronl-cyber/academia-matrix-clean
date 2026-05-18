'use client'
import { useAparecer } from './useAparecer'
import styles from './SeccionTestimonios.module.css'

const TESTIMONIOS = [
  {
    texto: 'Gracias a Matrix ingresé a Ingeniería en la UNI. La metodología es diferente a todo lo que había probado antes. Los profesores explican hasta que entiendes de verdad.',
    nombre: 'Carlos R.',
    universidad: 'UNI — Ingeniería Civil',
    iniciales: 'CR',
    año: '2024',
  },
  {
    texto: 'Las clases son mucho mejores que otras academias. El seguimiento personalizado marcó la diferencia en mi preparación para San Marcos.',
    nombre: 'Andrea M.',
    universidad: 'UNMSM — Medicina',
    iniciales: 'AM',
    año: '2024',
  },
  {
    texto: 'Empecé desde cero en Álgebra. En un ciclo mejoré tanto que logré ingresar a UNSA. La metodología progresiva funciona de verdad.',
    nombre: 'Miguel A.',
    universidad: 'UNSA — Ingeniería de Sistemas',
    iniciales: 'MA',
    año: '2023',
  },
]

function TarjetaTestimonio({ texto, nombre, universidad, iniciales, año, retraso }) {
  const { ref, visible } = useAparecer()
  return (
    <div
      ref={ref}
      className={`${styles.card} ${visible ? styles.visible : ''}`}
      style={{ transitionDelay: `${retraso}ms` }}
    >
      <div className={styles.comillas}>&ldquo;</div>
      <p className={styles.quote}>{texto}</p>
      <div className={styles.autor}>
        <div className={styles.avatar}>{iniciales}</div>
        <div>
          <div className={styles.nombre}>{nombre} · {año}</div>
          <div className={styles.uni}>{universidad}</div>
        </div>
      </div>
    </div>
  )
}

export default function SeccionTestimonios() {
  return (
    <section id="testimonios" className="contenedor-seccion">
      <div className="etiqueta-seccion">Testimonios</div>
      <h2 className="titulo-seccion">Lo que dicen nuestros alumnos</h2>
      <div className={styles.grid}>
        {TESTIMONIOS.map((t, i) => (
          <TarjetaTestimonio key={t.nombre} {...t} retraso={i * 130} />
        ))}
      </div>
    </section>
  )
}
