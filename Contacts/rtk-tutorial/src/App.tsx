// module imports
import React from 'react';

// component imports
import {
	useContactsQuery,
	useGetContactQuery,
	useAddContactMutation,
	useUpdateContactMutation,
	useDeleteContactMutation
} from './services/contactsApi';

// css imports
import './App.css';

function App() {
	// Using a query hook automatically fetches data and returns query values
	const {
		data,
		error,
		isLoading,
		isFetching,
		isSuccess
	} = useContactsQuery();

	return (
		<div className="App">
			<h1>React Redux Toolkit RTK Query Tutorial</h1>

			{/* Loading */}
			{isLoading && <h2>Loading...</h2>}

			{/* Fetching */}
			{isFetching && <h2>Fetching...</h2>}

			{/* Error */}
			{error && <h2>Something went wrong.</h2>}

			{/* Success */}
			{
				isSuccess && (
					<div>
						{
							data?.map((contact) => {
								return (
									<div className='data' key={contact.id}>
										<span>
											{contact.name}
										</span>
										<span>
											<ContactDetail id={contact.id} />
										</span>
									</div>
								)
							})
						}
					</div>
				)
			}

			<div><ContactOptions /></div>
		</div>
	);
}

export const ContactDetail = ({ id }: { id: string }) => {
	const { data } = useGetContactQuery(id);
	return (
		<pre>
			{
				JSON.stringify(data, undefined, 2)
			}
		</pre>
	)
}

export const ContactOptions = () => {
	const [addContact] = useAddContactMutation();
	const [updateContact] = useUpdateContactMutation();
	const [deleteContact] = useDeleteContactMutation();

	const contact = {
		"id": "4",
		"name": "Mike John",
		"email": "mike@outlook.com"
	}

	const updates = {
		"id": "4",
		"name": "Mike Tyson",
		"email": "mikky@outlook.com"
	}

	const addHandler = async () => {
		await addContact(contact);
	}

	const updateHandler = async () => {
		await updateContact(updates);
	}

	const deleteHandler = async () => {
		await deleteContact(contact.id);
	}

	return (
		<>
			<button onClick={() => addHandler()}>Add Contact</button>
			<button onClick={() => updateHandler()}>Update Contact</button>
			<button onClick={() => deleteHandler()}>Delete Contact</button>
		</>
	)
}

export default App;
