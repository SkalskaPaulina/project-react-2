import React from 'react';
import {Button, InputGroup} from 'react-bootstrap';
import './EntryComponent.css';
import {Entry} from '../entity/Entry';

interface EntryComponentProps {
	readonly entry: Entry;
	readonly onEditClick: () => void;
	readonly onDeleteClick: () => void;
}

export function EntryComponent(props: EntryComponentProps): React.ReactElement {
	return <div className='row pt-4 pt-md-2 pt-xl-0'>
		<div className='col-12 col-md-6 col-xl-8 entry'>
			<span>{props.entry.name} - {props.entry.amount} zł</span>
		</div>
		<div className='col-12 col-md-6 col-xl-4'>
			<InputGroup>
				<Button
					variant='primary'
					onClick={props.onEditClick}
				>
					Edytuj
				</Button>
				<Button
					variant='danger'
					onClick={props.onDeleteClick}
				>
					Usuń
				</Button>
			</InputGroup>
		</div>
	</div>
}
