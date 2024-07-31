"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function LargeInformation({
  title,
  value,
}: {
  title: string;
  value: string;
}) {
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1">
        <AccordionTrigger>{title}</AccordionTrigger>
        <AccordionContent className="whitespace-pre-wrap text-base font-normal sm:text-lg">
          {value}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
