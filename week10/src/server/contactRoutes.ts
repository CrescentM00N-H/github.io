import express from 'express';
import fs from 'fs/promises';
import path from 'path';

const router = express.Router();
const contactsFilePath = path.join(process.cwd(), 'data', 'contacts.json');

interface Contact {
    id: string;
    name: string;
    email: string;
    phone: string;
}

// Helper functions to read and write contacts
async function readContacts(): Promise<Contact[]> {
    const data = await fs.readFile(contactsFilePath, 'utf-8');
    return JSON.parse(data);
}

async function writeContacts(contacts: Contact[]): Promise<void> {
    await fs.writeFile(contactsFilePath, JSON.stringify(contacts, null, 2));
}

// API Endpoints
router.get('/contacts', async (req, res) => {
    try {
        const contacts = await readContacts();
        res.json(contacts);
    } catch (error) {
        res.status(500).json({ error: 'Failed to read contacts.' });
    }
});

router.post('/contacts', async (req, res) => {
    try {
        const { id, name, email, phone } = req.body;
        if (!id || !name || !email || !phone) {
            return res.status(400).json({ error: 'All fields (id, name, email, phone) are required.' });
        }

        const newContact: Contact = { id, name, email, phone };
        const contacts = await readContacts();
        contacts.push(newContact);
        await writeContacts(contacts);
        res.status(201).json(newContact);
    } catch (error) {
        res.status(500).json({ error: 'Failed to add contact.' });
    }
});

router.delete('/contacts/:id', async (req, res) => {
    try {
        const contactId = req.params.id;
        let contacts = await readContacts();
        contacts = contacts.filter(contact => contact.id !== contactId);
        await writeContacts(contacts);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete contact.' });
    }
});

export default router;