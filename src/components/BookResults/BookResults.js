import React from 'react';

function BookResults({ results, status }) {
  /* Search Results - will we get multiple pages? If click on one of the
        items allow for it to pop up showing more details */
  return (
    <div className='results-wrapper'>
      {status === 'error' && <div>There was an error with your request</div>}

      {status === 'success' && <BookList results={results} />}
    </div>
  );
}

function BookList({ results }) {
  return (
    <div>
      <ul>
        {results.map((result) => {
          const authors = result.volumeInfo?.authors;
          const authorList = Array.isArray(authors) ? authors.join(', ') : '';
          const infoLink = result.volumeInfo?.infoLink || '';
          const title = result.volumeInfo?.title;
          const thumbnail = result.volumeInfo?.imageLinks?.thumbnail;

          return (
            <a href={infoLink} key={result.id} target='_blank' rel='noreferrer'>
              <div>
                <img src={thumbnail} alt={`thumbnail for ${title}`} />
              </div>
              <div>
                <p>Authors: {authorList}</p>
                <p>Title: {title}</p>
              </div>
            </a>
          );
        })}
      </ul>
    </div>
  );
}

export default BookResults;
