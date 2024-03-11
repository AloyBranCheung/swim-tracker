'use client'
import React, { useState, useRef, useEffect } from "react";
import { useFormState } from "react-dom";
// actions
import createPost, { FormState } from "@/actions/create-post";
// hooks
import useOutsideClick from "@/hooks/useOutsideClick";
// components
import Textarea from "@/components/Textarea";
import CardContainer from "@/components/CardContainer";
import Button from "../Button";

export default function StatusUpdate() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const isOutsideClick = useOutsideClick(containerRef);
  const [isFocused, setIsFocused] = useState(false)
  // @ts-ignore - i think there is a typescript error 
  // https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations#examples
  const [state, formAction] = useFormState<FormState>(createPost, { msg: '', errors: {} })
  const [msgLimit, setMsgLimit] = useState('')

  const handleChange: React.ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    setMsgLimit(e.target.value);
  }

  useEffect(() => {
    if (isOutsideClick) {
      setIsFocused(false);
    }
  }, [isOutsideClick])


  return (
    <CardContainer className='transition-all duration-300' ref={containerRef} onMouseDown={() => setIsFocused(true)}>
      <form action={formAction}>
        <div className="w-full h-full flex flex-col gap-2">
          <Textarea onChange={handleChange} name="msg" label="Say something witty..." className={isFocused ? '' : "p-0 min-h-0 h-9 overflow-hidden text-opacity-0"} labelClassName={isFocused ? '' : "peer-placeholder-shown:top-1 text-lg top-1"} />
          {state.errors.msg && <div className="self-end text-red-500 text-opacity-80">{state.errors.msg.join(';')}</div>}
          <div className="self-end flex items-center gap-2">
            <p className="text-gray-600 font-medium">{msgLimit.length}/280</p>
            <Button className={isFocused ? '' : 'hidden'} type='submit'>Submit</Button>
          </div>
        </div>
      </form>
    </CardContainer>
  );
}
