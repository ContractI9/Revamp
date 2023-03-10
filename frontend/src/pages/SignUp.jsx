import logo from "../Assets/Images/Logo.svg";
import userIcon from "../Assets/Images/userIcon.svg";
import PasswordField from "../components/Login-SignUp/PasswordField";
import SecondaryButton from "../components/UI/SecondaryButton";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import TextField from "../components/Login-SignUp/TextField";
import nameTag from "../Assets/Images/nameTag.svg";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { useNavigate } from "react-router-dom";
import Checkbox from "@mui/material/Checkbox";
function emailRegex(email) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

export default function SignUp() {
  const PasswordRef = useRef();
  const ConfirmPasswordRef = useRef();
  const UserNameRef = useRef();
  const EmailRef = useRef();
  const FirstNameRef = useRef();
  const LastNameRef = useRef();
  const [gender, setGender] = useState("male");
  const [emptyUserName, setEmptyUserName] = useState(false);
  const [emptyPassword, setEmptyPassword] = useState(false);
  const [emptyConfirmPassword, setEmptyConfirmPassword] = useState(false);
  const [emptyEmail, setEmptyEmail] = useState(false);
  const [emptyFirstName, setEmptyFirstName] = useState(false);
  const [emptyLastName, setEmptyLastName] = useState(false);
  const [warning, setWarning] = useState();
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [emailValid, setEmailValid] = useState(true);
  const [userNameValid, setUserNameValid] = useState(true);
  const [showPolicy, setShowPolicy] = useState(false);
  const navigate = useNavigate();

  const handleShowPolicy = () => {
    setShowPolicy(true);
  };
  const handleFadePolicy = () => {
    setShowPolicy(false);
  };

  const [checked, setChecked] = useState(true);
  const handleChange = (event) => {
    console.log(event.target.checked);
    setChecked(event.target.checked);
  };

  const genderChangeHandler = (e) => {
    setGender(e.target.value);
  };
  const GoogleLogin = (e) => {
    e.preventDefault();
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();

    if (UserNameRef.current.value === "") {
      setEmptyUserName(true);
      setWarning("please fill the following fields");
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    } else {
      setEmptyUserName(false);
    }
    if (PasswordRef.current.value === "") {
      setEmptyPassword(true);
      setWarning("please fill the following fields");
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    } else {
      setEmptyPassword(false);
    }
    if (ConfirmPasswordRef.current.value === "") {
      setEmptyConfirmPassword(true);
      setWarning("please fill the following fields");
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    } else {
      setEmptyConfirmPassword(false);
    }
    if (EmailRef.current.value === "") {
      setEmptyEmail(true);
      setWarning("please fill the following fields");
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    } else {
      setEmptyEmail(false);
    }
    if (FirstNameRef.current.value === "") {
      setEmptyFirstName(true);
      setWarning("please fill the following fields");
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    } else {
      setEmptyFirstName(false);
    }
    if (LastNameRef.current.value === "") {
      setEmptyLastName(true);
      setWarning("please fill the following fields");
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    } else {
      setEmptyLastName(false);
    }

    if (PasswordRef.current.value !== ConfirmPasswordRef.current.value) {
      setPasswordMatch(false);
      setWarning("passwords do not match");
      window.scrollTo(0, 0, "smooth");
    } else {
      setPasswordMatch(true);
    }
    if (emailRegex(EmailRef.current.value) === false) {
      setEmailValid(false);
      setWarning("please enter a valid email");
      window.scrollTo(0, 0, "smooth");
    } else {
      setEmailValid(true);
    }
    if (userNameValid === false) {
      setWarning("username already exists");
      window.scrollTo(0, 0, "smooth");
    } else {
      setUserNameValid(true);
    }

    if (
      emailValid === true &&
      passwordMatch === true &&
      emptyUserName === false &&
      emptyPassword === false &&
      emptyConfirmPassword === false &&
      emptyEmail === false &&
      emptyFirstName === false &&
      emptyLastName === false
    ) {
      const sentData = {
        userName: UserNameRef.current.value,
        password: PasswordRef.current.value,
        email: EmailRef.current.value,
        firstName: FirstNameRef.current.value,
        lastName: LastNameRef.current.value,
        gender: gender === "male" ? "Male" : "Female",
        role: "TRAINEE",
      };
      //console.log(sentData);
      console.log(
        emptyConfirmPassword,
        emptyEmail,
        emptyFirstName,
        emptyLastName,
        emptyPassword,
        emptyUserName,
        passwordMatch,
        emailValid,
        userNameValid
      );
      axios
        .post("http://localhost:3000/user/register", sentData)
        .then((res) => {
          console.log(res);
          setUserNameValid(true);
          navigate(`/login`, { state: res.data._id });
        })
        .catch((err) => {
          if (
            err.message.split(" ")[err.message.split(" ").length - 1] ===
              "400" &&
            UserNameRef.current.value !== ""
          ) {
            setUserNameValid(false);
          }
        });
    }

    return;

    //handle patch request
  };
  useEffect(() => {
  window.scrollTo(0, 0, "smooth");
  }, []);
  return (
    <div class="relative">
      <div class="antialiased ">
        <div class="max-w-lg mx-auto my-10 bg-white p-8 rounded-xl shadow shadow-slate-300">
          <div className="flex justify-center">
            <a href="https://flowbite.com/" className="flex items-center">
              <img
                src={logo}
                className=" md:mb-3 md:h-12 h-10 mb-1"
                alt="Flowbite Logo"
              />
              <span className="self-center text-2xl font-semibold whitespace-nowrap mt-4">
                evamp
              </span>
            </a>
          </div>
          <p class="text-center pt-3">
            Already Have An Account?{" "}
            <button
              onClick={() => {
                navigate("/login");
              }}
              class="text-primaryBlue hover:opacity-70 ease-in-out duration-300 font-medium inline-flex space-x-1 items-center"
            >
              <span>Sign In Now </span>
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </span>
            </button>
          </p>
          <hr className=" mt-3"></hr>

          <div
            class={
              emptyUserName ||
              emptyPassword ||
              emptyConfirmPassword ||
              emptyEmail ||
              emptyFirstName ||
              emptyLastName ||
              passwordMatch === false ||
              emailValid === false ||
              userNameValid === false
                ? "p-4 mt-3 text-red-900 bg-red-50 border rounded-md"
                : "hidden"
            }
          >
            <div class="flex justify-between flex-wrap">
              <div class="w-0 flex-1 flex">
                <div class="mr-3 pt-1">
                  <svg
                    width="26"
                    height="26"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                  >
                    <path d="M13.6086 3.247l8.1916 15.8c.0999.2.1998.5.1998.8 0 1-.7992 1.8-1.7982 1.8H3.7188c-.2997 0-.4995-.1-.7992-.2-.7992-.5-1.1988-1.5-.6993-2.4 5.3067-10.1184 8.0706-15.385 8.2915-15.8.3314-.6222.8681-.8886 1.4817-.897.6135-.008 1.273.2807 1.6151.897zM12 18.95c.718 0 1.3-.582 1.3-1.3 0-.718-.582-1.3-1.3-1.3-.718 0-1.3.582-1.3 1.3 0 .718.582 1.3 1.3 1.3zm-.8895-10.203v5.4c0 .5.4.9.9.9s.9-.4.9-.9v-5.3c0-.5-.4-.9-.9-.9s-.9.4-.9.8z"></path>
                  </svg>
                </div>
                <div>
                  <h4 class="text-md mt-[5px] leading-6 font-medium">
                    {warning}
                  </h4>
                </div>
              </div>
            </div>
          </div>

          <form action="" class="my-10">
            <div class="flex flex-col space-y-5">
              <div className="flex space-x-4">
                <TextField
                  label="First Name"
                  required="true"
                  icon={nameTag}
                  warning={emptyFirstName}
                  FieldRef={FirstNameRef}
                ></TextField>
                <TextField
                  label="Last Name"
                  required="true"
                  icon={nameTag}
                  warning={emptyLastName}
                  FieldRef={LastNameRef}
                ></TextField>
              </div>
              <FormControl>
                <FormLabel id="demo-controlled-radio-buttons-group">
                  Gender
                </FormLabel>
                <RadioGroup
                  aria-labelledby="demo-controlled-radio-buttons-group"
                  name="controlled-radio-buttons-group"
                  onChange={genderChangeHandler}
                  value={gender}
                  color="#74a0d1"
                >
                  <FormControlLabel
                    value="female"
                    control={<Radio />}
                    label="Female"
                    color="#74a0d1"
                  />
                  <FormControlLabel
                    value="male"
                    control={<Radio />}
                    label="Male"
                    color="#74a0d1"
                  />
                </RadioGroup>
              </FormControl>
              <TextField
                required="true"
                label="Email"
                placeholder={
                  !emailValid
                    ? "Enter a valid Email, eg. example@example.com"
                    : ""
                }
                FieldRef={EmailRef}
                warning={emptyEmail || !emailValid}
                className={!emailValid ? " placeholder:text-red-600" : ""}
                icon2={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-7 w-7 ml-3 text-gray-400 p-1"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                }
              ></TextField>

              <div className="relative">
                <label for="UserName">
                  <p class="font-medium text-slate-700 pb-2">Username *</p>
                  <div className="relative">
                    <input
                      ref={UserNameRef}
                      type="text"
                      class={"w-full py-3 border pl-12 border-slate-200 rounded-lg px-3 focus:outline-none focus:border-primaryBlue hover:shadow".concat(
                        emptyUserName || !userNameValid ? " border-red-200" : ""
                      )}
                      placeholder="Username"
                    />
                  </div>
                </label>
                <div class="absolute left-3 bottom-4 flex items-center">
                  <img src={userIcon} alt="userIcon" className="w-5 h-5" />
                </div>
              </div>

              <PasswordField
                PasswordRef={PasswordRef}
                label="Password"
                warning={emptyPassword || passwordMatch === false}
              />
              <PasswordField
                PasswordRef={ConfirmPasswordRef}
                label="Confirm Password"
                warning={emptyConfirmPassword || passwordMatch === false}
              />
              <div className="flex flex-row items-center ">
                <Checkbox
                  defaultChecked
                  checked={checked}
                  onChange={handleChange}
                  inputProps={{ "aria-label": "controlled" }}
                />
                <p class="text-center ">
                  Agree to our{" "}
                  <div
                    
                    class="text-primaryBlue hover:opacity-70 ease-in-out duration-300 font-medium inline-flex space-x-1 items-center cursor-pointer"
                  >
                    <span
                      onMouseEnter={handleShowPolicy}
                      onMouseLeave={handleFadePolicy}
                    >
                      terms and conditions{" "}
                    </span>
                  </div>
                  {" *"}
                </p>{" "}
                {showPolicy && 
                  <div class="ease-in-out duration-300 ">
                    <div class="antialiased absolute bottom-16 max-w-sm">
                      <div class=" mx-auto my-10 bg-white p-8 rounded-xl shadow shadow-slate-300">
                        <h1 className="font-medium flex justify-center"></h1>
                        <div className="flex flex-col justify-start mt-5">
                          <ul className="list-disc list-inside  ">
                            <li className="py-2 bg-slate-100 p-5 rounded-lg">
                              By accepting this policy you agree to that you won't show any harmful behavior on the website.
                            </li>
                            <li className="py-2 my-2 bg-slate-100 p-5 rounded-lg">
                            By accepting this policy you agree to that we collect certain information about your device, your interaction with the Site, and information necessary to process your purchases.
                            </li>
                            <li className="py-2 my-2 bg-slate-100 p-5 rounded-lg">
                            By accepting this policy you agree to that you can refund a course that you have purchased only if you have not exceed 50% of the content of the course .
                            </li>
                            
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                }
              </div>

              <SecondaryButton
                type="submit"
                className="flex space-x-2 items-center justify-center py-3 font-semibold hover: "
                text="Sign Up"
                onClick={checked ? onSubmitHandler : null}
                disabled={!checked}
              ></SecondaryButton>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
