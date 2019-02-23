import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { FormGroup, FormControl, Button } from 'react-bootstrap';

let ContactForm = props => {
  const { handleSubmit } = props;
  // console.log(handleSubmit);

  const codeField = (field) => (
    <FormGroup controlId='code'>
        <FormControl {...field.input} name='code' placeholder='CODE' />
    </FormGroup>
)

  const NameField = (field) => (
    <FormGroup controlId='name'>
        <FormControl {...field.input} name='name' placeholder='NAME' />
    </FormGroup>
)

  const capitalField = (field) => (
    <FormGroup controlId='capital'>
        <FormControl {...field.input} name='capital' placeholder='CAPITAL' />
    </FormGroup>
)

  const phoneField = (field) => (
    <FormGroup controlId='phone'>
        <FormControl {...field.input} name='phone' placeholder='PHONE' />
    </FormGroup>
)


  return (
    <form onSubmit={handleSubmit} style={{width:'50%'}}>
      <div>
        <label htmlFor="code">CODE</label>
        <Field name="code" component={codeField} type="text" />
      </div>
      <div>
        <label htmlFor="name">NAME</label>
        <Field name="name" component={NameField} type="text" />
      </div>
      <div>
        <label htmlFor="capital">CAPITAL</label>
        <Field name="capital" component={capitalField} type="text" />
      </div>
      <div>
        <label htmlFor="phone">PHONE</label>
        <Field name="phone" component={phoneField} type="text" />
      </div>
      <Button type="submit">Add Country</Button>
    </form>
  )
}

ContactForm = reduxForm({
  // a unique name for the form
  form: 'contact'
})(ContactForm)

export default ContactForm