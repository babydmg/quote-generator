import { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './styles/App.module.css';

const App = () => {
  const [newQuote, setNewQuote] = useState<{
    name?: string;
    quote?: string;
  } | null>();
  const [quoteOfTheDay, setQuoteOfTheDay] = useState<{
    name?: string;
    quote?: string;
  }>();

  useEffect(() => {
    const options = {
      method: 'POST',
      url: 'https://quotel-quotes.p.rapidapi.com/quotes/qod',
      headers: {
        'content-type': 'application/json',
        'X-RapidAPI-Key': '01badbd639msh49fdb1f0b0172c7p124438jsna6c5428d7c00',
        'X-RapidAPI-Host': 'quotel-quotes.p.rapidapi.com',
      },
      data: {},
    };

    axios
      .request(options)
      .then(async (res) => {
        const data = await res.data;
        setQuoteOfTheDay(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const generateNewQuote = () => {
    const options = {
      method: 'POST',
      url: 'https://quotel-quotes.p.rapidapi.com/quotes/random',
      headers: {
        'content-type': 'application/json',
        'X-RapidAPI-Key': '01badbd639msh49fdb1f0b0172c7p124438jsna6c5428d7c00',
        'X-RapidAPI-Host': 'quotel-quotes.p.rapidapi.com',
      },
      data: {},
    };

    axios
      .request(options)
      .then(async (res) => {
        const data = await res.data;
        setNewQuote(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const closeGeneratedQuote = () => {
    setNewQuote(null);
  };

  return (
    <div className={styles.container}>
      <div className={styles.mainContainer}>
        <h1>Sanatic Quotes</h1>

        <p
          style={{
            marginTop: '0.5rem',
            fontSize: '1.3rem',
          }}>
          Unleash the Power of Words, Inspire the Extraordinary
        </p>

        <div className={styles.quoteOfTheDay}>
          <h3>Quote of the Day</h3>
          <p style={{ width: '50%' }}>
            "{quoteOfTheDay?.quote}" - {quoteOfTheDay?.name}
          </p>
        </div>

        <div className={styles.generateNewQuoteContainer}>
          <button className={styles.newQuoteBtn} onClick={generateNewQuote}>
            Generate New Quote
          </button>

          {newQuote == null ? (
            ''
          ) : (
            <>
              <div className={styles.newQuoteContainer}>
                <p>
                  "{newQuote?.quote}" - {newQuote?.name}
                </p>
              </div>
              <div>
                <button
                  onClick={closeGeneratedQuote}
                  className={styles.closeBtn}>
                  X
                </button>
              </div>
            </>
          )}
        </div>

        <footer className={styles.footer}>
          <h3>
            Quote Generator 3202 <br />
            All rights reserved &copy;
          </h3>
        </footer>
      </div>
    </div>
  );
};

export default App;
