import React, { useState, useEffect, useCallback, useContext, useRef } from 'react';
import { MainCont, IconWrapper } from '../../style/globalStyles.js';
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
  FormButton
} from '../../style/guestStyle.js';
import { checkEmail } from '../../hooks/checkEmail.js';
import { BsFillPersonFill } from 'react-icons/bs';
import { IoIosCheckmarkCircleOutline } from 'react-icons/io';
import { AiFillLock, AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { AppContext } from '../../contextItem.js';
/* eslint-disable */

const LoginPage = () => {
  const { token, setToken } = useContext(AppContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  //for testing purposes
  //const [email, setEmail] = useState('test@rapptrlabs.com')
  //const [password, setPassword] = useState('Test123')

  const [validEmail, setValidEmail] = useState(false);
  const [validForm, setValidForm] = useState(false);
  const [hiddenPassword, setHiddenPass] = useState(true);

  //Tracks whether use has typed into the input or not.
  const [emailFirstTouch, setEmailTouch] = useState(false);
  const [passwordFirstTouch, setPassTouch] = useState(false);

  //useState objects for displaying the errors
  const [emailError, setEmailError] = useState('');
  const [passError, setPassError] = useState('');
  const [submissionError, setSubmissionError] = useState('');

  var LoginRef = useRef();
  var FormElement = document.getElementById('MyForm');

  const handleEmail = (event) => {
    var userinput = event.target.value;
    if (userinput.length <= 50) setEmail(userinput);
  };

  const handlePass = (event) => {
    var userinput = event.target.value;
    if (userinput.length <= 16) setPassword(event.target.value);
  };

  //Toggles the visibility of the password
  const TogglePassword = () => {
    setHiddenPass((prev) => !prev);
  };

  //checks the validity of the form
  const checkValidity = () => {
    setEmailError('');
    setPassError('');
    setSubmissionError('');
    var isValid = true;

    //if the user has interacted with the email field, run the following code
    if (emailFirstTouch) {
      if (email.length === 0) {
        setEmailError('The email field cannot be empty.');
      } else if (email.length > 0 && !checkEmail(email)) {
        isValid = false;
        setEmailError('Not a valid email');
      }
    }
    //if the user has interacted with the password field, run the following code
    if (passwordFirstTouch) {
      if (password.length < 4) {
        isValid = false;
        setPassError('Your password should be at least 4 characters');
      }
    }
    setValidForm(isValid);
  };

  //method for handling the submission of the login form
  const handleSubmit = useCallback(async () => {
      var isValid = true;
      if (email.length === 0) {
        isValid = false;
      }

      if (password.length < 4) {
        isValid = false;
      }

      //If email and passwords are valid, execute the following
      if (isValid) {
        const formData = new FormData(FormElement);
        const payload = new URLSearchParams(formData);

        await fetch('http://dev.rapptrlabs.com/Tests/scripts/user-login.php', {
          method: 'POST',
          body: payload
        })
          .then((response) => response.json())
          .then((response) => {
            if (response.code == 'Error') {
              setSubmissionError(response.message);
            } else {
              setSubmissionError('');
            }
            var newToken = JSON.stringify(response.user_token);
            setToken(newToken);
            localStorage.setItem('token', newToken);
            console.log(response);
          })
          .catch((e) => {
            console.log(e);
          });
      }
    }, [email, password]);

  //This method allows the user to type the enter key to submit the form.
  const enterKeyEvent = (e) => {
    FormElement = document.getElementById('MyForm');
    e.preventDefault();
    if (token === null && e.key === 'Enter') {
      e.preventDefault();
      handleSubmit();
    }
    e.stopImmediatePropagation();
  };

  //As the user types on the email field, the app constantly checks its validity
  useEffect(() => {
    if (checkEmail(email)) {
      setValidEmail(true);
    } else {
      setValidEmail(false);
    }

    if (email.length !== 0) {
      setEmailTouch(true);
    } else {
      setEmailTouch(false);
    }
  }, [email]);

  useEffect(() => {
    if (password.length !== 0) {
      setPassTouch(true);
    } else {
      setPassTouch(false);
    }
  }, [password]);

  //As the user types on the password and email field, the app checks their validity
  useEffect(() => {
    checkValidity();
    if (password.length === 16) {
      setPassError('The password cannot be more than 16 characters.');
    }
    if (email.length === 50) {
      setEmailError('Your email cannot be more than 50 characters.');
    }
  }, [email, password]);

  useEffect(() => {
    FormElement = document.getElementById('MyForm');
    document.addEventListener('keyup', enterKeyEvent);

    return () => document.removeEventListener('keyup', enterKeyEvent);
  }, []);

  return (
    <MainCont ref={LoginRef} className="MainCont">
      <Shell>
        <Title>Rapptr Labs</Title>
        <Form
          id="MyForm"
          onSubmit={(e) => {
            e.preventDefault();
            console.log('submitted');
            handleSubmit();
          }}
        >
          <InputField>
            <SubTitle>Email</SubTitle>
            <InputWrapper
              id="InputWrapper"
              Border={emailError.length !== 0 ? '3px solid #da1839' : '1px solid #000000'}
            >
              <IconWrapper>
                <BsFillPersonFill />
              </IconWrapper>
              <Input
                name="email"
                type="text"
                placeholder="user@rapptrilabs.com"
                value={email}
                onChange={(evt) => {
                  handleEmail(evt);
                }}
              />
              <IconWrapper>
                {validEmail ? (
                  <GreenCheckMarkWrapper>
                    <IoIosCheckmarkCircleOutline />
                  </GreenCheckMarkWrapper>
                ) : null}
              </IconWrapper>
            </InputWrapper>
            <ErrorField>
              {emailError.length !== 0 && (
                <ErrorMessage className="loginError">{emailError}</ErrorMessage>
              )}
            </ErrorField>
          </InputField>
          <InputField>
            <SubTitle>Password</SubTitle>
            <InputWrapper
              id="InputWrapper"
              Border={passError.length !== 0 ? '3px solid #da1839' : '1px solid #000000'}
            >
              <IconWrapper>
                <AiFillLock />
              </IconWrapper>
              <Input
                name="password"
                type={hiddenPassword ? 'password' : 'text'}
                placeholder="Must be at least 4 characters"
                value={password}
                onChange={(evt) => handlePass(evt)}
              />
              <IconWrapper onClick={TogglePassword} id="visibilityIcon">
                {hiddenPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
              </IconWrapper>
            </InputWrapper>
            <ErrorField>
              {passError.length !== 0 && (
                <ErrorMessage className="loginError">{passError}</ErrorMessage>
              )}
            </ErrorField>
          </InputField>
          <FormButton
            type="submit"
            value="Login"
            Opacity={validForm ? '1.0' : '0.5'}
            BackgroundColor="#648046"
            Color="#fff"
            Transform={validForm ? 'translateX(5px) translateY(5px)' : 'none'}
          ></FormButton>
          <ErrorField>
            {submissionError !== '' && (
              <ErrorMessage className="loginError">{submissionError}</ErrorMessage>
            )}
          </ErrorField>
        </Form>
      </Shell>
    </MainCont>
  );
};

export default LoginPage;
