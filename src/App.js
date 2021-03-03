import React, { useState, useEffect} from 'react';
import alanBtn from '@alan-ai/alan-sdk-web';
import wordsToNumbers from 'words-to-numbers';

import useStyles from './styles.js';
import NewsCards from './components/NewsCards/NewsCards';

const alanKey = 'e5ca2990413256f88b81f1e8ce9f7d982e956eca572e1d8b807a3e2338fdd0dc/stage'

const App = () => {
    const [newsArticles, setNewsArticles] = useState([]);
    const [activeArticle, setActiveArticle] = useState(-1);
    const classes = useStyles();

    useEffect(() => {
        alanBtn({
            key: alanKey,
            onCommand: ({ command, articles, number }) => {
                if(command === 'newHeadlines') {
                    setNewsArticles(articles);
                    setActiveArticle(-1);
                } else if(command === 'highlight') {
                    setActiveArticle((prevActiveArticle) => prevActiveArticle + 1);
                } else if(command === 'open') {
                  const parsedNumber = number.length > 2 ? wordsToNumbers(number, { fuzzy: true }) : number;
                  const article = articles[parsedNumber - 1];

                  if(parsedNumber > 20) {
                        alanBtn().playText('Please try that again...')
                    } else if(article) {
                        window.open(article.url, '_blank');
                    } else {
                      alanBtn().playText('Opening...');
                    }
                  
                }
            },
        })
    }, [])
    return (
        <div className={classes.logoContainer}>
           <img src="https://www.voicesummit.ai/hs-fs/hubfs/alan-logo-vertical-color.png?width=480&height=480&name=alan-logo-vertical-color.png"className={classes.alanLogo} alt="alan logo" />
            <NewsCards articles={newsArticles} activeArticle={activeArticle} />
        </div>
    )
}

export default App;