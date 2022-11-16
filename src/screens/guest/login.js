import React, { useState, useEffect, useCallback, useContext, useRef } from 'react'; 
import { MainCont, IconWrapper, } from '../../components/globalStyles.js'; 
import {
    Shell,
    Form, 
    InputWrapper,
    Input,
    InputField, 
    ErrorField, 
    ErrorMessage,
    Title,
    SubTitle, 
    GreenCheckMarkWrapper,
    FormButton, 
} from './guestStyle.js'; 
import { checkEmail } from './checkEmail.js'; 
import { BsFillPersonFill } from 'react-icons/bs';
import { IoIosCheckmarkCircleOutline } from 'react-icons/io';
import {
    AiFillLock,
    AiOutlineEye,
    AiOutlineEyeInvisible
} from 'react-icons/ai';
import { AppContext } from "../../components/contextItem.js"; 

const LoginPage = () => {
    const {
        token,
        setToken
    } = useContext(AppContext)

    const [email, setEmail] = useState('test@rapptrlabs.com')
    const [password, setPassword] = useState('Test123')
    const [validEmail, setValidEmail] = useState(false)
    const [validForm, setValidForm] = useState(false);
    const [hiddenPassword, setHiddenPass] = useState(true);

    //Tracks whether use has typed into the input or not. 
    const [emailFirstTouch, setEmailTouch] = useState(false)
    const [passwordFirstTouch, setPassTouch] = useState(false)
    const [emailError, setEmailError] = useState('');
    const [passError, setPassError] = useState('');
    const [submissionError, setSubmissionError] = useState('');
    var LoginRef = useRef(); 
    var FormElement = document.getElementById('MyForm')

    const handleEmail = event => {
        setEmail(event.target.value);
    }

    const handlePass = event => {
        var userinput = event.target.value 
        if(userinput.length <= 16 )
            setPassword(event.target.value)
    }

    const TogglePassword = () => {
        setHiddenPass(prev => !prev);
    }

    //checks the validity of the form 
    const checkValidity = () => {
        setEmailError('')
        setPassError('')
        setSubmissionError('')
        var isValid = true;
        if (!checkEmail(email)) {
            isValid = false;
            if (emailFirstTouch) {
                setEmailError('Not a valid email')
            }
        }
        if (password.length < 4) {
            isValid = false;
            if (passwordFirstTouch) {
                setPassError('Your password should be at least 4 characters')
            }
        }
        setValidForm(isValid);
    }

    const handleSubmit = useCallback(async (e) => {
        var isValid = true;
        if (email.length === 0) {
            isValid = false;
            setEmailError("The email field cannot be empty.")
        }

        if (password.length < 4) {
            isValid = false;
            setPassError("Your password has to be at least 4 characters");
        }

        if (isValid) {
            const formData = new FormData(FormElement)
            const payload = new URLSearchParams(formData);
                
            await fetch("http://dev.rapptrlabs.com/Tests/scripts/user-login.php", {
                method: "POST",
                body: payload
            })
                .then(response => response.json())
                .then(response => {
                    if (response.code = "Error") {
                        setSubmissionError(response.message)
                    }
                    else {
                        setSubmissionError("")
                    }
                    var newToken = JSON.stringify(response.user_token); 
                    setToken(newToken)
                    localStorage.setItem("token", newToken )
                    console.log(response)
                })
                .catch(e => {
                    console.log(e)
                })
        }
        else {
            setSubmissionError("Please, fix the issues indicated above.")
        }
    }, [email, password])

    useEffect(() => {
        if (checkEmail(email)) {
            setValidEmail(true)
        }
        else {
            setValidEmail(false)
        }

        if (email.length !== 0) {
            setEmailTouch(true)
        }
        else {
            setEmailTouch(false)
        }
    }, [email])


    useEffect(() => {
        if (password.length !== 0) {
            setPassTouch(true)
        }
        else {
            setPassTouch(false)
        }
    }, [password])

    useEffect(() => {
        checkValidity();

        if (password.length === 16) {
            setPassError('The password cannot be more than 16 characters.')
        }
    }, [email, password])

    const enterKeyEvent = e => {
        FormElement = document.getElementById('MyForm')
        e.preventDefault();
        if (token === null && e.key === 'Enter') {
            e.preventDefault()
            handleSubmit();
        }
        e.stopImmediatePropagation();
    }
    useEffect(() => {
        FormElement = document.getElementById('MyForm')
        document.addEventListener("keyup", enterKeyEvent)

        return () => document.removeEventListener("keyup", enterKeyEvent);
       
    }, [])

    return (
        <MainCont ref={LoginRef} className = "MainCont">
            <Shell>
                <Title>Rapptr Labs</Title>
                <Form
                    id="MyForm"
                    onSubmit={(e) => {
                        e.preventDefault();
                        console.log("submitted")
                        handleSubmit();
                    }}
                >
                    <InputField>
                        <SubTitle>Email</SubTitle>
                        <InputWrapper>
                            <IconWrapper><BsFillPersonFill /></IconWrapper>
                            <Input
                                name="email"
                                type='text'
                                placeholder="user@rapptrilabs.com"
                                value={email}
                                onChange={(evt) => { handleEmail(evt) }}
                            />
                            <IconWrapper>
                                {validEmail ?
                                    <GreenCheckMarkWrapper><IoIosCheckmarkCircleOutline /></GreenCheckMarkWrapper>
                                    :
                                    null
                                }
                            </IconWrapper>
                        </InputWrapper>
                        <ErrorField>{emailError.length !== 0 &&
                            <ErrorMessage>{emailError}</ErrorMessage>}
                        </ErrorField>
                    </InputField>
                    <InputField>
                        <SubTitle>Password</SubTitle>
                        <InputWrapper>
                            <IconWrapper><AiFillLock /></IconWrapper>
                            <Input
                                name = 'password'
                                type={hiddenPassword ? "password" : "text"}
                                placeholder="Must be at least 4 characters"
                                value={password}
                                onChange={(evt)=>handlePass(evt)}
                            />
                            <IconWrapper onClick={TogglePassword} id = "visibilityIcon">
                                {hiddenPassword ?
                                    <AiOutlineEyeInvisible />
                                    :
                                    <AiOutlineEye />
                                }
                            </IconWrapper>
                        </InputWrapper>
                        <ErrorField>
                            {passError.length !== 0 &&
                                <ErrorMessage>{passError}</ErrorMessage>}
                        </ErrorField>
                    </InputField>
                    <FormButton
                        type="submit"
                        value = "Login"
                        Opacity={validForm ? "1.0" : "0.5"}
                        BackgroundColor="#3847d9"
                        Color="#fff"
                        Transform={validForm ? "translateX(5px) translateY(5px)" : "none"}
                    ></FormButton>
                    <ErrorField>
                        {submissionError !== "" &&
                            <ErrorMessage>{submissionError}</ErrorMessage>}
                    </ErrorField>
                </Form> 
            </Shell>
        </MainCont> 
        )
}

export default LoginPage; 