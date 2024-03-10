'use client'
import React, { useState, useRef, useEffect } from "react";
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

  const handleClickSubmit = () => { }

  useEffect(() => {
    if (isOutsideClick) {
      setIsFocused(false);
    }
  }, [isOutsideClick])


  return (
    <CardContainer className='transition-all duration-300' ref={containerRef} onMouseDown={() => setIsFocused(true)}>
      <div className="w-full h-full flex flex-col gap-2">
        <Textarea label="Say something witty..." className={isFocused ? '' : "p-0 min-h-0 h-9 overflow-hidden"} labelClassName={isFocused ? '' : "peer-placeholder-shown:top-1"} />
        <Button className={`transition-all duration-300 w-20 self-end ${isFocused ? '' : 'hidden'}`} onClick={handleClickSubmit}>Submit</Button>
      </div>
    </CardContainer>
  );
}
