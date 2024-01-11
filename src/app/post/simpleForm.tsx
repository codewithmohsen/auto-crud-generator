"use client";
import React from "react";
import { useFormik } from "formik";
import * as Yup from 'yup';

const SimpleForm = () => {
    const formik = useFormik({
        initialValues: {
            name: '',
            email: ''
        },
        validationSchema: Yup.object({
            name: Yup.string().required('Name is required'),
            email: Yup.string().email('Invalid email address')
        }),
        onSubmit: (values) => {
            console.log('Form Data:', values);
        }
    });
    return (
        <form onSubmit={formik.handleSubmit}>
            <label htmlFor="name">Name:</label>
            <input type="text"
                id="name"
                name="name"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
            />
            {formik.touched.name && formik.errors.name && <div>{formik.errors.name}</div>}
            <label htmlFor="email">email:</label>
            <input type="email"
                id="email"
                name="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
            />
            {formik.touched.email && formik.errors.email && <div>{formik.errors.email}</div>}
            <button type="submit">Submit</button>
        </form>
    );
};
export default SimpleForm;