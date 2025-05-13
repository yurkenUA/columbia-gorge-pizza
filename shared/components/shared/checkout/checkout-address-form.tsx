import React from 'react';
import { WhiteBlock } from '../white-block';
import { FormInput, FormTextarea } from '../form';

interface Props {
	className?: string;
}

export const CheckoutAddressForm: React.FC<Props> = ({ className }) => {
	return (
		<WhiteBlock title="3. Delivery Address" className={className}>
			<div className="flex flex-col gap-5">
				<FormInput name="address" className="text-base" placeholder="Please Enter your address" />

				<FormTextarea
					name="comment"
					className="text-base"
					placeholder="Leave us a comment"
					rows={5}
				/>
			</div>
		</WhiteBlock>
	);
};
