import { useState, useEffect } from "react"
import Head from "next/head";
import { useMoralis, useNFTBalances } from "react-moralis";
import styles from '../styles/Home.module.css';

export default function Home() {
  const { authenticate, isAuthenticated, logout, user } = useMoralis()
  const { getNFTBalances, data, error } = useNFTBalances()
  const [searchedArray, setSearchedArray] = useState(data)
  const [searchString, setSearchStrnig] = useState("")

  useEffect(() => {
    if (searchString.length === 0) {
      setSearchedArray(data)
    } else {
      const results = []
      if (data) {
        data.result.map((item, index) => {
          Object.values(item).every((onlyValues, valIndex) => {
            if (onlyValues.toLowerCase().includes(searchString.toLowerCase())) {
              results.push(item)
              return
            }
          })
        })
      }
      setSearchedArray(results)
    }
  }, [searchString])

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {isAuthenticated ? (
        <div>
          <button onClick={logout}>Logout</button>
          <h2>Your wallet address is {user.get("ethAddress")}</h2>
          <div>
            {error && <>{JSON.stringify(error)}</>}
            <button onClick={() => getNFTBalances({ params: { chain: "ropsten" } })}>Refetch NFTBalances</button>
            {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
          </div>
          <input 
            className={styles.input} 
            type="text"
            placeholder="Search Token address..." 
            value={searchString} 
            onChange={(e) => setSearchStrnig(e.target.value)}
          />
          {
            data ? (
              <div>
                {
                  searchedArray ? (
                    <div>
                      {
                        searchedArray.length ? (
                          <div>
                            <p>Search Result: {searchedArray.length}</p>
                            {
                              searchedArray.map(item => (
                                <div className={styles.box} key={item}>
                                  <p>Token_address: {item.token_address}</p>
                                  <p>Token_id: {item.token_id}</p>
                                </div>
                              ))
                            }
                          </div>
                        ) : (
                          <div>No Search Result</div>
                        )
                      }
                    </div>
                  ) : (
                    <></>
                  )
                }
              </div>
            ) : (
              <div>
                <p>There is no token in this account.</p>
              </div>
            )
          }
        </div>
      ) : (
        <button
          onClick={() => {
            authenticate({ provider: "metamask" });
          }}
        >
          Sign in with MetaMask
        </button>
      )}
    </div>
  );
}