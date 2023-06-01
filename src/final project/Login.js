import React, { useState } from "react";
import './cssFiles/login.css';
import { useForm } from "react-hook-form";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { Link } from "react-router-dom";
import { urlUsers, urlAdmins } from "./endpoints.ts";
import { pushNewUser } from "./redax/actions/usersActions";
import img1 from './images/לוגו.jpg';
import { Header } from "./Header";
import { setTokens } from "./TockenService";

export function Login() {
    const navigate = useNavigate();
    const [checked, setChecked] = useState(false);
    const [UserAuthentication, setUserAuthentication] = useState(true);

    const dispatch = useDispatch();

    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    const handleRegistration = async (d) => {
        debugger
        let url = "";
        url = checked ? urlAdmins : urlUsers;
        await axios.post(url + "/authenticate", d)
            .then((response) => {
                if (response.status < 300) {
                    debugger
                    const userData = response.data.user;
                    dispatch(pushNewUser(userData));
                    setTokens(response.data.token);
                    url == urlAdmins ? navigate("/orders"):navigate("/home-page");
                }
                else {
                    setUserAuthentication(false);
                    console.log("the http request faild");
                }
            })
            .catch((error) => setUserAuthentication(false));
    }

    const registerOptions = {
        email: { required: "Email is required" },
        password: {
            required: "Password is required",
        }
    };

    return (
        <>
            <Header></Header>
            <section class="vh-100" style={{ "backgroundColor": "#9A616D", "width": "80%", "margin": "auto" }}>
                <div class="container py-5 h-100">
                    <div class="row d-flex justify-content-center align-items-center h-100">
                        <div class="col col-xl-10">
                            <div class="card" style={{ "border-radius": "1rem" }}>
                                <div class="row g-0">
                                    <div class="col-md-6 col-lg-5 d-none d-md-block">
                                        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/img1.webp"
                                            alt="login form" class="img-fluid" style={{ "border-radius": "1rem 0 0 1rem" }} />
                                    </div>
                                    <div class="col-md-6 col-lg-7 d-flex align-items-center">
                                        <div class="card-body p-4 p-lg-5 text-black">

                                            <form onSubmit={handleSubmit(handleRegistration)}>

                                                <div class="d-flex align-items-center mb-3 pb-1">
                                                    <i class="fas fa-cubes fa-2x me-3" style={{ "color": "#ff6219" }}></i>
                                                    <img width={"30%"} src={img1}></img>
                                                </div>

                                                <h5 class="fw-normal mb-3 pb-3" style={{ "letter-spacing": "1px" }}>הכנס לחשבונך</h5>

                                                <div class="form-outline mb-4">
                                                    <input id="form2Example17" class="form-control form-control-lg"
                                                        type="email"
                                                        name="email"
                                                        {...register('email', registerOptions.email)}
                                                    />
                                                    <small className="text-danger">
                                                        {errors?.email && errors.email.message}
                                                    </small>
                                                    <label class="form-label" for="form2Example17">כתובת מייל</label>
                                                </div>

                                                <div class="form-outline mb-4">
                                                    <input id="form2Example27" class="form-control form-control-lg"
                                                        type="password"
                                                        name="password"
                                                        {...register('password', registerOptions.password)}
                                                    />
                                                    <small className="text-danger">
                                                        {errors?.password && errors.password.message}
                                                    </small>
                                                    <label class="form-label" for="form2Example27">סיסמה</label>
                                                    <div dir="rtl" class="form-check">
                                                        <div style={{"display" :"flex"}}>
                                                        <input class="form-check-input" type="checkbox" value="" id="defaultCheck1" onChange={() => {
                                                            setChecked(true);
                                                        }}/>
                                                        <label class="form-check-label" style={{"marginRight": "19px"}} for="defaultCheck1">הכנס כמנהל</label>
                                                        </div></div>
                                                </div>
                                                <div class="pt-1 mb-4">
                                                    <button class="btn btn-dark btn-lg btn-block">Login</button>
                                                    {UserAuthentication == false &&
                                                        <small className="text-danger">
                                                            שם משתמש או סיסמא שגויים, נסה שוב
                                                        </small>}
                                                </div>

                                                {/* <a class="small text-muted" href="#!">Forgot password?</a> */}
                                                <p class="mb-5 pb-lg-2" style={{ "color": "#393f81" }}>אין לך חשבון?<Link to="Signup">הרשם כאן</Link></p>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}