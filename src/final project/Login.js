import React, { useState } from "react";
import './login.css';
import { useForm } from "react-hook-form";
import axios, { AxiosResponse } from 'axios';
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { Link } from "react-router-dom";
import { urlUsers } from "./endpoints.ts";
import { pushNewUser } from "./redax/actions/usersActions";


export function Login() {
    const navigate = useNavigate();
    // const user = useSelector((state) => state.usersReducer);
    const [UserAuthentication, setUserAuthentication] = useState(true);
    
    const dispatch = useDispatch();

    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    const func = async (detailsTovalidation) => {
        await axios.post(urlUsers, detailsTovalidation)
            .then((response) => {
               
                if (response.status < 300) {
                    const userData = response.data;
                    return userData;
                }
                else {
                    // setserverError(true);
                    console.log("the http request faild");

                }
            })
            .catch((error) => console.log(error));
    }

    const handleRegistration = async (d) => {
        debugger
        const result =await func(d);
        if (result != null) {
            dispatch(pushNewUser(result));
            navigate(`/home-page`);

        }
        else {
            setUserAuthentication(false);
        }
    }

    const registerOptions = {
        email: { required: "Email is required" },
        password: {
            required: "Password is required",
        }
    };

    return (
        <>
            <form className="form" onSubmit={handleSubmit(handleRegistration)}>
                <div class="form-outline mb-4">
                    <label class="form-label" for="form2Example1">Email</label>
                    <input id="form2Example1" class="form-control"
                        type="email"
                        name="email"
                        {...register('email', registerOptions.email)}
                    />
                    <small className="text-danger">
                        {errors?.email && errors.email.message}
                    </small>
                </div>

                <div class="form-outline mb-4">
                    <label class="form-label" for="form2Example2">Password</label>
                    <input id="form2Example2" class="form-control"
                        type="password"
                        name="password"
                        {...register('password', registerOptions.password)}
                    />
                    <small className="text-danger">
                        {errors?.password && errors.password.message}
                    </small>
                </div>
                <button class="btn btn-primary btn-block mb-4">Submit</button>
                {UserAuthentication == false &&
                    <small className="text-danger">
                        שם משתמש או סיסמא שגויים, נסה שוב
                    </small>}
                    <br></br>
                <Link to="Signup">משתמש חדש? הרשם כאן</Link>
            </form>

        </>
    );
}