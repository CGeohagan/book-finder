import React from 'react';
import styled from 'styled-components';

const googleAPIEndpoint = `https://www.googleapis.com/books/v1/volumes?q=`;
const googleAPIKey = `AIzaSyBXxemY2FjRuqsq9Ey5LcDfVsK5nwt6W0g`;

const StyledForm = styled.form`
  margin: 0 auto;
`;

const StyledInput = styled.input`
  background-color: var(--eggshell);
  border-radius: 4px;
  border: 2px solid var(--terracotta);
  min-width: 250px;
  padding: 1em;

  &:focus {
    border-color: var(--dark-green);
    outline: none;
  }
`;

const StyledFieldset = styled.fieldset`
  border: none;
  margin: 2em auto;
  display: flex;
  justify-content: center;

  .radio-wrapper {
    padding: 1em;
  }

  label {
    text-transform: uppercase;
  }
`;

function BookSearch({ setResults, setStatus }) {
  const [searchValue, setSearchValue] = React.useState('');
  const [searchType, setSearchType] = React.useState('inauthor');

  // https://www.googleapis.com/books/v1/volumes?q=subject:fantasy+romance+inauthor:keyes&key=AIzaSyBXxemY2FjRuqsq9Ey5LcDfVsK5nwt6W0g

  // maxResults=10
  // startIndex

  async function handleSubmit(event) {
    event.preventDefault();
    setStatus('loading');

    try {
      const joinedSearchValue = searchValue.split(' ').join('+');
      const endpointWithSearch = `${googleAPIEndpoint}${searchType}:${joinedSearchValue}&key=${googleAPIKey}`;
      const response = await fetch(endpointWithSearch);
      const json = await response.json();

      // are there results we get back that show it didn't work?
      setStatus('success');

      if (json.items.length === 0) return;
      const filteredResults = json.items.filter((item) => {
        return typeof item?.volumeInfo?.imageLinks === 'object';
      });
      console.log('hi colleen response', filteredResults);
      setResults(filteredResults);
    } catch (e) {
      setStatus('error');
    }
  }

  return (
    <>
      <StyledForm onSubmit={handleSubmit}>
        <StyledInput
          id='search-input'
          value={searchValue}
          onChange={(event) => setSearchValue(event.target.value)}
        />
        <StyledFieldset>
          <legend className='serif-italic'>Search by:</legend>
          <div class='radio-wrapper'>
            <input
              type='radio'
              name='author-or-subject'
              id='author-type'
              value='inauthor'
              checked={searchType === 'inauthor'}
              onChange={(event) => {
                setSearchType(event.target.value);
              }}
            />
            <label htmlFor='author-type'>Author</label>
          </div>
          <div class='radio-wrapper'>
            <input
              type='radio'
              name='author-or-subject'
              id='subject-type'
              value='subject'
              checked={searchType === 'subject'}
              onChange={(event) => {
                setSearchType(event.target.value);
              }}
            />
            <label htmlFor='subject-type'>Subject</label>
          </div>
        </StyledFieldset>
      </StyledForm>
    </>
  );
}

export default BookSearch;
