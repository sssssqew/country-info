import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import * as countryActions from '~/actions/countryActions';
import Country from '~/components/Country';
import { Table, Button, Alert } from 'react-bootstrap';
import ContactForm from '~/components/ContactForm';

class CountryItems extends Component {
	submit(values){
    // print the form values to the console
    console.log(values)
  }

	handleRemove(id){
		this.props.actions.deleteCountry(id);
	}

	showMore(){
		this.props.actions.getCountry();
	}

	componentDidMount(){
		this.props.actions.getCountry();

	}

	render(){
		let countryList = null;
		const headers = ['#', 'Code', 'Name', 'Capital', 'Phone', 'Remove'];
		const { countries, isDeleted, error, isLoading } = this.props;

		const headersTags = headers.map( (header, i) => (<th key={i}>{header}</th>));

		if(countries){
	      countryList = countries.map( (country, i) => (
	      	<Country 
		      	key={country.id} 
		      	id={country.id} 
		      	index={i+1}
		      	country={country}
		      	onRemove={() => this.handleRemove(country.id)}/>
	      ))
	    }

	    console.log(isDeleted);

		return (
			<div>
				{isDeleted ? 
						<Alert variant='success'>
					      하하
					    </Alert>
					 : null}
				{/*<Button onClick={() => this.showMore()}>Show More</Button>*/}
				<ContactForm onSubmit={this.submit} />
				{/*<Button onClick={() => this.handleAdd()}>Add Country</Button>*/}
				{error && <h3>Error: {error && error.response && error.response.data ? error.response.data : null}</h3>}
				{isLoading ? <h1>Loading ...</h1>: (
				   <Table striped bordered hover 
				   				responsive style={{marginTop: '2rem'}}>
		                <thead>
		                  <tr>
		                    {headersTags}
		                  </tr>
		                </thead>
		                <tbody>
		                  {countryList}
		                 </tbody>
		          </Table>
				)}
			</div>
		)

	}
}

CountryItems.propTypes = {
  actions: PropTypes.object.isRequired,
  countries: PropTypes.array,
  error: PropTypes.object,
};


const mapStateToProps = state => ({
  countries: state.country.countries,
  isDeleted: state.country.isDeleted,
  error: state.country.error,
  isLoading: state.country.isLoading,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(countryActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(CountryItems);