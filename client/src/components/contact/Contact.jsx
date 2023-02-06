import React from 'react'
import './container.css';

const Contact = () => {
	return (
		<div className='contactContainer' style={{ textAlign: 'center', margin: '50px', marginTop: '150px' }}>
			<h1>Contact Me :- </h1>
			<form action="mailto:dubeyawnish6@gmail.com">
				<button type='submit'>E-mail</button>
			</form>
			<div className='iconContainer'>
				<a href='https://github.com/' target='_blank' rel='noopener noreferrer'>
					<i className="icon-github"></i> 
				</a>
				<a href='https://twitter.com/AwnishDubey2' target='_blank' rel='noopener noreferrer'>
					<i className="icon-twitter"></i>
				</a>
				<a href='https://www.linkedin.com/in/dubeyawnish6/' target='_blank' rel='noopener noreferrer'>
					<i className="icon-linkedin"></i> 
				</a>
				<a href='https://www.facebook.com/awnish.dubey.58' target='_blank' rel='noopener noreferrer'>
					<i className="icon-facebook"></i>
				</a>
				<a href='https://www.instagram.com/_dubey_aw/' target='_blank' rel='noopener noreferrer'>
					<i className="icon-instagram"></i>
				</a>
			</div>
		</div>
	);
}

export default Contact