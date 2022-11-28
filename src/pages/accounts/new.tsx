import {NextPage} from "next";
import styles from "@styles/AccountsNew.module.scss";
import Head from "next/head";
import AccountList from "@components/AccountList/accountList";
import {MutableRefObject, useEffect, useRef, useState} from "react";
import {useRouter} from "next/router";
import AccountManager from "@utils/accountManager";
import Close from "@assets/Close.svg";

const tokenRegex = /^(Bot\s)?(?<token>[\w-]{24}\.[\w-]{6}\.[\w-]{27})/i;

const add = async (_token: string) => {
  if (!_token) return "Please enter a token";
  const match = tokenRegex.exec(_token);
  if (!match) return "This doesn't look like a valid token";
  const token = match.groups?.token;
  if (!token) return "Unknown error";
  try {
    const res = await AccountManager.add(token, "bot");
    return res?.failed ? "Invalid token" : "added";
  } catch (e) {
    console.error(e);
  }
  return "Looks like there's a connection issue, please check your access to the internet and try again";
}

const addBearer = async (id: string, secret: string) => {
  if (!id || !secret) return "Please enter both the ID and the secret";
  try {
    const res = await AccountManager.addBearer(id, secret);
    return res?.failed ? "Invalid credentials" : "added";
  } catch (e) {
    console.error(e);
  }
  return "Looks like there's a connection issue, please check your access to the internet and try again";
}

const NewAccount: NextPage = () => {
  const [isListOpen, setListOpen] = useState(false);
  const router = useRouter();
  const id = router.asPath.split("#")[1];
  const tokenInput = useRef() as MutableRefObject<HTMLInputElement>;
  const idInput = useRef() as MutableRefObject<HTMLInputElement>;
  const secretInput = useRef() as MutableRefObject<HTMLInputElement>;
  const [status, setStatus] = useState({message: "", nonce: 0});
  useEffect(() => {
    if (!id) return;
    idInput.current!.value = id;
  }, [id])
  return (
    <main className={styles.container}>
      <Head>
        <title>Accounts - Discotils</title>
        <meta name="description" content="Discord Utilities" />
      </Head>
      {status.message && (
        <div className={styles.toast} key={status.nonce}>
          <span>{status.message}</span>
          <button
            onClick={() => setStatus({message: "", nonce: 0})}
          >
            <Close />
          </button>
        </div>
      )}
      <h3>New bot token</h3>
      <div className={styles.botInput}>
        <input
          type="password"
          placeholder="token"
          ref={tokenInput}
        />
        <button
          onClick={() => {
            const token = tokenInput.current!.value;
            add(token).then(r => {
              if (r === "added") {
                router.push("/accounts");
              } else {
                setStatus({message: r, nonce: status.nonce + 1});
              }
            })
          }}
        >
          Add
        </button>
      </div>
      <div className={styles.divider}>
        <span>or</span>
      </div>
      <h3>Generate a bearer token</h3>
      <div className={styles.bearerInput}>
        <input
          type="text"
          placeholder="client id"
          onFocus={() => setListOpen(true)}
          onBlur={() => setTimeout(() => setListOpen(false), 200)}
          ref={idInput}
        />
        {isListOpen ? (
          <div className={styles.list}>
            <AccountList to="/accounts/new#{}" preventTab />
          </div>
        ) : null}
        <input
          type="password"
          placeholder="client secret"
          ref={secretInput}
        />
        <button
          onClick={() => {
            const id = idInput.current!.value;
            const secret = secretInput.current!.value;
            addBearer(id, secret).then(r => {
              if (r === "added") {
                router.push("/accounts");
              } else {
                setStatus({message: r, nonce: status.nonce + 1});
              }
            })
          }}
        >
          Generate
        </button>
      </div>
    </main>
  )
}

export default NewAccount
