'use client'
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { Bot } from 'lucide-react'
import styles from './BotPortada.module.css'

const MENSAJES = [
  '¡Hola! ¿Te inscribes? ',
  'Matricúlate hoy ',
  '¡Clases cada sábado!',
  '¿Listo para la UNI? ',
  '¡Te esperamos! ',
  '¡Crea una cuenta es gratis!!! 😊',

  '¿Tienes dudas? Escríbenos',
  'Preuniversitario intensivo',
  '¡Ingresa a Matrix! ',
  'Vacantes limitadas ⚡',
  '¿Empezamos juntos? ',
  '¡Próximo ciclo: 23 mayo!',
  'Primaria · Secundaria · Pre-U',
]

export default function BotPortada() {
  const [mensaje,  setMensaje]  = useState('¡Bienvenido a Matrix! 👋')
  const [visible,  setVisible]  = useState(false)
  const [burbuja,  setBurbuja]  = useState(false)
  const idxRef = useRef(0)
  const timer  = useRef(null)

  useEffect(() => {
    function pausa() { return 12_000 + Math.random() * 6_000 }

    function ocultar() {
      setBurbuja(false)
      timer.current = setTimeout(mostrar, pausa())
    }
    function mostrar() {
      idxRef.current = (idxRef.current + 1) % MENSAJES.length
      setMensaje(MENSAJES[idxRef.current])
      setBurbuja(true)
      timer.current = setTimeout(ocultar, 5_000)
    }

    // saludo inicial
    timer.current = setTimeout(() => {
      setVisible(true)
      setBurbuja(true)
      timer.current = setTimeout(ocultar, 3_000)
    }, 1_200)

    return () => { if (timer.current) clearTimeout(timer.current) }
  }, [])

  if (!visible) return null

  return (
    <Link href="/registro" className={styles.widget} title="Inscríbete en Matrix">
      <div className={`${styles.burbuja} ${burbuja ? '' : styles.burbujaOculta}`}>
        {mensaje}
      </div>
      <div className={styles.circulo}>
        <Bot size={26} />
      </div>
    </Link>
  )
}
