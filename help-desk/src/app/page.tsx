'use client'

import styles from './page.module.css'
import FormComponent from '../pages/components/FormComponent'
import Link from 'next/link'

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <div className={styles.Ticket}>
          <h1>Help Desk - Create Ticket</h1>
          <FormComponent />
        </div>
      </div>
      <div className={styles.adminLink}>
        <h1>
          <Link href="/admin/admin">
            Go to the Admin Page
          </Link>
        </h1>
      </div>
    </main>
  )
}
