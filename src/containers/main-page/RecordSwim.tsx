"use client";
import React, { ChangeEvent, useEffect, useState } from "react";
import { useFormState } from "react-dom";
// action
import createSwimActivity, { FormState } from "@/actions/create-swim-activity";
// components
import Button from "@/components/Button";
import Modal from "@/components/Modal";
import Card from "@/components/Card";
import Input from "@/components/Input";

export default function RecordSwim() {
  const [isOpen, setIsOpen] = useState(false);
  const [distance, setDistance] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [state, formAction] = useFormState<FormState>(
    // @ts-expect-error - https://react.dev/reference/react-dom/hooks/useFormState
    createSwimActivity,
    {
      swimDistance: undefined,
    },
  );

  const handleDistanceChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDistance(e.target.value);
  };

  useEffect(() => {
    if (state?.success) {
      setIsLoading(false);
      setTimeout(() => {
        setIsOpen(false);
      }, 300);
    } else {
      setIsLoading(false);
    }
  }, [state]);

  return (
    <>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <Card className="flex flex-col gap-4">
          <h1 className="text-lg font-semibold text-header-font">
            Record a swim
          </h1>
          <form action={formAction} className="flex flex-col gap-2">
            <Input
              type="number"
              onChange={handleDistanceChange}
              value={distance}
              name="swimDistance"
              label="Distance Swam"
            />
            {state?.msg && (
              <div className="self-end text-red-500 text-opacity-80">
                {state.msg}
              </div>
            )}
            <Button
              onClick={() => setIsLoading(true)}
              isLoading={isLoading}
              className="w-full"
              type="submit"
              isSuccess={state?.success}
            >
              Submit
            </Button>
          </form>
        </Card>
      </Modal>
      <Button
        className="flex w-full items-center justify-center py-7 text-center"
        onClick={() => setIsOpen(true)}
      >
        Record a swim
      </Button>
    </>
  );
}
