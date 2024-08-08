import React from 'react';
import './Section.css';
import {Entry} from '../entity/Entry';
import {EntryComponent} from './EntryComponent';
import {CreateEntryForm} from './CreateEntryForm';
import {EditModal} from './EditModal';

interface SectionProps {
	readonly title: string;
	readonly entries: Entry[];
	readonly onAdd: (entry: Entry) => void;
	readonly onRemove: (entry: Entry) => void;
	readonly onEdit: (entry: Entry) => void;
}

export function Section(props: SectionProps): React.ReactElement {
	const [editedEntry, setEditedEntry] = React.useState<Entry | undefined>(undefined);

	function renderEntry(entry: Entry, index: number): React.ReactElement {
		return <li key={index}>
			<EntryComponent
				entry={entry}
				onEditClick={(): void => setEditedEntry({...entry})}
				onDeleteClick={(): void => props.onRemove(entry)}
			/>
		</li>;
	}

	function calculateSum(): number {
		return props.entries
			.map(entry => entry.amount)
			.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
	}

	function handleAccept(entry: Entry): void {
		setEditedEntry(undefined);
		props.onEdit(entry);
	}

	function handleClose(): void {
		setEditedEntry(undefined);
	}

	return <section className='col-6'>
		<div className='h2'>{props.title}</div>
		<CreateEntryForm onSubmit={props.onAdd}/>
		<ul id='income-list'>
			{props.entries.map(renderEntry)}
		</ul>
		<div className='total-income'>
			Suma: {calculateSum().toFixed(2)} zł
		</div>
		{editedEntry && <EditModal
			entry={editedEntry}
			onClose={handleClose}
			onAccept={handleAccept}
		/>}
	</section>;
}
