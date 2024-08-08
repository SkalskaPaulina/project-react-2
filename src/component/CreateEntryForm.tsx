import React from 'react';
import {Button, FloatingLabel, Form, InputGroup} from 'react-bootstrap';
import {Entry} from '../entity/Entry';

interface CreateEntryFormProps {
	readonly onSubmit: (entry: Entry) => void;
}

export function CreateEntryForm(props: CreateEntryFormProps): React.ReactElement {
	const [entry, setEntry] = React.useState<Entry>({
		name: '',
		amount: 0
	});
	const [nameError, setNameError] = React.useState<boolean>(false);
	const [amountError, setAmountError] = React.useState<boolean>(false);

	function handleNameChange(e: React.ChangeEvent<HTMLInputElement>): void {
		setNameError(false);
		setEntry({
			...entry,
			name: e.target.value
		});
	}

	function handleAmountChange(e: React.ChangeEvent<HTMLInputElement>): void {
		setAmountError(false);
		setEntry({
			...entry,
			amount: +e.target.value
		});
	}

	function handleClick(): void {
		if (!entry.name) {
			setNameError(true);
		}
		if (entry.amount <= 0) {
			setAmountError(true);
		}
		if (entry.name && entry.amount) {
			props.onSubmit(entry);
			setEntry({
				name: '',
				amount: 0,
			})
		}
	}

	return <InputGroup className='mb-5'>
		<FloatingLabel
			label='Nazwa'
			className='col-7'
		>
			<Form.Control
				value={entry.name}
				onChange={handleNameChange}
				type='text'
				placeholder='Nazwa'
				isInvalid={nameError}
			/>
			<Form.Control.Feedback
				className='feedback'
				type='invalid'
			>
				Nazwa nie może być pusta.
			</Form.Control.Feedback>
		</FloatingLabel>
		<FloatingLabel
			label='Nazwa'
			className='col-2'
		>
			<Form.Control
				value={entry.amount}
				onChange={handleAmountChange}
				type='number'
				placeholder='Kwota'
				className={`form-control ${amountError ? 'is-invalid' : ''}`}
				step='0.01'
				isInvalid={amountError}
			/>
			<Form.Control.Feedback
				className='feedback'
				type='invalid'
			>
				Kwota musi być dodatnia i niepusta.
			</Form.Control.Feedback>
		</FloatingLabel>
		<Button
			variant='success'
			onClick={handleClick}
		>
			Dodaj
		</Button>
	</InputGroup>;
}
