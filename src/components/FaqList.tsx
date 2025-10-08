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
    <div
      className="max-w-3xl mx-auto"
      itemScope
      itemType="https://schema.org/FAQPage"
    >
      <Accordion type="single" collapsible className="w-full space-y-4">
        {data.map((faq) => (
          <AccordionItem
            key={faq.id}
            value={faq.id}
            itemScope
            itemProp="mainEntity"
            itemType="https://schema.org/Question"
            className="border-b-0 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            <AccordionTrigger className="p-6 text-left hover:no-underline">
              <h3
                itemProp="name"
                className="text-lg font-semibold text-chambray-800"
              >
                {faq.question}
              </h3>
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-6">
              <div
                itemScope
                itemProp="acceptedAnswer"
                itemType="https://schema.org/Answer"
              >
                <p itemProp="text" className="text-chambray-600">
                  {faq.answer}
                </p>
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
