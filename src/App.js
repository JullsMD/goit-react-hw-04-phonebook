import React, { useState, useEffect } from 'react';
import Container from './components/Container';
import ContactForm from './components/ContactForm';
import ContactList from './components/ContactList';
import Filter from './components/Filter';
import toast, { Toaster } from 'react-hot-toast';
import { nanoid } from 'nanoid';

const notify = message => toast.error(message);
const INITIAL_CONTACTS = [
  { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
];

export function App() {
  const [contacts, setContacts] = useState(() => {
    return (
      JSON.parse(window.localStorage.getItem('contacts')) ?? INITIAL_CONTACTS
    );
  });

  const [filter, setFilter] = useState('');

  const handleSubmitForm = ({ name, number }) => {
    const contact = {
      id: nanoid(),
      name,
      number,
    };
    const isInContacts = contacts.find(
      item => item.name.toLowerCase() === contact.name.toLowerCase()
    );
    if (isInContacts !== undefined) {
      return notify(`${name} is already in contacts`);
    }
    setContacts(contacts => [contact, ...contacts]);
  };

  const deleteContact = id => {
    setContacts(contacts.filter(contact => contact.id !== id));
  };

  const handleChange = e => {
    setFilter(e.currentTarget.value);
  };

  const filteredContacts = () => {
    const normalizedFilter = filter.toLowerCase();
    let filteredContacts = contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
    return filteredContacts;
  };

  useEffect(() => {
    const savedContacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(savedContacts);
    if (parsedContacts) {
      setContacts(parsedContacts);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  return (
    <Container>
      <h1>Phonebook</h1>
      <ContactForm onSubmitForm={handleSubmitForm} />
      <h2>Contacts</h2>
      <Toaster />
      <Filter value={filter} onHandleChange={handleChange} />
      <ContactList
        filteredContacts={filteredContacts()}
        onDeleteContact={deleteContact}
      />
    </Container>
  );
}

export default App;
