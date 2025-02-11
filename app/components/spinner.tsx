import { Loader2 } from 'lucide-react';

export function Spinner() {
  return (
    <div className='flex items-center justify-center'>
      <Loader2 className='size-8 animate-spin' />
    </div>
  );
}
