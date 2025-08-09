
import React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";
import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";
import { useSpeech } from "@/contexts/SpeechContext";

const labelVariants = cva(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
);

const Label = React.forwardRef(({ className, children, ...props }, ref) => {
  const { speak, isSpeechEnabled } = useSpeech();

  const handleMouseEnter = () => {
    if (isSpeechEnabled && children) {
      speak(children.toString());
    }
  };

  return (
    <LabelPrimitive.Root
      ref={ref}
      className={cn(labelVariants(), className)}
      onMouseEnter={handleMouseEnter}
      {...props}
    />
  );
});
Label.displayName = LabelPrimitive.Root.displayName;

export { Label };
