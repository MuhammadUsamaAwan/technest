import * as React from 'react';

import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';

import { cn } from '~/lib/utils';
import { Button } from '~/components/ui/button';
import { Calendar } from '~/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '~/components/ui/popover';

type DatePickerProps = {
  value?: Date;
  onChange?: (date: Date | undefined) => void;
  disablePast?: boolean;
  disableFuture?: boolean;
};

const DatePicker: React.FC<DatePickerProps> = ({ value, onChange, disablePast, disableFuture }) => {
  const [date, setDate] = React.useState<Date | undefined>(value);
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    if (onChange) {
      onChange(date);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant='outline'
          className={cn('justify-start text-left font-normal', !date && 'text-muted-foreground')}
        >
          <CalendarIcon className='mr-2 size-4' />
          {date ? format(date, 'PPP') : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-auto p-0'>
        <Calendar
          mode='single'
          selected={date}
          onSelect={val => {
            setDate(val);
            setOpen(false);
          }}
          initialFocus
          fromDate={disablePast ? new Date() : undefined}
          toDate={disableFuture ? new Date() : undefined}
        />
      </PopoverContent>
    </Popover>
  );
};

export default DatePicker;
