import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { playSound } from "@/hooks/useSoundEffect";
import { faqs } from "@/data/faqs";

const FAQSection = () => {
  const handleToggle = () => {
    playSound("/sounds/external-link.mp3", 0.25);
  };

  return (
    <section id="faq" className="relative bg-secondary py-24 md:py-32">
      <div className="container mx-auto px-4">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-20">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <h2 className="text-4xl font-bold leading-[0.95] tracking-tight text-foreground sm:text-5xl">
              Questions, answered
            </h2>
            <p className="mt-6 max-w-sm text-lg text-muted-foreground">
              Joining BGMI and Free Fire rooms, entry fees, and UPI payouts. Still stuck?
            </p>
            <a
              href="/contact"
              className="mt-6 inline-flex font-semibold text-primary underline-offset-4 hover:underline"
            >
              Talk to support
            </a>
          </div>

          <Accordion type="single" collapsible onValueChange={handleToggle} className="divide-y divide-border/60">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border-0">
                <AccordionTrigger className="py-6 text-left text-lg font-semibold text-foreground hover:text-primary hover:no-underline md:text-xl">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="pb-6 text-base leading-relaxed text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
