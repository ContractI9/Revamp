import { Fragment, useState } from "react";
import NotesForm from "./NotesForm";
import NotesCard from "./NotesCard";
import NotesSelector from "./NotesSelector";
import jsPDF from "jspdf";
import react from "../../Assets/Images/react.png";
require("jspdf-autotable");

const Notes = (props) => {
  const [showForm, setShowForm] = useState(false);
  const onShowHandler = () => {
    props.stopVideo();
    setShowForm(true);
  };
  const onHidehandler = () => {
    setShowForm(false);
  };

  // const downloadNotesHandler = (notes) => {
  //   html2canvas(document.querySelector("#content")).then((canvas) => {
  //     const imgData = canvas.toDataURL("image/png");
  //     const pdf = new jsPDF("p", "px", "a4");
  //     pdf.addImage(imgData, "PNG", 0, 0);
  //     pdf.save("Notes.pdf");
  //   });
  // };

  const downloadNotesHandler = (notes) => {
    // Create a new PDF document
    const pdf = new jsPDF();
    // Set the font and text size
    pdf.setFont("Helvetica", "Bold");
    pdf.setFontSize(12);

    // Set the y position for the title
    const yPos = 10;

    // Calculate the x position for the title
    //@ts-ignore
    const titleXPos =
      pdf.internal.pageSize.getWidth() / 2 -
      (pdf.getStringUnitWidth("HTML CSS BASICS") * pdf.internal.getFontSize()) /
        2;

    // Add the title to the PDF
    pdf.setFontSize(16);
    pdf.setTextColor(0, 0, 0);
    pdf.text(props.courseDescription, titleXPos, yPos + 5);
    // Set the x and y position for the subtitle
    const subtitleXPos = 10;
    const subtitleYPos = yPos + 20;

    // Add the subtitle to the PDF
    pdf.setFontSize(12);
    pdf.text("My Notes", subtitleXPos, subtitleYPos);

    // Add the notes to the PDF as a table
    const tableData = [];
    for (const note of notes) {
      // Add the notes to the table data array
      var temp  = note.note.split(">")
      var temp2 = temp[1].split("<")
      
      tableData.push([temp2[0]]);
    }

    // Add the table to the PDF
    //@ts-ignore
    pdf.autoTable({
      head: [["Notes"]],
      body: tableData,
      startY: subtitleYPos + 20,
      theme: "grid",
      styles: {
        fontSize: 12,
        font: "Helvetica",
        cellPadding: 8,
        halign: "left",
        valign: "middle",
        thead: {
          fillColor: "#C6D8EC",
          textColor: "white",
        },
      },
    });

    // Set the document properties
    pdf.setProperties({
      title: "Notes",
      author: "John Doe",
      subject: "Important notes",
    });

    // Set the display mode
    pdf.setDisplayMode("fullwidth");

    // Loop over the pages of the PDF
    for (let i = 0; i < pdf.internal.pages.length; i++) {
      pdf.setPage(i);
      // Set the x and y position for the logo image to the top right corner of the page
      const xPos = pdf.internal.pageSize.getWidth() - 10;
      // pdf.addImage(react, 'PNG', xPos, 0, 10, 10, 'center');
    }

    // Generate the PDF and download it
    pdf.save("notes.pdf");
  };

  const displayedNotes = props.notes.map((note, index) => {
    return (
      <NotesCard
        editNote={props.editNote.bind(null, index)}
        deleteNote={props.deleteNote.bind(null, index)}
        note={note.note}
        timestamp={note.timestamp}
        sourceDescription={note.sourceDescription}
        subtitleDescription={note.subtitleDescription}
      ></NotesCard>
    );
  });
  var minutes = Math.floor(+props.timestamp / 60);
  var seconds = +props.timestamp % 60;
  var zeroS = seconds < 10 ? "0" : "";

  return (
    <Fragment>
      {!showForm && (
        <div
          onClick={onShowHandler}
          className="relative bg-white text-gray-500 border border-gray-500 p-4 m-4 cursor-pointer hover:bg-gray-200"
        >
          Create a new note at {minutes + ":" + zeroS + seconds}
          <div className="absolute right-2 bottom-5 text-black">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              class="bi bi-plus-circle-fill"
              viewBox="0 0 16 16"
            >
              <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z" />
            </svg>
          </div>
        </div>
      )}
      {showForm && (
        <div className="flex items-center space-x-2 px-4">
          <div className="bg-veryLightBlue text-gray-900 text-sm py-[2px] px-2 rounded-lg">
            {minutes + ":" + zeroS + seconds}
          </div>
          <NotesForm
            addNote={props.addNote}
            onHidehandler={onHidehandler}
            resumeVideo={props.resumeVideo}
          ></NotesForm>
        </div>
      )}
      <div className="flex mt-[-20px] items-center justify-between">
        <div className="items-center w-[30vw] justify-center m-4">
          <NotesSelector
            selected={props.selected}
            selectedChangeHandler={props.selectedChangeHandler}
          ></NotesSelector>
        </div>
        <div className="mr-4">
          <button
            onClick={downloadNotesHandler.bind(null, props.notes)}
            className="  flex w-[25vw] items-center justify-between border border-black p-3 hover:bg-gray-200"
          >
            <p className="text-gray-400">  Download Notes</p>
          
            <svg
              className="ml-2 text-black "
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-arrow-down-circle-fill"
              viewBox="0 0 16 16"
            >
              <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v5.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V4.5z" />
            </svg>
          </button>
        </div>
      </div>

      <div id="content" className="mt-8">
        {displayedNotes}
      </div>
    </Fragment>
  );
};
export default Notes;
