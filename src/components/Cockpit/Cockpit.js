import React, { useEffect, useRef, useContext } from 'react';
import classes from './Cockpit.css';
import AuthContext from '../../context/auth-context';

const cockpit = (props) => {
	const toggleBtnRef = useRef();
	const authContext = useContext(AuthContext);

	console.log(authContext.authenticated);

	useEffect(() => {
		console.log('[Cockpit.js] useEffect....');
		// setTimeout(() => {
		// 	alert('Saved data to cloud');
		// }, 1000);
		toggleBtnRef.current.click();

		return () => {
			console.log('[Cockpit.js cleanup]');
		};
	}, []);
	useEffect(() => {
		console.log('[Cockpit.js] useEffect.... 2nd');
		return () => {
			console.log('[Cockpit.js cleanup 2nd]');
		};
	});

	const assignedClasses = [];
	let btnClass = '';
	if (props.showPersons) {
		btnClass = classes.red;
	}
	if (props.personsLength <= 2) {
		assignedClasses.push(classes.red);
	}
	if (props.personsLength <= 1) {
		assignedClasses.push(classes.bold);
	}
	return (
		<div className={classes.Cockpit}>
			<h1>{props.title}</h1>
			<p className={assignedClasses.join(' ')}>This is really working!</p>
			<button ref={toggleBtnRef} className={btnClass} onClick={props.clicked}>
				{props.showPersons ? 'Hide Persons' : 'Show Persons'}
			</button>
			{<button onClick={authContext.login}>Log in</button>}
		</div>
	);
};

export default React.memo(cockpit);
