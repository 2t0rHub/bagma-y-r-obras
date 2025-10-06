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

interface FaqListProps {
  data: FaqItem[];
}

export function FaqList({ data }: FaqListProps) {
  return (
    <Accordion type="single" collapsible className="w-full space-y-4">
      {data.map((item) => (
        <div
          key={item.id}
          itemScope
          itemProp="mainEntity"
          itemType="https://schema.org/Question"
          className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
        >
          <AccordionItem value={item.id} className="border-b-0">
            <AccordionTrigger className="p-6 text-left hover:no-underline">
              <h3
                itemProp="name"
                className="text-lg font-semibold text-chambray-800"
              >
                {item.question}
              </h3>
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-6 pt-0">
              <div
                itemScope
                itemProp="acceptedAnswer"
                itemType="https://schema.org/Answer"
              >
                <p
                  itemProp="text"
                  className="text-chambray-700 text-base leading-relaxed"
                >
                  {item.answer}
                </p>
              </div>
            </AccordionContent>
          </AccordionItem>
        </div>
      ))}
    </Accordion>
  );
}
