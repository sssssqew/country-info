import React from 'react';
import { Table, Button } from 'react-bootstrap';

const Country = ({ country, index, onRemove }) => (
    	<tr>
            <td>{index}</td>
            <td>{country.code}</td>
            <td>{country.name}</td>
            <td>{country.capital}</td>
            <td>{country.phone}</td>
            <td><Button variant="danger" onClick={onRemove}>delete</Button></td>
         </tr>
);


export default Country;