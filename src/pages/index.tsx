import type {NextPage} from "next"
import Head from "next/head"
import styles from "@styles/Home.module.scss"
import Logo from "@assets/Logo.svg";
import Selector from "@components/Selector/selector";

const Home: NextPage = () => {
  return (
    <main className={styles.container}>
      <Head>
        <title>Discotils</title>
        <meta name="description" content="Discord Utilities" />
      </Head>
      <div className={styles.logo}>
        <Logo />
        <h1>Discotils</h1>
      </div>
      <h2>Various Discord Utilities</h2>
      <ul>
        <li>Easily interact with your bot from the visual interface</li>
        <li>Various utilities, that would help managing your server</li>
      </ul>
      <Selector />
    </main>
  )
}

export default Home
