'use client'
import { useEffect, useRef, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import Link           from 'next/link'
import { Phone, Home, Lock } from 'lucide-react'
import styles from './PiePagina.module.css'

const LOGOS = [
  { src: '/universidad/Uni.png',         alt: 'UNI'        },
  { src: '/universidad/UNMSM.svg',       alt: 'UNMSM'      },
  { src: '/universidad/Escudo_UNSA.png', alt: 'UNSA'       },
  { src: '/universidad/Logo_UNAP.png',   alt: 'UNAP'       },
  { src: '/universidad/uni_juliaca.svg', alt: 'UNJ'        },
  { src: '/universidad/uman.svg',        alt: 'UMAN'       },
  { src: '/escuela/coar.png',            alt: 'COAR'       },
  { src: '/escuela/escuela.png',         alt: 'Escuela'    },
]

function LogosCiclicos() {
  const [idx,    setIdx]    = useState(0)
  const [visible, setVisible] = useState(true)
  const timer = useRef(null)

  useEffect(() => {
    function ciclar() {
      setVisible(false)
      timer.current = setTimeout(() => {
        setIdx(i => (i + 1) % LOGOS.length)
        setVisible(true)
      }, 400)
    }
    timer.current = setInterval(ciclar, 3000)
    return () => { clearInterval(timer.current); clearTimeout(timer.current) }
  }, [])

  const logo = LOGOS[idx]
  return (
    <div className={styles.logosBox}>
      <p className={styles.logosLabel}>EGRESADOS EN</p>
      <img
        key={idx}
        src={logo.src}
        alt={logo.alt}
        className={`${styles.logoImg} ${visible ? styles.logoVisible : styles.logoOculto}`}
      />
    </div>
  )
}

export default function PiePagina({ sitio }) {
  const navegar  = useRouter()
  const pathname = usePathname()

  if (pathname.startsWith('/admin') || pathname === '/login' || pathname.startsWith('/portal')) return null

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.brand}>
          <div className={styles.logo}>{sitio?.nombreCorto ?? 'MATRIX'}</div>
          <p className={styles.tagline}>Academia de Matemáticas</p>
        </div>

        <div className={styles.info}>
          <p className={styles.address}>{sitio?.ubicacion ?? ''}</p>
          <a href={`tel:${sitio?.telefono ?? ''}`} className={styles.phone}>
            <Phone size={16} />
            <span>{sitio?.telefono ?? ''}</span>
          </a>
        </div>

        <LogosCiclicos />

        <div className={styles.actions}>
          <button
            type="button"
            className={styles.footerHomeBtn}
            onClick={() => {
              navegar.push('/')
              setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 0)
            }}
          >
            <Home size={16} />
            <span>Volver Inicio</span>
          </button>
        </div>
      </div>

      <div className={styles.bottom}>
        <span>© {new Date().getFullYear()} {sitio?.nombreCorto ?? 'MATRIX'} · Todos los derechos reservados</span>

        <Link href="/login" className={styles.adminLink}>
          <Lock size={12} />
          <span>Admin</span>
        </Link>
      </div>
    </footer>
  )
}
