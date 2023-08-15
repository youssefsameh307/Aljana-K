import React, { useState } from "react";
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemPanel,
  AccordionItemButton,
} from "react-accessible-accordion";
import { FaEdit, FaCheck } from "react-icons/fa"; // Import the edit and tick icons
import CustomMessage from "../../components/_App/customMessage";

const RecordsViewer = ({ records=[], handleEditRecord }) => {
  const [editingIndex, setEditingIndex] = useState(-1);
  const [editedNote, setEditedNote] = useState("");

  const handleEditClick = (index) => {
    setEditingIndex(index);
    setEditedNote(records[index].note);
  };

  const handleTickClick = async (index) => {
    // Implement your logic here to submit the edited note, e.g., API call
    
    console.log(editedNote, index);
    console.log(records[index])
    const record_to_be_edited = records[index]
    const recordID = record_to_be_edited._id
    const updatedRecord = editedNote;
    await handleEditRecord(recordID, updatedRecord)
    setEditingIndex(-1);
  };

  return (
    <div className="ptb-100">
      <div className="container">
        <div className="faq-content">
          <h2>Dental Care</h2>
          {records.length > 0 ? (
            <Accordion allowZeroExpanded preExpanded={["a"]}>
              {records.map((item, index) => (
                <AccordionItem key={index} uuid={index.toString()}>
                  <AccordionItemHeading>
                    <AccordionItemButton>
                      <span>{item.createdAt} </span>
                      <span className="ml-auto">
                        {editingIndex === index ? (
                          <button
                            className="edit-button mr-2"
                            onClick={() => handleTickClick(index)}
                          >
                            <FaCheck />
                          </button>
                        ) : (
                          <button
                            className="edit-button mr-2"
                            onClick={() => handleEditClick(index)}
                          >
                            <FaEdit />
                          </button>
                        )}
                      </span>
                    </AccordionItemButton>
                  </AccordionItemHeading>
                  <AccordionItemPanel>
                    {editingIndex === index ? (
                      <textarea
                        value={editedNote}
                        onChange={(e) => setEditedNote(e.target.value)}
                        rows={4}
                      />
                    ) : (
                      <p>{item.note}</p>
                    )}
                  </AccordionItemPanel>
                </AccordionItem>
              ))}
            </Accordion>
          ) : (
            <CustomMessage
              title="Empty records"
              content="Add feedback to this patient from the button below"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default RecordsViewer;
