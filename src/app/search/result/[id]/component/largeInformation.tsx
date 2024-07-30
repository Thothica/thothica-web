"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function largeInformation({
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
        <AccordionContent>{value}</AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
