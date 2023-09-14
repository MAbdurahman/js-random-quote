$(function () {
    console.log('The DOM is ready to be used.');

    //**************** variables ****************//
    const quote_container = document.getElementById('quote-container');
    const quote_text = document.getElementById('quote');
    const quote_author = document.getElementById('author');
    const button_twitter = document.getElementById('twitter-button');
    const button_quote = document.getElementById('new-quote');

    let api_quotes = [];


    /**
     * @description -
     * @returns {Promise<void>}
     */
    async function getQuotes() {
        const api_url = `https://mabdurahman.github.io/quotes-api/data/quotes.json`;
        try {
            const response = await fetch(api_url);
            api_quotes = await response.json();
            getNewQuote();

        } catch (e) {
            swal({
                title: "ERROR!",
                text: `${e.message}`,
                icon: "error",
            });
        }
    }

    /**
     * @description -
     */
    function getNewQuote() {
        // Pick a random quote from array
        const index = Math.floor(Math.random() * api_quotes.length);
        const quote = api_quotes[index];

        // Check if Author field is blank and replace it with 'Unknown'
        if (!quote.author) {
            quote_author.textContent = 'Unknown';
        } else {
            quote_author.textContent = quote.author;
        }
        // Check Quote length to determine styling
        if (quote.text.length > 120) {
            quote_text.classList.add('long-quote');
        } else {
            quote_text.classList.remove('long-quote');
        }
        // Set Quote and Hide Loader
        quote_text.textContent = quote.text;

    }

    /**
     * @description -
     */
    function getTwitterQuote() {
        const twitter_url = `https://twitter.com/intent/tweet?text=${quote_text.innerText} - ${quote_author.innerText}`;
        window.open(twitter_url, '_blank');
    }


    button_quote.addEventListener('click', getNewQuote);
    button_twitter.addEventListener('click', getTwitterQuote);

    getQuotes();


});