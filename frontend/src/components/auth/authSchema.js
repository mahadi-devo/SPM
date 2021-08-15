import * as Yup from "yup";

export const SignupSchema = Yup.object().shape({
	name: Yup.string()
		.min(2, "Name is too Short!")
		.max(50, "Name is too Long!")
		.required("Name is required!"),
	email: Yup.string()
		.email("Please enter a valid email!")
		.required("Email is required!"),
	password: Yup.string()
		.min(4, "Password is too short - should be 4 chars minimum!")
		.required("Password is required"),
});
