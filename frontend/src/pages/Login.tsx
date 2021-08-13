import { Formik, Field, Form } from "formik";
import { useHistory } from "react-router-dom";
import * as yup from "yup";
import { setAccessToken } from "../accessToken";
import { MeDocument, MeQuery, useLoginMutation } from "../generated/graphql";

const validationSchema = yup.object({
  username: yup.string().required().min(3),
  password: yup.string().required().min(8),
});

export function Login() {
  const [login, { client }] = useLoginMutation();
  const history = useHistory();

  async function onSubmit(data: any, { setSubmitting }: any) {
    setSubmitting(true);
    const response = await login({
      variables: {
        username: data.username,
        password: data.password,
      },
      update: (store, { data }) => {
        if (!data || !data?.login?.user) {
          return null;
        }
        store.writeQuery<MeQuery>({
          query: MeDocument,
          data: {
            me: {
              id: data.login.user.id,
              username: data.login.user.username,
              type: data.login.user.type,
            },
          },
        });
      },
    });

    if (response && response.data?.login.accessToken) {
      setAccessToken(response.data.login.accessToken);
    }

    await client!.resetStore();

    setSubmitting(false);

    history.push("/");
  }

  return (
    <div>
      <Formik
        initialValues={{ username: "", password: "" }}
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
            <button disabled={isSubmitting} type="submit">
              Login
            </button>
            <pre>{JSON.stringify(values, null, 2)}</pre>
            <pre>{JSON.stringify(errors, null, 2)}</pre>
          </Form>
        )}
      </Formik>
    </div>
  );
}
