import { cn } from '@/shared/lib/utils';

interface Props {
	value: number;
	className?: string;
}

export const CartItemDetailsPrice: React.FC<Props> = ({ value, className }) => {
	return <h2 className={cn('font-bold', className)}>${value.toFixed(2)}</h2>;
};
