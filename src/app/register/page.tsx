"use client"
import RegisterForm from '@/Components/Auth/RegisterForm';
import Welcome from '@/Components/Auth/Welcome';
import React, { useState } from 'react';

const Register = () => {
    const [step, setStep] = useState(1);
    return (
        <div>
            {step === 1 ? <Welcome setStep={setStep}></Welcome> : <RegisterForm></RegisterForm>}
        </div>
    );
};

export default Register;