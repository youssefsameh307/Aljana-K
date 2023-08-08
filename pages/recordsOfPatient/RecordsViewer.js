import React from "react";
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemPanel,
  AccordionItemButton,
} from "react-accessible-accordion";

const RecordsViewer = ({ records }) => {
  return (
    <>
      <div className="ptb-100">
        <div className="container">
          <div className="faq-content">
            <h2>Dental Care</h2>
            {records ? (
              <Accordion allowZeroExpanded preExpanded={["a"]}>
                <AccordionItem uuid="a">
                  <AccordionItemHeading>
                    <AccordionItemButton>
                      <span>{records[0].createdAt}</span>
                    </AccordionItemButton>
                  </AccordionItemHeading>
                  <AccordionItemPanel>
                    <p>{records[0].note}</p>
                  </AccordionItemPanel>
                </AccordionItem>
                {records.slice(1).map((item, index) => (
                  <div key={index}>
                    <AccordionItem uuid={`${index}`}>
                      <AccordionItemHeading>
                        <AccordionItemButton>
                          <span>{item.createdAt}</span>
                        </AccordionItemButton>
                      </AccordionItemHeading>
                      <AccordionItemPanel>
                        <p>{item.note}</p>
                      </AccordionItemPanel>
                    </AccordionItem>
                  </div>
                ))}
              </Accordion>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default RecordsViewer;
