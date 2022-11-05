import {useEffect, useState} from "react";
import styles from "@styles/Lookup.module.scss";

enum Type {
  Default,
  User,
  Server
}

const Lookup = () => {
  const [id, setId] = useState("");
  const [type, setType] = useState(Type.Default);
  useEffect(() => {
    if (!/\d{17,20}/.test(id)) return;
  }, [id, type]);
  return (
    <main className={styles.container}>
      <h1>Lookup</h1>
      <p>Enter the ID of the user, server or channel to get information about it</p>
      <div className={styles.input}>
        <input
          type="text"
          placeholder="ID"
          value={id}
          onChange={(e) => setId(e.target.value)}
        />
        <select
          value={type}
          onChange={(e) => setType(Number(e.target.value))}
        >
          <option value={Type.Default}>Default</option>
          <option value={Type.User}>User</option>
          <option value={Type.Server}>Server</option>
        </select>
      </div>
      <div className={styles.results}>
        test
      </div>
    </main>
  );
}

export default Lookup
