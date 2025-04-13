const API_BASE_URL = '/api';

interface Contact {
    id: string;
    name: string;
    email: string;
    phone: string;
}

export async function fetchContacts(): Promise<Contact[]> {
    const response = await fetch(`${API_BASE_URL}/contacts`);
    if (!response.ok) {
        throw new Error('Failed to fetch contacts.');
    }
    return response.json();
}

export async function addContact(contact: Contact): Promise<Contact> {
    const response = await fetch(`${API_BASE_URL}/contacts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(contact),
    });
    if (!response.ok) {
        throw new Error('Failed to add contact.');
    }
    return response.json();
}

export async function deleteContact(contactId: string): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/contacts/${contactId}`, {
        method: 'DELETE',
    });
    if (!response.ok) {
        throw new Error('Failed to delete contact.');
    }
}