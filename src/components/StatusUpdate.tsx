/* eslint-disable @typescript-eslint/ban-ts-comment */
"use client";
import React, { useState, useRef, useEffect } from "react";
import { useFormState } from "react-dom";
// actions
import createPost, { FormState } from "@/actions/create-post";
// hooks
import useOutsideClick from "@/hooks/useOutsideClick";
// components
import Textarea from "@/components/Textarea";
import CardContainer from "@/components/CardContainer";
import StatusButton from "@/components/StatusButton";

export default function StatusUpdate() {
  // reset form - https://react.dev/reference/react-dom/components/form#optimistically-updating-form-data
  // https://github.com/vercel/next.js/discussions/58448
  const formRef = useRef<HTMLFormElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const isOutsideClick = useOutsideClick(containerRef);
  const [isFocused, setIsFocused] = useState(false);
  // @ts-ignore - i think there is a typescript error
  // https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations#examples
  const [state, formAction] = useFormState<FormState>(createPost, {
    msg: "",
    errors: {},
  });
  const [msgLimit, setMsgLimit] = useState("");

  const handleChange: React.ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    setMsgLimit(e.target.value);
  };

  useEffect(() => {
    if (isOutsideClick) {
      setIsFocused(false);
    }
  }, [isOutsideClick]);

  useEffect(() => {
    if (state.success) {
      setMsgLimit("");
      state.success = false;
      setIsFocused(false);
    }
  }, [state, state.success]);

  return (
    <CardContainer
      className="transition-all duration-300"
      ref={containerRef}
      onMouseDown={() => setIsFocused(true)}
    >
      <form action={formAction} ref={formRef}>
        <div className="flex h-full w-full flex-col gap-2">
          <Textarea
            onChange={handleChange}
            value={msgLimit}
            name="msg"
            label="Say something witty..."
            className={
              isFocused ? "" : "h-9 min-h-0 overflow-hidden p-0 text-opacity-0"
            }
            labelClassName={
              isFocused ? "" : "peer-placeholder-shown:top-1 text-lg top-1"
            }
          />
          {state.errors.msg && (
            <div className="self-end text-red-500 text-opacity-80">
              {state.errors.msg.join(";")}
            </div>
          )}
          <div className="flex items-center gap-2 self-end">
            {isFocused && (
              <p className="font-medium text-gray-600">{msgLimit.length}/280</p>
            )}
            <StatusButton isFocused={isFocused} />
          </div>
        </div>
      </form>
    </CardContainer>
  );
}
