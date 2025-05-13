import { z } from 'zod';

export const checkoutFormSchema = z.object({
	firstName: z.string().min(2, { message: 'First name must contain at least 2 characters' }),
	lastName: z.string().min(2, { message: 'Last name must contain at least 2 characters' }),
	email: z.string().email({ message: 'Please enter a valid email address' }),
	phone: z.string().min(10, { message: 'Please enter a valid phone number' }),
	address: z.string().min(5, { message: 'Please enter a valid address' }),
	comment: z.string().optional(), // Optional field for any additional comment
});

export type CheckoutFormValues = z.infer<typeof checkoutFormSchema>;
