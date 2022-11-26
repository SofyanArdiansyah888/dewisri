import { Modal, ModalBody, ModalFooter, ModalHeader } from "@/base-components";
import { yupResolver } from "@hookform/resolvers/yup";
import classnames from "classnames";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useAuth } from "../../hooks/useAuth";
import { useChangePassword } from "../../hooks/useProfile";
const schema = yup
  .object({
    password: yup.string().required("Password Required").min(4),
    old_password: yup.string().required("Old Password Required").min(4),
    confirm_password: yup
      .string()
      .required("Confirm Password Required")
      .min(4)
      .oneOf([yup.ref("password")], "Passwords do not match"),
  })
  .required();

function ResetPassword({ modal, setModal }) {
  const navigate = useNavigate();
  const auth = useAuth();
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    setError
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  const handleSuccess = (data) => {
    reset(() => ({
      password: "",
      old_password: "",
      confirm_password: "",
    }));
    setModal(false);
    auth.logout();
  };

  const handleError = (error) => {
    setError('old_password',{
        message: error
    })
  };

  const { mutate } = useChangePassword(handleSuccess, handleError);

  return (
    <>
      <Modal
        show={modal}
        onHidden={() => {
          setModal(false);
        }}
      >
        <form
          className="validate-form"
          onSubmit={handleSubmit((data) => mutate({ ...data }))}
        >
          <ModalHeader>
            <h2 className="font-medium text-base mr-auto">Change Password</h2>
          </ModalHeader>
          <ModalBody className="grid grid-cols-12 gap-4 gap-y-3">
            <div className="col-span-12">
              <label htmlFor="old_password" className="form-label">
                Password Lama
              </label>
              <input
                {...register("old_password")}
                className={classnames({
                  "form-control": true,
                  "border-danger": errors.old_password,
                })}
                name="old_password"
                id="old_password"
                type="password"
              />
              {errors.old_password && (
                <div className="text-danger mt-2">
                  {errors.old_password.message}
                </div>
              )}
            </div>

            <div className="col-span-12">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                {...register("password")}
                className={classnames({
                  "form-control": true,
                  "border-danger": errors.password,
                })}
                name="password"
                id="password"
                type="password"
              />
              {errors.password && (
                <div className="text-danger mt-2">
                  {errors.password.message}
                </div>
              )}
            </div>

            <div className="col-span-12">
              <label htmlFor="confirm_password" className="form-label">
                Ulangi Password
              </label>
              <input
                {...register("confirm_password")}
                className={classnames({
                  "form-control": true,
                  "border-danger": errors.confirm_password,
                })}
                name="confirm_password"
                id="confirm_password"
                type="password"
              />
              {errors.confirm_password && (
                <div className="text-danger mt-2">
                  {errors.confirm_password.message}
                </div>
              )}
            </div>
          </ModalBody>
          <ModalFooter>
            <button
              type="button"
              onClick={() => {
                setModal(false);
              }}
              className="btn btn-outline-secondary w-20 mr-1"
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-primary w-20">
              Submit
            </button>
          </ModalFooter>
        </form>
      </Modal>
    </>
  );
}

export default ResetPassword;
