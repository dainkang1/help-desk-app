'use client'

import styles from './page.module.css'
import FormComponent from '../pages/components/FormComponent'

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <div className={styles.Ticket}>
          <h1>Help Desk - Create Ticket</h1>
          <FormComponent />
        </div>
      </div>
    </main>
  )
}
