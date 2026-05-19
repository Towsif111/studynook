"use client";

import { Card, Separator } from "@heroui/react";
import { Button, Description, FieldError, Form, Input, Label, TextField } from "@heroui/react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";


const LoginPage = () => {
    const router = useRouter();

    const onSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const user = Object.fromEntries(formData.entries());

        const { data, error } = await authClient.signIn.email({
            email: user.email,
            password: user.password,
        });

        if (error) {
            toast.error(error?.message || "Sign up failed. Please try again.");
            return;
        }

        if (data) {
            toast.success("Login successful.");
            router.push("/");
        }


    };

    const handleGoogleSignIn = async() => {
        await authClient.signIn.social ({
            provider: "google"
        });

        };


    return (
        <div className="mx-auto max-w-7xl pt-10">
            <div className="text-center">
                <h1 className="font-bold text-3xl">Login</h1>
                <p className="text-base">Welcome to StudyNook community</p>
            </div>
            <Card className="border p-8">
                <Form onSubmit={onSubmit}
                    className="flex w-[420px] flex-col gap-5">


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
                        <Button className={'w-full'} type="submit">Login</Button>
                    </div>
                </Form>

                <div className="flex justify-center items-center">
                                    <Separator/>
                                    <div className="whitespace-nowrap gap-3">
                                        Or Sign Up With
                                    </div>
                                    <Separator/>
                                    </div>
                                <div>
                                    <Button onClick={handleGoogleSignIn} className={'w-full rounded-none '}><FcGoogle />Sign in with Google</Button>
                                </div>
            </Card>
        </div>
    );
};

export default LoginPage;