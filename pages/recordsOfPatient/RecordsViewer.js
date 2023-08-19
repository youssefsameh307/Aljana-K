import React, { useState } from "react";
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemPanel,
  AccordionItemButton,
} from "react-accessible-accordion";
import { FaEdit, FaCheck, FaEye } from "react-icons/fa"; // Import the edit and tick icons
import CustomMessage from "../../components/_App/customMessage";
import ToggleVisibility from "../../components/Common/ui/ToggleVisibility";
const RecordsViewer = ({ records=[], handleEditRecord }) => {
  const [editingIndex, setEditingIndex] = useState(-1);
  const [editedNote, setEditedNote] = useState("");
  const [editedVisiblity,setEditedVisiblity] = useState(false)
  console.log(records)
  
  //#region handlers
  const handleEditClick = (index) => {
    setEditingIndex(index);
    setEditedNote(records[index].note);
    setEditedVisiblity(records[index].visible);
  };

  const handleTickClick = async (index) => {
    // Implement your logic here to submit the edited note, e.g., API call
    
    console.log(editedNote, index);
    console.log(records[index])
    const record_to_be_edited = records[index]
    const recordID = record_to_be_edited._id
    const updatedRecordNote = editedNote;
    const updatedVisibility = editedVisiblity;
    await handleEditRecord(recordID, updatedRecordNote, updatedVisibility);
    setEditingIndex(-1);
  };

  
  //#endregion

  //#region user readable date formater
  function formatDateTime(dateTimeString) {
    const options = {
      weekday: "long", // Name of the day
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      // second: "numeric",
      // timeZoneName: "short",
    };

    const formattedDateTime = new Date(dateTimeString).toLocaleString(
      undefined,
      options
    );
    return formattedDateTime;
  }
  //#endregion

  return (
    <div className="ptb-100">
      <div className="container">
        <div className="faq-content">
          <h2>Dental Care</h2>
          {records.length > 0 ? (
            <Accordion allowZeroExpanded preExpanded={["0"]}>
              {records
                .sort((a, b) => {
                  const dateTime = new Date(a.createdAt);
                  const dateTime2 = new Date(b.createdAt);
                  return dateTime2 - dateTime;
                })
                .map((item, index) => (
                  <AccordionItem
                    key={index}
                    uuid={index.toString()}
                    dangerouslySetExpanded={editingIndex === index}
                  >
                    <AccordionItemHeading>
                      <AccordionItemButton>
                        <span suppressHydrationWarning={true}>
                          {formatDateTime(item.createdAt)}
                        </span>
                        <span className="ml-auto">
                          {editingIndex === index ? (
                            <>
                              <button
                                className="edit-button mr-2"
                                onClick={() => handleTickClick(index)}
                              >
                                <FaCheck />
                              </button>
                              <button
                                className="toggle-button"
                                onClick={() =>
                                  setEditedVisiblity(!editedVisiblity)
                                }
                              >
                                <h6>{`${editedVisiblity}`}</h6>
                                <ToggleVisibility
                                  showEye={editedVisiblity}
                                  colorful={true}
                                />
                              </button>
                            </>
                          ) : (
                            <>
                              <button
                                className="edit-button mr-2"
                                onClick={() => handleEditClick(index)}
                              >
                                <FaEdit />
                              </button>
                              <button
                                className="toggle-button"
                                onClick={() => handleEditClick(index)}
                              >
                                <h6>{`${item.visible}`}</h6>
                                <ToggleVisibility
                                  showEye={item.visible}
                                  colorful={false}
                                />
                              </button>
                            </>
                          )}
                          {/* Toggle Visibility Button */}
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
