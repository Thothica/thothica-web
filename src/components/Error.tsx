import { CircleAlert } from 'lucide-react';

const Error = ( { message }: { message: string } ) => {
  return (
    <section className='border bg-destructive rounded-lg p-2'>
        <div className='flex items-center text-white p-2'>        
            <CircleAlert className='mr-2 w-5 h-5' />
            <span className='text-xl font-bold'>Error</span>
        </div>
        <div className='border rounded-lg bg-background/60 p-2'>
          {message}
        </div>
    </section>
  )
}

export default Error;
