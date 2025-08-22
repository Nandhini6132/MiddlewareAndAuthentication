'use client'

import React from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";

const CommonSkeleton = ({ value, onChange, controlItem, handleSignUpBtnDisable, handleLoginBtnDisable }) => {

    switch (controlItem.componentType) {
        case "input":
            return (
                <div>
                    <Label>{controlItem.label}</Label>
                    <Input
                        type={controlItem.type}
                        className="w-[500px] px-4  py-2 text-sm text-gray-700 placeholder-gray-500 border border-gray-300 rounded-md shadow-sm focus:outline-none sm:text-sm"
                        placeholder={controlItem.placeholder} onChange={onChange} value={value} name={controlItem.name}
                    />
                </div>

            );
            break;
        case "button":
            return (
                <Button disabled={handleSignUpBtnDisable ? !handleSignUpBtnDisable() : !handleLoginBtnDisable()}
                    type={controlItem.type}
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white  focus:outline-none  focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-85 "
                >
                    {controlItem.label}
                </Button>
            );
        default:
    }
};

export default CommonSkeleton;
