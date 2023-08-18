"use client"
import React, { useEffect, useState } from "react";
import { Formik, ErrorMessage, Field, FieldArray } from 'formik';
import * as Yup from 'yup';
import { saveAppointment } from "../../../utils/ApiCalls";


const CreateAppointment = ({ doctors = [], patients = [], appointment = {} }) => {

    const [doctor, selectDoctor] = useState("");
    const [patient, selectPatient] = useState("");

    useEffect(() => { }, [doctors, patients]);

    return (
        <div className="tw-bg-slate-100 tw-shadow-lg tw-grid">

            <p className="tw-text-2xl tw-justify-self-center">Create an Appointment</p>

            <Formik
                initialValues={appointment ?? {}}
                validationSchema={Yup.object().shape({

                    time: Yup.date().required("time is required"),
                    reference: Yup.string().max(1000).required('reference is required'),
                })}
                onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                    try {
                        console.log(values);
                        saveAppointment(values);
                        setStatus({ success: false });
                        setSubmitting(false);
                    } catch (err) {
                        console.error(err);
                        setStatus({ success: false });
                        setErrors({ submit: err.message });
                        setSubmitting(false);
                    }
                }}
            >
                {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                    < form noValidate onSubmit={handleSubmit}>
                        <div className='tw-p-6 tw-flex tw-flex-wrap ' container spacing={3}>
                            <div className='tw-h-12 tw-px-5  tw-w-[49%] tw-my-4'>
                                <label htmlFor="doctor-create">Doctor Body*</label>
                                <select className="tw-border-blue-600 tw-border tw-p-2 tw-mx-2" onChange={handleChange} id="doctor" name="doctor">
                                    {doctors && doctors.map((x) => <option value={x._id}>{`${x.firstName} ${x.lastName}`}</option>)}
                                </select>

                                {touched.doctor && errors.doctor && (
                                    <p error id="helper-text-doctor-create">
                                        {errors.doctor}
                                    </p>
                                )}
                            </div>

                            <div className='tw-h-12 tw-px-5 tw-w-[49%] tw-my-4'>
                                <label htmlFor="patient-create">Patient *</label>
                                <select onChange={handleChange} className="tw-border-blue-600 tw-border tw-p-2 tw-mx-2" id="patient" name="patient">
                                    {patients && patients.map((x) => <option value={x._id}>{`${x.firstName} ${x.lastName}`}</option>)}
                                </select>
                                {touched.patient && errors.patient && (
                                    <p error id="helper-text-patient-create">
                                        {errors.patient}
                                    </p>
                                )}
                            </div>

                            <div className='tw-h-12 tw-px-5 tw-w-[49%] tw-my-4'>
                                <label htmlFor="time-create">Time *</label>
                                <input className="tw-border-blue-600 tw-border tw-p-2 tw-mx-2"
                                    id="time-make"
                                    type="datetime-local"
                                    value={values.time}
                                    name="time"
                                    onChange={handleChange}
                                    placeholder="Time "
                                    fullWidth
                                    error={Boolean(touched.time && errors.time)}
                                />
                                {touched.time && errors.time && (
                                    <p error id="helper-text-time-create">
                                        {errors.time}
                                    </p>
                                )}
                            </div>


                            <div className='tw-h-12 tw-px-5 tw-w-[49%] tw-my-4'>
                                <label htmlFor="reference-create">Reference *</label>
                                <input className="tw-border-blue-600 tw-border tw-p-2 tw-mx-2"
                                    id="reference-make"
                                    type="text"
                                    multiline={true}
                                    maxRows={5}
                                    value={values.reference}
                                    name="reference"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    placeholder="reference "
                                    fullWidth
                                    error={Boolean(touched.reference && errors.reference)}
                                />
                                {touched.reference && errors.reference && (
                                    <p error id="helper-text-reference-create">
                                        {errors.reference}
                                    </p>
                                )}
                            </div>

                            <div className='tw-h-12 tw-px-5 tw-w-[49%] tw-my-4'>
                                <label htmlFor="recurrencePattern-create">recurrence type *</label>
                                <select className="tw-border-blue-600 tw-border tw-p-2 tw-mx-2" onChange={handleChange} id="recurrencePattern" name="recurrencePattern">
                                    <option value="NONE">Once</option>
                                    <option value="WEEK">Weeks</option>
                                    <option value="MONTH">Months</option>
                                </select>
                                {touched.recurrencePattern && errors.recurrencePattern && (
                                    <p error id="helper-text-recurrencePattern-create">
                                        {errors.recurrencePattern}
                                    </p>
                                )}
                            </div>

                            <div className='tw-h-12 tw-px-5 tw-w-[49%] tw-my-4'>
                                <label htmlFor="recurrencePatternLength-create">times *</label>
                                <input className="tw-border-blue-600 tw-border tw-p-2 tw-mx-2"
                                    id="recurrencePatternLength-make"
                                    type="number"
                                    value={values.recurrencePatternLength}
                                    name="recurrencePatternLength"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    placeholder="recurrencePatternLength "
                                    fullWidth
                                    error={Boolean(touched.recurrencePatternLength && errors.recurrencePatternLength)}
                                />
                                {touched.recurrencePatternLength && errors.recurrencePatternLength && (
                                    <p error id="helper-text-reference-create">
                                        {errors.recurrencePatternLength}
                                    </p>
                                )}
                            </div>

                            <div className='tw-h-12 tw-px-5 tw-w-[49%] tw-my-4'>
                                {/* <AnimateButton> */}
                                <button className="tw-rounded-md tw-bg-green-400 tw-text-black tw-border tw-p-2 tw-mx-2" type="submit" disableElevation disabled={isSubmitting} fullWidth size="large" variant="contained" color="primary">
                                    create Appointment
                                </button>
                                {/* </AnimateButton> */}
                            </div>
                        </div>
                    </form>
                )}
            </Formik >
        </div>
    )
}

export default CreateAppointment;
