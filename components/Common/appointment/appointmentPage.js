"use client"
import React, { useEffect, useState } from "react";
import { Formik, ErrorMessage, Field, FieldArray } from 'formik';
import * as Yup from 'yup';
import { saveAppointment } from "../../../utils/ApiCalls";
import DescriptionSelect from "../select/descriptionSelect";
import { useRouter } from "next/router";

const CreateAppointment = ({ doctors = [], patients = [] }) => {
    const router = useRouter();
    const selectDoctors = doctors.map((x) => {
        return ({ ...x, value: x._id, label: `${x.firstName} ${x.lastName}`, description: x.email })
    })

    const selectPatients = patients.map((x) => {
        return ({ ...x, value: x._id, label: `${x.firstName} ${x.lastName}`, description: x.email })
    })

    useEffect(() => { }, [doctors, patients]);

    return (
        <div className="tw-bg-slate-100 tw-shadow-lg tw-grid">

            <p className="tw-text-2xl tw-justify-self-center tw-mt-4">Create an Appointment</p>
            <Formik
                initialValues={{}}
                validationSchema={Yup.object().shape({
                    patient: Yup.string().required('patient is required'),
                    doctor: Yup.string().required('doctor is required'),
                    time: Yup.date().required("time is required"),
                    reference: Yup.string().max(1000).required('reference is required'),
                })}
                onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                    try {
                        console.log(values);
                        saveAppointment(values).then(() => {
                            router.push(`/dashboard`)
                        });
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
                                <label htmlFor="doctor-create">Doctor *</label>
                                <DescriptionSelect
                                    id="doctor"
                                    name="doctor"
                                    defaultValue={selectDoctors[0]}
                                    hideSelectedOptions
                                    theme="darker"
                                    onChange={(value) => { console.log(value) }}
                                    options={selectDoctors}
                                />
                            </div>
                            <div className='tw-h-12 tw-px-5  tw-w-[49%] tw-my-4'>
                                <label htmlFor="doctor-create">Patient *</label>
                                <DescriptionSelect
                                    id="patient"
                                    name="patient"
                                    defaultValue={selectPatients[0]}
                                    hideSelectedOptions
                                    theme="darker"
                                    onChange={(value) => { console.log(value) }}
                                    options={selectPatients}
                                />
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
