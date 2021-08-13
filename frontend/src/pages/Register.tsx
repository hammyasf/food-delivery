import { Formik, Field, Form } from "formik";
import * as yup from "yup";
import { useRegisterMutation } from "../generated/graphql";

const validationSchema = yup.object({
  username: yup.string().required().min(3),
  password: yup.string().required().min(8),
  confirm_password: yup
    .string()
    .required()
    .oneOf([yup.ref("password"), null]),
});

export function Register() {
  const [register] = useRegisterMutation();

  async function onSubmit(data: any, { setSubmitting }: any) {
    setSubmitting(true);
    const response = await register({
      variables: {
        username: data.username,
        password: data.password,
      },
    });
    console.log({ response });
    setSubmitting(false);
  }

  return (
    <div>
      <Formik
        initialValues={{ username: "", password: "", confirm_password: "" }}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ values, isSubmitting, errors }) => (
          <Form>
            <Field name="username" type="input" placeholder="Username"></Field>
            <Field
              name="password"
              type="password"
              placeholder="Password"
            ></Field>
            <Field
              name="confirm_password"
              type="password"
              placeholder="Confirm Password"
            ></Field>
            <button disabled={isSubmitting} type="submit">
              Register
            </button>
            <pre>{JSON.stringify(values, null, 2)}</pre>
            <pre>{JSON.stringify(errors, null, 2)}</pre>
          </Form>
        )}
      </Formik>
    </div>
  );
}
