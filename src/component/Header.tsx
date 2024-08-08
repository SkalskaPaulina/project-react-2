import React from 'react';
import './Header.css';
import logo from '../logo.png';

interface HeaderProps {
	readonly balance: number;
}

export function Header(props: HeaderProps): React.ReactElement {
	function getBalanceText(): string {
		if (props.balance > 0) {
			return `Możesz jeszcze wydać ${props.balance.toFixed(2)} złotych.`;
		} else if (props.balance === 0) {
			return 'Bilans wynosi zero.';
		} else {
			return `Bilans jest ujemny. Jesteś na minusie ${Math.abs(props.balance).toFixed(2)} złotych.`;
		}
	}

	return <header>
		<div className='logo'>
			<img
				className='logo-img'
				src={logo}
				alt='logo'/>
		</div>
		<div className='balance-message'>
			<span>{getBalanceText()}</span>
		</div>
	</header>;
}
