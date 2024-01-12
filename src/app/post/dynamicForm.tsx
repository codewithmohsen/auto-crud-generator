"use client";
import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from 'yup';

type tForm = {
    field: string, type: string, value: string;
};
const DynamicForm = () => {
    let data = Array();
    const [form, setForm] = useState<tForm[]>([]);
    const formik = useFormik({
        initialValues: {},
        validationSchema: Yup.object({}),
        onSubmit: (values) => {
            try {
                console.log('Submitting Data:', values);
                formik.resetForm();
            }
            catch (error) {
                console.log('Error Submitting Data:', error);
            }

        }
    });

    function inputType(type: string) {
        switch (type) {
            case 'number':
                return 'number';
            case 'bigint':
                return 'number';
            case 'number':
                return 'checkbox';
            default:
                return 'text';
                break;
        }
    }
    useEffect(() => {
        const jsonToForm = async () => {
            try {
                const response = await fetch('https://jsonplaceholder.typicode.com/posts/1');
                const formSchema = await response.json();
                let tempForm: any[] = [];
                Object.keys(formSchema).forEach(function (key, index) {
                    let newElement = { "field": key, "type": inputType(typeof formSchema[key]), "value": formSchema[key] };
                    tempForm.push(newElement);
                });
                setForm(tempForm);
                formik.setValues(formSchema);
            } catch (error) {
                console.log('Error Fetching from Schema:', error);
            }
        };
        jsonToForm();
    }, []);

    return (
        <>
            <h1>Auto Crud Generator (by GetItem API)</h1>
            <h2>Create</h2>
            <form onSubmit={formik.handleSubmit}>
                {Object.keys(formik.errors).length > 0 && <div>Form has erros. Please correct them.</div>}
                {form.map((f, index) => (
                    f.field !== 'id' &&
                    <div key={index}>
                        <label htmlFor={f.field}>{f.field}</label>
                        <input
                            id={f.field}
                            type={f.type}
                        // {...formik.getFieldProps(f.field)}
                        />
                        {formik.touched[f.field as keyof typeof formik.touched] && formik.errors[f.field as keyof typeof formik.errors] && (
                            <div>{formik.errors[f.field as keyof typeof formik.errors]}</div>
                        )}
                    </div>
                ))}
                < button type="submit" disabled={formik.isSubmitting} >
                    {formik.isSubmitting ? 'Submitting...' : 'submit'}
                </button>
            </form >
            <h2>Update</h2>
            <form onSubmit={formik.handleSubmit}>
                {Object.keys(formik.errors).length > 0 && <div>Form has erros. Please correct them.</div>}
                {form.map((f, index) => (
                    <div key={index}>
                        <label htmlFor={f.field}>{f.field}</label>
                        <input
                            disabled={f.field === 'id' && true}
                            id={f.field}
                            type={f.type}
                            {...formik.getFieldProps(f.field)}
                        />
                        {formik.touched[f.field as keyof typeof formik.touched] && formik.errors[f.field as keyof typeof formik.errors] && (
                            <div>{formik.errors[f.field as keyof typeof formik.errors]}</div>
                        )}
                    </div>
                ))}
                < button type="submit" disabled={formik.isSubmitting} >
                    {formik.isSubmitting ? 'Submitting...' : 'submit'}
                </button>
            </form >
            <h2>Read</h2>
            <form onSubmit={formik.handleSubmit}>
                {Object.keys(formik.errors).length > 0 && <div>Form has erros. Please correct them.</div>}
                {form.map((f, index) => (
                    <div key={index}>
                        <label htmlFor={f.field}>{f.field}</label>
                        <input
                            disabled
                            id={f.field}
                            type={f.type}
                            {...formik.getFieldProps(f.field)}
                        />
                        {formik.touched[f.field as keyof typeof formik.touched] && formik.errors[f.field as keyof typeof formik.errors] && (
                            <div>{formik.errors[f.field as keyof typeof formik.errors]}</div>
                        )}
                    </div>
                ))}
                < button type="submit" disabled={formik.isSubmitting} >
                    {formik.isSubmitting ? 'Submitting...' : 'submit'}
                </button>
            </form >
            <h2>Delete</h2>
            <form onSubmit={formik.handleSubmit}>
                {Object.keys(formik.errors).length > 0 && <div>Form has erros. Please correct them.</div>}
                {form.map((f, index) => (
                    <div key={index}>
                        <label htmlFor={f.field}>{f.field}</label>
                        <input
                            id={f.field}
                            type={f.type}
                            {...formik.getFieldProps(f.field)}
                        />
                        {formik.touched[f.field as keyof typeof formik.touched] && formik.errors[f.field as keyof typeof formik.errors] && (
                            <div>{formik.errors[f.field as keyof typeof formik.errors]}</div>
                        )}
                    </div>
                ))}
                < button type="submit" disabled={formik.isSubmitting} >
                    {formik.isSubmitting ? 'Submitting...' : 'submit'}
                </button>
            </form >
        </>

    );
};
export default DynamicForm;