import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { FormGroup, FormControl, Button } from 'react-bootstrap';

let SearchForm = props => {
  const { handleSubmit } = props;
  // console.log(handleSubmit);

  const searchField = (field) => (
    <FormGroup controlId='keyword'>
        <FormControl {...field.input} name='keyword' placeholder='Search ...' />
    </FormGroup>
)

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="keyword">SEARCH COUNTRY</label>
        <Field name="keyword" component={searchField} type="text" />
      </div>
      <Button type="submit">Search Country</Button>
    </form>
  )
}

SearchForm = reduxForm({
  // a unique name for the form
  form: 'search'
})(SearchForm)

export default SearchForm