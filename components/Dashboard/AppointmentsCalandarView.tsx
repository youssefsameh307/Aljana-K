"use client";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { AppointmentDocument } from "../../models/appointmentModel";
const localizer = momentLocalizer(moment);

type Event = {
  title: string;
  start: Date;
  end: Date;
  resource?: any;
};

const myEventsList: Event[] = [
  {
    title: "Meeting 1",
    start: new Date(2023, 7, 19, 10, 0), // August 19, 2023, 10:00 AM
    end: new Date(2023, 7, 19, 12, 0), // August 19, 2023, 12:00 PM
  },
  {
    title: "Meeting 2",
    start: new Date(2023, 7, 19, 10, 0), // August 19, 2023, 2:00 PM
    end: new Date(2023, 7, 19, 16, 0), // August 19, 2023, 4:00 PM
  },
  // Add more events as needed
];

function CreateEventsFromAppointments(
  appointments: AppointmentDocument[]
): Event[] {
  console.log(appointments);
  return appointments.map((appointment) => {
    console.log(appointment.time);
    return {
      title: `${appointment.reference}`,
      start: new Date(appointment.time),
      end: new Date(appointment.time),
    };
  });
}

const MyCalendar = ({
  appointments,
}: {
  appointments: AppointmentDocument[];
}) => (
  <div>
    <Calendar
      localizer={localizer}
      events={CreateEventsFromAppointments(appointments)}
      startAccessor="start"
      endAccessor="end"
      style={{ height: 500 }}
    />
  </div>
);

export default MyCalendar;
