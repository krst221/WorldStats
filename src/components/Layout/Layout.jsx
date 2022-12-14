/* eslint-disable @next/next/no-img-element */
import React, { useState } from 'react'
import Head from 'next/head'
import styles from './Layout.module.css'
import Link from 'next/link'
import Brightness6Rounded from '@mui/icons-material/Brightness6Rounded'
import Language from '@mui/icons-material/Language'
import { useTranslation } from "react-i18next";

export default function Layout({ children, title="World Stats" }) {

  const [theme, setTheme] = useState('light');

  const [t, i18n] = useTranslation('global');

  const switchTheme = () => {
    if (theme === 'light') {
      setTheme('dark');
      document.documentElement.setAttribute('data-theme', 'dark');
    }
    else {
      setTheme('light');
      document.documentElement.setAttribute('data-theme', 'light');
    }
  }

  const switchLanguage = () => {
    if (i18n.language === 'es') i18n.changeLanguage('en');
    else i18n.changeLanguage('es'); 
    console.log(i18n.language);
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>{title}</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/logo.png" />
      </Head>

      <header className={styles.header}>
        <button className={styles.themeSwitcher} onClick={switchLanguage}><Language /></button>
        <Link passHref href='/'>
          <img src='/logo.png' alt='World Stats logo' width='150px' />
        </Link>
        <button className={styles.themeSwitcher} onClick={switchTheme}><Brightness6Rounded /></button>
      </header>

      <main className={styles.main}>{children}</main>

      <footer className={styles.footer}>Christopher Lozano - 2022</footer>
    </div>
  )
}
