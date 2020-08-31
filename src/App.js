import React, { useRef, useEffect } from 'react';
import * as Yup from 'yup';
import './App.css';

import { Form } from '@unform/web';
import { Scope } from '@unform/core';

import { Input } from './components/Form';

// const initialData = {
//   email: 'arturdeveloper1@gmail.com',
//   address: {
//     state: 'SP'
//   }
// };

function App() {
  const formRef = useRef(null);

  useEffect(() => {
    setTimeout(() => {
      formRef.current.setData({
        name: 'Artur',
        email: 'arturdeveloper1@gmail.com',
        address: {
          number: 169
        }
      })
    }, 2000);
  }, []);

  async function handleSubmit(data, { reset }) {
    try {
      const schema = Yup.object().shape({
        name: Yup.string().required('O nome é obrigatório'),
        email: Yup.string()
          .email('Digite um e-mail válido')
          .required('O e-mail é obrigatório'),
        address: Yup.object().shape({
          city: Yup.string()
            .min(3, 'No mínimo 3 caracteres')
            .required('A cidade é obrigatória'),
        }),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      formRef.current.setErrors({});
      reset();
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        console.log(err);
        const errorMessages = {};

        err.inner.forEach(error => {
          errorMessages[error.path] = error.message;
        });

        formRef.current.setErrors(errorMessages);
      };
    };

    console.log(data);
    // if (data.name === '') {
    //   formRef.current.setFieldError('name', 'Campo obrigatório!');
    // }

  };

  return (
    <div className="App">
      <h1>Unform - Rocketseat</h1>

      <Form
        // initialData={initialData}
        onSubmit={handleSubmit}
        ref={formRef}
      >
        <Input name="name" />
        <Input name="email" />
        <Input type="password" name="password" />

        <Scope path="address">
          <Input name="street" />
          <Input name="number" />
          <Input name="neighborhood" />
          <Input name="city" />
          <Input name="state" />
        </Scope>

        <button type="submit">Enviar</button>
      </Form>
    </div>
  );
}

export default App;
