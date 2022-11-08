const resultsDiv = document.querySelector('#results');
document.addEventListener('DOMContentLoaded', () => {
  const apiSearchForm = document.querySelector('#api-Search');
  console.log(API_KEY);
  
  apiSearchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const query = encodeURI(e.target.search.value);
    console.log(query);

    // fetch(`https://www.googleapis.com/books/v1/volumes?q=${encodeURI(query)}&key=${API_KEY}`)
    //   .then(res =>res.json())
    //   .then(data => {
    //     console.log(data);
    //     // debugger;
    //     resultsDiv.innerHTML = "";
    //     data.items.forEach(item => {
    //       const div = document.createElement('div');
    //       div.style = 'border-bottom: 1px solid gray; margin-bottom: 1em; padding: 1em;'

    //       const img = document.createElement('img');
    //       img.src = item.volumeInfo.imageLinks?.thumbnail;

    //       const h2 = document.createElement('h2');
    //       h2.textContent = item.volumeInfo.title;

    //       const blurb = document.createElement('div');
    //       const blurbText = item.volumeInfo.description || item?.searchInfo?.textSnippet || "No description available";
    //       blurb.innerHTML = blurbText;

    //       div.append(h2, img, blurb);
    //       resultsDiv.appendChild(div);
    //     })
    //   });

    getJSON(`https://api.tvmaze.com/singlesearch/shows?q=${query}&embed=episodes`)
      .then(data => {
        console.log(data._embedded.episodes);
        console.log(data._embedded.episodes[0]);
        data._embedded.episodes.forEach(episode => {
          const div = document.createElement('div');
          div.style = 'border-bottom: 1px solid gray; margin-bottom: 1em;'
          
          const img = document.createElement('img');
          img.src = episode.image?.medium;
          
          const h2 = document.createElement('h2');
          h2.textContent = `S${episode.season}E${episode.number}: ${episode.name}`;
          
          const summaryDiv = document.createElement('div');
          summaryDiv.innerHTML = episode.summary;

          div.append(img, h2, summaryDiv);

          resultsDiv.append(div);
        })
      })
  })
})