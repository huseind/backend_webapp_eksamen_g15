import ContactForm from '../model/contactForm.js';

export const sendForm = async (form) => ContactForm.create(form);

export const listForms = async () => ContactForm.find();

export const getFormById = async (id) => ContactForm.findById(id);

export const deleteForm = async (id) => { 
    const form = ContactForm.findById(id);
    form.remove();
}