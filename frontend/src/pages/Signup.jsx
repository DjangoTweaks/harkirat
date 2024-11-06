import React from "react";
import { Heading } from "../components/Heading";
import { Label } from "../components/Label";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
export default function Signup() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const response = await axios
      .post("http://localhost:3000/api/v1/user/signup", {
        firstName: data.firstName,
        email: data.email,
        username: data.username,
        password: data.password,
      })
      .then((response) => {
        localStorage.setItem("token", response.data.token);
        navigate("/dashboard");
      })
      .catch((error) => console.log("error", error.response.data.msg));
  };

  return (
    <div>
      <div className="flex justify-center items-center bg-zinc-600 h-screen ">
        <div className="bg-gray-100 w-[400px] h-fit rounded-2xl ">
          <div className=" py-12  ">
            <Heading>Sign Up</Heading>
            <Label>Enter your information to create an account</Label>
            <div className="mt-8 flex flex-col gap-y-3">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="px-5">
                  <div className="font-semibold font-sans">First Name</div>
                  <div>
                    <input
                      {...register("firstName", { required: true })}
                      type="text"
                      placeholder="John"
                      className="w-full rounded-md border-[1px] border-gray-300 h-10 pl-2  mt-2"
                    ></input>
                  </div>
                  {errors.firstName && (
                    <span className="text-red-500">First Name is Required</span>
                  )}
                </div>

                <div className="px-5">
                  <div className="font-semibold font-sans">Username</div>
                  <div>
                    <input
                      {...register("username", { required: true })}
                      type="text"
                      placeholder="JohnDoe123"
                      className="w-full rounded-md border-[1px] border-gray-300 h-10 pl-2  mt-2"
                    ></input>
                  </div>
                  {errors.username && (
                    <span className="text-red-500">Username is Required</span>
                  )}
                </div>

                <div className="px-5">
                  <div className="font-semibold font-sans">Email</div>
                  <div>
                    <input
                      {...register("email", { required: true })}
                      type="email"
                      placeholder="JohnDoe@gmail.com"
                      className="w-full rounded-md border-[1px] border-gray-300 h-10 pl-2  mt-2"
                    ></input>
                  </div>

                  {errors.email && (
                    <span className="text-red-500">Email is Required</span>
                  )}
                </div>

                <div className="px-5">
                  <div className="font-semibold font-sans">Password</div>
                  <div>
                    <input
                      type="password"
                      {...register("password", {
                        required: true,
                        minLength: 6,
                      })}
                      placeholder="*****"
                      className="w-full rounded-md border-[1px] border-gray-300 h-10 pl-2 mt-2"
                    ></input>
                    {errors.password && (
                      <span className="text-red-500">
                        Password Must Be Atleast 6 Characters Long
                      </span>
                    )}
                  </div>
                </div>
                <div className="mx-5 pt-6">
                  <input
                    type="submit"
                    className="text-white bg-black rounded-lg p-3 w-full hover:duration-150 hover:bg-gray-900 hover:cursor-pointer "
                  />
                </div>
              </form>

              <div className="text-center pt-2 font-semibold">
                Already have an account?{" "}
                <Link
                  to="/signin"
                  className="underline hover:cursor-pointer hover:text-gray-800 "
                >
                  Login
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
