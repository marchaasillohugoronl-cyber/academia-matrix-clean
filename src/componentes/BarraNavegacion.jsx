'use client'
import { useState, useEffect } from 'react'
import Link           from 'next/link'
import { usePathname } from 'next/navigation'
import styles from './BarraNavegacion.module.css'

export default function BarraNavegacion({ sitio }) {
  const [desplazado, setDesplazado] = useState(false)
  const pathname = usePathname()
  const esInicio = pathname === '/'
  const ocultar  = pathname.startsWith('/admin') || pathname === '/login' || pathname.startsWith('/portal')

  useEffect(() => {
    const manejador = () => setDesplazado(window.scrollY > 30)
    window.addEventListener('scroll', manejador)
    return () => window.removeEventListener('scroll', manejador)
  }, [])

  if (ocultar) return null

  return (
    <nav className={`${styles.nav} ${desplazado ? styles.scrolled : ''}`}>
      <Link href="/" className={styles.logo}>
        <img src="/logof.png" alt="MATRIX logo" className={styles.logoImg} />
        <span className={styles.logoText}>MATRIX</span>
      </Link>

      <div className={styles.navRight}>
        <Link href="/ciclos" className={`${styles.navLink} ${pathname === '/ciclos' ? styles.navLinkActive : ''}`}>
          Ciclos
        </Link>
        <a
          href="https://academia-matrix-sistema.vercel.app/preinscripcion"
          className={styles.cta}
          target="_blank"
          rel="noopener noreferrer"
        >
          Registro
        </a>
      </div>
    </nav>
  )
}
