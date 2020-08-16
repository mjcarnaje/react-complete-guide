import React, { Component } from 'react';

import classes from './App.css';

import Persons from '../components/Persons/Persons';
import Cockpit from '../components/Cockpit/Cockpit';
import Aux from '../hoc/Auxiliary';
import withClass from '../hoc/withClass';
import AuthContext from '../context/auth-context';

class App extends Component {
	constructor(props) {
		super(props);
		console.log('[App.js] constructor');
	}
	state = {
		persons: [
			{ id: '0001', name: 'Nayeon', age: 28 },
			{ id: '0002', name: 'Dahyun', age: 17 },
			{ id: '0003', name: 'DOST', age: 16 },
		],
		otherState: 'some other value',
		showPersons: false,
		showCockpit: true,
		changeCounter: 0,
		authenticated: false,
	};
	static getDerivedStateFromProps(props, state) {
		console.log('[App.js] getDerivedStateFromProps', props);
		return state;
	}

	componentDidMount() {
		console.log('[App.js] componentDidMount');
	}

	shouldComponentUpdate(nextProps, nextState) {
		console.log('[App.js] shouldComponentUpdate');
		return true;
	}

	componentDidUpdate() {
		console.log('[App.js] componentDidUpdate');
		console.log('------------------------');
	}

	deletePersonHandler = (personIndex) => {
		const persons = [...this.state.persons];
		persons.splice(personIndex, 1);
		this.setState({ persons: persons });
	};
	nameChangedHandler = (event, id) => {
		const personIndex = this.state.persons.findIndex((p) => {
			return p.id === id;
		}); // [0] [2] [3]

		const person = { ...this.state.persons[personIndex] }; //this.state.persons[0 || 1 || 2]
		person.name = event.target.value; // copy

		const persons = [...this.state.persons]; //copy
		persons[personIndex] = person; // updated version of the spcific array

		this.setState((prevState, props) => {
			return {
				persons: persons,
				changeCounter: prevState.changeCounter + 1,
			};
		}); // and then set the state
	};
	togglePersonsHandler = () => {
		const doesShow = this.state.showPersons;
		this.setState({ showPersons: !doesShow });
	};
	loginHandler = () => {
		this.setState({ authenticated: true });
	};

	render() {
		console.log('[App.js] render');
		let persons = null;
		if (this.state.showPersons) {
			persons = (
				<Persons
					persons={this.state.persons}
					clicked={this.deletePersonHandler}
					changed={this.nameChangedHandler}
					isAuthenticated={this.state.authenticated}
				/>
			);
		}

		return (
			<Aux>
				<button
					onClick={() => {
						this.setState({ showCockpit: false });
					}}
				>
					Remove Cockpit
				</button>
				<AuthContext.Provider
					value={{
						authenticated: this.state.authenticated,
						login: this.loginHandler,
					}}
				>
					{this.state.showCockpit ? (
						<Cockpit
							title={this.props.appTitle}
							showPersons={this.state.showPersons}
							personsLength={this.state.persons.length}
							clicked={this.togglePersonsHandler}
						/>
					) : null}
					{persons}
				</AuthContext.Provider>
			</Aux>
		);
	}
}

export default withClass(App, classes.App);
