import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import * as countryActions from '~/actions/countryActions';
import * as searchActions from '~/actions/searchActions';
import * as sortActions from '~/actions/sortActions';
import Country from '~/components/Country';
import { Table, Button, Alert } from 'react-bootstrap';
import AddForm from '~/components/AddForm';
import SearchForm from '~/components/SearchForm';


class CountryItems extends Component {
	handleSort(header){
		this.props.sortActions.sortCountry(header);
	}
	handleSerch(keyword){
		this.props.searchActions.searchCountry(keyword);
	}

	handleCreate(country){
        this.props.countryActions.createCountry(country);
  }

	handleRemove(id){
		console.log(this.props);
		this.props.countryActions.deleteCountry(id);
	}

	// showMore(){
	// 	this.props.countryActions.getCountry();
	// }

	componentDidMount(){
		this.props.countryActions.getCountry();

	}

	render(){
		let countryList = null;
		const headers = ['#', 'code', 'name', 'capital', 'phone', 'remove'];
		const { countries, isDeleted, sortState, error, isLoading } = this.props;

		const headersTags = headers.map( (header, i) => {
			let result = null;
			if(header === "#" || header === "remove" ){
				return (<th key={i}>{header}</th>);
			}else {
				return (<th key={i}><Button variant="dark" onClick={() => this.handleSort(header)}>{header}</Button></th>);	
			}
		});

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

	    console.log(sortState);

		return (
			<div>
				{isDeleted ? 
						<Alert variant='success'>
					      Delete Success !
					    </Alert>
					 : null}
				
				 <SearchForm onSubmit={this.handleSerch.bind( this )} /><br/>
				<AddForm onSubmit={this.handleCreate.bind( this )} />
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
  countryActions: PropTypes.object.isRequired,
  countries: PropTypes.array,
  error: PropTypes.object,
};


const mapStateToProps = state => ({
  countries: state.country.countries,
  isDeleted: state.country.isDeleted,
  sortState: state.country.sortState,
  error: state.country.error,
  isLoading: state.country.isLoading,
});

const mapDispatchToProps = dispatch => ({
  countryActions: bindActionCreators(countryActions, dispatch),
  searchActions: bindActionCreators(searchActions, dispatch),
  sortActions: bindActionCreators(sortActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(CountryItems);