import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import OAuth from "../components/OAuth";

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const [loding, setLoding] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.username || !formData.email || !formData.password) {
      return setErrorMessage("Please Fill Out All Fields");
    }
    try {
      setLoding(true)
      setErrorMessage(null)
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if(data.success === false)
      {
        return setErrorMessage("This User Is Already Registered")
      }
      setLoding(false)
      if(res.ok)
      {
        navigate('/sign-in')
      }
    } catch (e) {
      setErrorMessage(e.message)
      setLoding(false)

    }
  };

  return (
    <div className="min-h-screen mt-20">
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5">
        {/* left div */}

        <div className="flex-1">
          <Link to="/" className=" font-bold dark:text-white text-4xl">
            <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
              Shiv's
            </span>
            Blog
          </Link>
          <p className="text-md mt-5">
            This is a demo project. You can sign up with your email and password
            or with Google.
          </p>
        </div>

        {/* righj div */}
        <div className="flex-1">
          <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
            <div>
              <Label value="Your username" />
              <TextInput
                type="text"
                placeholder="Enter Username"
                id="username"
                onChange={handleChange}
              />
            </div>
            <div>
              <Label value="Your Email" />
              <TextInput
                type="email"
                placeholder="name@gmail.com"
                id="email"
                onChange={handleChange}
              />
            </div>
            <div>
              <Label value="Your Password" />
              <TextInput
                type="password"
                placeholder="Enter Password"
                id="password"
                onChange={handleChange}
              />
            </div>
            <Button gradientDuoTone="purpleToPink" type="submit" disabled={loding}>
             { loding ? (
              <>
              <Spinner size='sm'/>
              <span className="pl-3">Loading...</span>
              </>
             ) : 'Sign Up'
             }
            </Button>
            <OAuth/>
          </form>
          <div className="flex gap-2 mt-4">
            <span>Have an account? </span>
            <Link to="/sign-in" className="text-blue-600">
              Sign In
            </Link>
          </div>
          {errorMessage && <Alert className="mt-5" color='failure'>{errorMessage}</Alert>}
        </div>
      </div>
    </div>
  );
}
