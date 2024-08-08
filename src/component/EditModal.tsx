import React from 'react';
import {Button, FloatingLabel, Form, InputGroup, Modal} from 'react-bootstrap';
import {Entry} from '../entity/Entry';

interface EditModalProps {
	readonly entry: Entry;
	readonly onClose: () => void;
	readonly onAccept: (entry: Entry) => void;
}

export function EditModal(props: EditModalProps): React.ReactElement {
	const [entry, setEntry] = React.useState<Entry>(props.entry);
	const [editNameError, setEditNameError] = React.useState<boolean>(false);
	const [editAmountError, setEditAmountError] = React.useState<boolean>(false);

	function handleEditNameChange(e: React.ChangeEvent<HTMLInputElement>): void {
		setEditNameError(false);
		setEntry({
			...entry,
			name: e.target.value,
		});
	}

	function handleEditAmountChange(e: React.ChangeEvent<HTMLInputElement>): void {
		setEditAmountError(false);
		setEntry({
			...entry,
			amount: +e.target.value
		});
	}

	return <Modal
		show={props.entry !== undefined}
		onHide={props.onClose}
	>
		<Modal.Header closeButton>
			<Modal.Title>Edytuj wpis</Modal.Title>
		</Modal.Header>
		<Modal.Body>
			<InputGroup className='mb-4'>
				<FloatingLabel label='Nazwa'>
					<Form.Control
						value={entry.name}
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
						value={entry.amount}
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
				onClick={props.onClose}
			>
				Anuluj
			</Button>
			<Button
				variant='primary'
				onClick={(): void => props.onAccept(entry)}
			>
				Zapisz
			</Button>
		</Modal.Footer>
	</Modal>;
}
