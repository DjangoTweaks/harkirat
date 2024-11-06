import React from "react";
import { Link } from "react-router-dom";

export default function Signin() {
  return (
    <div>
      <div className="flex justify-center items-center bg-zinc-600 h-screen ">
        <div className="bg-gray-100 w-[400px] h-fit rounded-2xl">
          <div className=" py-12  ">
            <div className="font-sans font-extrabold text-4xl text-center text-black">
              Sign In
            </div>
            <div className="text-center text-gray-600 font-sans text-lg font-medium pt-4">
              Enter your credentials to access this account
            </div>

            <div className="mt-8 flex flex-col gap-y-3">
              <div className="px-5">
                <div className="font-semibold font-sans">Email</div>
                <div>
                  <input
                    placeholder="JohnDoe@gmail.com"
                    className="w-full rounded-md border-[1px] border-gray-300 h-10 pl-2  mt-2"
                  ></input>
                </div>
              </div>
              <div className="px-5">
                <div className="font-semibold font-sans">Password</div>
                <div>
                  <input
                    placeholder="*****"
                    className="w-full rounded-md border-[1px] border-gray-300 h-10 pl-2 mt-2"
                  ></input>
                </div>
              </div>

              <div className="mx-5">
                <button className="text-white bg-black rounded-lg p-3 w-full hover:duration-150 hover:bg-gray-900  ">
                  Sign Up
                </button>
              </div>

              <div className="text-center pt-2 font-semibold">
                Don't have an account?
                <Link to="/signup">
                  <a className="underline hover:cursor-pointer hover:text-gray-800 ">
                    Sign Up
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
