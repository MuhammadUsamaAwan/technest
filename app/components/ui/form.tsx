import type { FieldApi } from '@tanstack/react-form';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function FieldInfo({ field }: { field: FieldApi<any, any, any, any> }) {
  return (
    field.state.meta.isTouched &&
    field.state.meta.errors.length && (
      <div className='text-destructive text-[0.8rem]'>{field.state.meta.errors.join(', ')}</div>
    )
  );
}
