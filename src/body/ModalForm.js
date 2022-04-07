import {Button, Col, Form, Modal} from "react-bootstrap";
import {useState} from "react";
import React from "react";
import * as yup from "yup";
import {Formik} from "formik";
import {useKeycloak} from "@react-keycloak/web";

export function ModalForm() {
    const [show, setShow] = useState(false);
    const keycloak = useKeycloak().keycloak

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const submit = (e) => fetch('/translator', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
            'Authorization': `Bearer ${keycloak.token}`,
        },
        body: JSON.stringify(e)
    }).then()

    const schema = yup.object().shape({
        serviceName: yup.string().required().min(3),
        translatorType: yup.string().required(),
        endPoint: yup.string().url().required(),
        itemsPerRequest: yup.number().positive().integer()
    });

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                New Translator
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>New Translator</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Formik
                        validationSchema={schema}
                        onSubmit={e => {
                            submit(e).then();
                            handleClose()
                        }}
                        initialValues={{
                            serviceName: 'test',
                            translatorType: 'DWCA',
                            endPoint: 'http://end.nl',
                            query: '',
                            itemsPerRequest: '500',
                        }}
                    >
                        {({
                              handleSubmit,
                              handleChange,
                              handleBlur,
                              values,
                              touched,
                              errors
                          }) => (
                            <Form noValidate onSubmit={handleSubmit}>
                                <Form.Group as={Col} md="4" controlId="validationFormik01">
                                    <Form.Label>Service Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="serviceName"
                                        value={values.serviceName}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        isInvalid={touched.serviceName && !!errors.serviceName}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.serviceName}
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group as={Col} md="4" controlId="validationFormik02">
                                    <Form.Label>Translator Type</Form.Label>
                                    <Form.Select
                                        type="text"
                                        name="translatorType"
                                        value={values.translatorType}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        isInvalid={touched.translatorType && !!errors.translatorType}
                                    >
                                        <option>DWCA</option>
                                        <option>GEOCASE</option>
                                        <option>BIOCASE</option>
                                    </Form.Select>
                                    <Form.Control.Feedback type="invalid">
                                        {errors.translatorType}
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group as={Col} md="6" controlId="validationFormik03">
                                    <Form.Label>EndPoint</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="endPoint"
                                        value={values.endPoint}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        isInvalid={touched.endPoint && !!errors.endPoint}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.endPoint}
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group as={Col} md="6" controlId="validationFormik04">
                                    <Form.Label>Query</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="query"
                                        value={values.query}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                                <Form.Group as={Col} md="6" controlId="validationFormik05">
                                    <Form.Label>Items per request</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="itemsPerRequest"
                                        value={values.itemsPerRequest}
                                        onChange={handleChange}
                                        isInvalid={!!errors.itemsPerRequest}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.itemsPerRequest}
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Button type="submit">Submit form</Button>
                            </Form>
                        )}
                    </Formik>
                </Modal.Body>
            </Modal>
        </>
    );
}