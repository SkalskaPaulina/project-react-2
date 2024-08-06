import React from 'react';
import {Entry} from '../entity/Entry';
import './Section.css';
import {Button, FloatingLabel, Form, InputGroup, Modal} from 'react-bootstrap';

interface SectionProps {
	readonly title: string;
	readonly entries: Entry[];
	readonly onAdd: (entry: Entry) => void;
	readonly onRemove: (entry: Entry) => void;
	readonly onEdit: (index: number, entry: Entry) => void;
}

export function Section(props: SectionProps): React.ReactElement {
	const [name, setName] = React.useState<string>('');
	const [amount, setAmount] = React.useState<number>(0);
	const [editName, setEditName] = React.useState<string>('');
	const [editAmount, setEditAmount] = React.useState<number>(0);
	const [nameError, setNameError] = React.useState<boolean>(false);
	const [amountError, setAmountError] = React.useState<boolean>(false);
	const [editNameError, setEditNameError] = React.useState<boolean>(false);
	const [editAmountError, setEditAmountError] = React.useState<boolean>(false);
	const [editedEntry, setEditedEntry] = React.useState<number | undefined>(undefined);

	function renderEntry(entry: Entry, index: number): React.ReactElement {
		return <li key={index}>
			<div className='row mt-2'>
				<div className='col-8 entry'>
					<span>{entry.name} - {entry.amount} zł</span>
				</div>
				<div className='col-4'>
					<InputGroup>
						<Button
							variant='primary'
							onClick={(): void => {
								setEditName(entry.name);
								setEditAmount(entry.amount);
								setEditedEntry(index);
							}}
						>
							Edytuj
						</Button>
						<Button
							variant='danger'
							onClick={(): void => props.onRemove(entry)}
						>
							Usuń
						</Button>
					</InputGroup>
				</div>
			</div>
		</li>;
	}

	function handleNameChange(e: React.ChangeEvent<HTMLInputElement>): void {
		setNameError(false);
		setName(e.target.value);
	}

	function handleAmountChange(e: React.ChangeEvent<HTMLInputElement>): void {
		setAmountError(false);
		setAmount(+e.target.value);
	}

	function handleEditNameChange(e: React.ChangeEvent<HTMLInputElement>): void {
		setEditNameError(false);
		setEditName(e.target.value);
	}

	function handleEditAmountChange(e: React.ChangeEvent<HTMLInputElement>): void {
		setEditAmountError(false);
		setEditAmount(+e.target.value);
	}

	function handleClick(): void {
		if (!name) {
			setNameError(true);
		}
		if (amount <= 0) {
			setAmountError(true);
		}
		if (name && amount) {
			props.onAdd({name, amount});
			setName('');
			setAmount(0);
		}
	}

	function handleEditClick(): void {
		console.log(editName, editAmount, editedEntry);
		if (!editName) {
			setEditNameError(true);
		}
		if (editAmount <= 0) {
			setEditAmountError(true);
		}
		if (editName && editAmount && editedEntry !== undefined) {
			setEditName('');
			setEditAmount(0);
			setEditedEntry(undefined);
			props.onEdit(editedEntry, {name: editName, amount: editAmount});
		}
	}

	function calculateSum(): number {
		return props.entries
			.map(entry => entry.amount)
			.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
	}

	function closeModal(): void {
		setEditedEntry(undefined);
		setEditAmount(0);
		setEditName('');
	}

	return <section className='col-6'>
		<div className='h2'>{props.title}</div>
		<InputGroup className='mb-4'>
			<FloatingLabel
				label='Nazwa'
				className='col-7'
			>
				<Form.Control
					value={name}
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
					value={amount}
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
		</InputGroup>
		<ul id='income-list'>
			{props.entries.map(renderEntry)}
		</ul>
		<div className='total-income'>
			Suma: {calculateSum().toFixed(2)} zł
		</div>
		<Modal
			show={editedEntry !== undefined}
			onHide={closeModal}
		>
			<Modal.Header closeButton>
				<Modal.Title>Edytuj wpis</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<InputGroup className='mb-4'>
					<FloatingLabel label='Nazwa'>
						<Form.Control
							value={editName}
							onChange={handleEditNameChange}
							type='text'
							placeholder='Nazwa'
							isInvalid={editNameError}
						/>
						<Form.Control.Feedback
							className='feedback'
							type='invalid'
						>
							Nazwa nie może być pusta.
						</Form.Control.Feedback>
					</FloatingLabel>
					<FloatingLabel label='Nazwa'>
						<Form.Control
							value={editAmount}
							onChange={handleEditAmountChange}
							type='number'
							placeholder='Kwota'
							step='0.01'
							isInvalid={editAmountError}
						/>
						<Form.Control.Feedback
							className='feedback'
							type='invalid'
						>
							Kwota musi być dodatnia i niepusta.
						</Form.Control.Feedback>
					</FloatingLabel>
				</InputGroup>
			</Modal.Body>
			<Modal.Footer>
				<Button
					variant='secondary'
					onClick={closeModal}
				>
					Anuluj
				</Button>
				<Button
					variant='primary'
					onClick={handleEditClick}
				>
					Zapisz
				</Button>
			</Modal.Footer>
		</Modal>
	</section>;
}
