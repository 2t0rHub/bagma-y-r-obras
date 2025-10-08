import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

interface Props {
  data: FaqItem[];
}

export default function FaqList({ data }: Props) {
  return (
    <Accordion type="single" collapsible className="w-full space-y-4">
      {data.map((faq) => (
        <AccordionItem
          key={faq.id}
          value={faq.id}
          className="border-b-0 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
        >
          <AccordionTrigger className="p-6 text-left hover:no-underline">
            <h3 className="text-lg font-semibold text-chambray-800">
              {faq.question}
            </h3>
          </AccordionTrigger>
          <AccordionContent className="px-6 pb-6">
            <p className="text-chambray-600">{faq.answer}</p>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
