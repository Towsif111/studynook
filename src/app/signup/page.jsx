"use client";

import { Card } from "@heroui/react";
import { Button, Description, FieldError, Form, Input, Label, TextField } from "@heroui/react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";


const SignUpPage = () => {
    const router = useRouter();

    const onSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const user = Object.fromEntries(formData.entries());

        const { data, error } = await authClient.signUp.email({
            email: user.email,
            password: user.password,
            name: user.name,
            image: user.image,
        });

        if (error) {
            toast.error(error?.message || "Sign up failed. Please try again.");
            return;
        }

        if (data) {
            toast.success("Account created successfully.");
            router.push("/");
        }


    };


    return (
        <div className="mx-auto max-w-7xl">
            <div className="text-center">
                <h1 className="font-bold text-3xl">Create Account</h1>
                <p>Join the StudyNook community</p>
            </div>
            <Card className="border">
                <Form onSubmit={onSubmit}
                    className="flex w-96 flex-col gap-4">

                        <TextField
                        isRequired
                        name="name"
                        type="text"
                        
                    >
                        <Label>Name</Label>
                        <Input placeholder="Enter your name" />
                        <FieldError />
                    </TextField>


                    <TextField
                        isRequired
                        name="email"
                        type="email"
                        validate={(value) => {
                            if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                                return "Please enter a valid email address";
                            }

                            return null;
                        }}
                    >
                        <Label>Email</Label>
                        <Input placeholder="admin@example.com" />
                        <FieldError />
                    </TextField>

                    <TextField
                        isRequired
                        name="image"
                        type="url"
                        
                    >
                        <Label>Image Url</Label>
                        <Input placeholder="image url" />
                        <FieldError />
                    </TextField>

                    <TextField
                        isRequired
                        minLength={6}
                        name="password"
                        type="password"
                        validate={(value) => {
                            if (value.length < 6) {
                                return "Password must be at least 8 characters";
                            }
                            if (!/[A-Z]/.test(value)) {
                                return "Password must contain at least one uppercase letter";
                            }
                            if (!/[0-9]/.test(value)) {
                                return "Password must contain at least one number";
                            }

                            return null;
                        }}
                    >
                        <Label>Password</Label>
                        <Input placeholder="Enter your password" />
                        <Description>Must be at least 6 characters with 1 uppercase and 1 number</Description>
                        <FieldError />
                    </TextField>

                    <div className="flex gap-2">
                        <Button className={'w-full'} type="submit">Create Account</Button>
                    </div>
                </Form>
            </Card>
        </div>
    );
};

export default SignUpPage;