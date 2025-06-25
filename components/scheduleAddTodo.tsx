"use client";

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { format } from "date-fns";
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus } from 'lucide-react';
import { startTransition, useActionState, useEffect, useRef, useState } from 'react';
import { addFutureTodoAction } from '@/lib/action';
import { newTodoSchema } from '@/lib/schema';
import { toast } from 'sonner';

export default function ScheduleAddTodo() {
  const [validationError, setValidationError] = useState({ title: '' });
  const [selectedDate, setSelectedDate] = useState('');
  const today = format(new Date(), "yyyy-MM-dd");

  const closeRef = useRef<HTMLButtonElement>(null); 

  const [state, dispatch, isPending] = useActionState(addFutureTodoAction, {
    success: '',
    error: undefined,
  });

  useEffect(() => {
    setSelectedDate(today);
  }, []);

  useEffect(() => {
    if (state.success) {
      toast.success(state.success);
      closeRef.current?.click();
    } else if (state.error) {
      toast.error(state.error);
    }
  }, [state]);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    if (!formData.get('createdAt')) {
      formData.set('createdAt', selectedDate);
    }

    const data = Object.fromEntries(formData.entries());
    const result = newTodoSchema.safeParse({ title: data.title });

    if (!result.success) {
      setValidationError({ title: result.error.errors[0].message });
      return;
    }

    startTransition(() => {
      dispatch(formData);
    });
  }

  function validate(event: React.ChangeEvent<HTMLInputElement>) {
    const { value } = event.target;
    const result = newTodoSchema.safeParse({ title: value });

    if (!result.success) {
      setValidationError({ title: result.error.errors[0].message });
    } else {
      setValidationError({ title: '' });
    }
  }

  function handleDateChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSelectedDate(e.target.value);
  }

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant="secondary"
            className="flex items-center gap-2 bg-black text-white rounded-sm py-5 px-10 hover:bg-gray-800 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            Schedule Task
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[480px]">
          <form onSubmit={handleSubmit}>
            <DialogHeader>
              <DialogTitle className="text-left py-2">Schedule New Task</DialogTitle>
            </DialogHeader>

            <div className="grid gap-4">
              <div className="grid gap-3">
                <Label htmlFor="title">Task</Label>
                <Input
                  id="title"
                  name="title"
                  placeholder="What needs to be done?"
                  onChange={validate}
                />
                {validationError.title && (
                  <p className="text-sm text-red-500">{validationError.title}</p>
                )}
              </div>

              <div className="grid gap-3">
                <Label htmlFor="date">Date</Label>
                <Input
                  type="date"
                  name="createdAt"
                  id="date"
                  min={today}
                  placeholder="dd-mm-yyyy"
                  onChange={handleDateChange}
                  className="border rounded px-3 py-2 w-full"
                />
              </div>
            </div>

            <DialogFooter>
              <div className="flex justify-end items-center gap-2 mt-5">
                <DialogClose asChild>
                  <Button variant="outline" className="py-5 px-7 rounded-sm">
                    Cancel
                  </Button>
                </DialogClose>

                <DialogClose asChild>
                  <button ref={closeRef} className="hidden" />
                </DialogClose>

                <Button type="submit" className="py-5 px-6 rounded-sm">
                  {isPending ? 'Scheduling...' : 'Schedule Task'}
                </Button>
              </div>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
