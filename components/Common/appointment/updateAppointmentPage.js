
import React, { useEffect, useState } from "react";
import { Formik, ErrorMessage, Field, FieldArray } from 'formik';
import * as Yup from 'yup';
import { saveAppointment, updateAppointment } from "../../../utils/ApiCalls";
import DescriptionSelect from "../select/descriptionSelect";
import { useRouter } from "next/router";


const UpdateAppointment = ({ doctors = [], patients = [], appointment }) => {
    const router = useRouter();
    const selectDoctors = doctors.map((x) => {
        return ({ ...x, value: x._id, label: `${x.firstName} ${x.lastName}`, description: x.email })
    })

    const selectPatients = patients.map((x) => {
        return ({ ...x, value: x._id, label: `${x.firstName} ${x.lastName}`, description: x.email })
    })

    // const { createdAt, updatedAt, status, _v, _id, ...rest } = appointment;
    useEffect(() => { }, [appointment]);

    return (
        <div className="tw-bg-slate-100 tw-shadow-lg tw-grid">

            <p className="tw-text-2xl tw-justify-self-center tw-mt-4">Update an Appointment</p>
            <Formik
                initialValues={{
                    ...appointment
                }}
                enableReinitialize
                validationSchema={Yup.object().shape({
                    patient: Yup.string().required('patient is required'),
                    doctor: Yup.string().required('doctor is required'),
                    time: Yup.date().required("time is required"),
                    reference: Yup.string().max(1000).required('reference is required'),
                })}
                onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                    try {
                        console.log(values);
                        updateAppointment(values, appointment._id).then(() => {
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
                                    hideSelectedOptions
                                    theme="darker"
                                    value={selectDoctors.find((e) => e.value === values.doctor)}
                                    onChange={handleChange}
                                    options={selectDoctors}
                                />
                            </div>
                            <div className='tw-h-12 tw-px-5  tw-w-[49%] tw-my-4'>
                                <label htmlFor="doctor-create">Patient *</label>
                                <DescriptionSelect
                                    id="patient"
                                    name="patient"
                                    hideSelectedOptions
                                    theme="darker"
                                    value={selectPatients.find((e) => e.value === values.patient)}
                                    onChange={handleChange}
                                    options={selectPatients}
                                />
                            </div>
                            <div className='tw-h-12 tw-px-5 tw-w-[49%] tw-my-4'>
                                <label htmlFor="time-create">Time *</label>
                                {console.log(values.time)}
                                <input className="tw-border-blue-600 tw-border tw-p-2 tw-mx-2"
                                    id="time-make"
                                    type="datetime-local"
                                    // value={values.time}
                                    defaultValue={values.time}
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
                                    defaultValue={values.reference}
                                />
                                {touched.reference && errors.reference && (
                                    <p error id="helper-text-reference-create">
                                        {errors.reference}
                                    </p>
                                )}
                            </div>

                            <div className='tw-h-12 tw-px-5 tw-w-[49%] tw-my-4'>
                                {/* <AnimateButton> */}
                                <button className="tw-rounded-md tw-bg-green-400 tw-text-black tw-border tw-p-2 tw-mx-2" type="submit" disableElevation disabled={isSubmitting} fullWidth size="large" variant="contained" color="primary">
                                    Update Appointment
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

export default UpdateAppointment;