// import React from "react";
// import { useFormik } from "formik";
// import { loginSchema } from "../Schema/ValidationSchema";
// import ForgotPasswrod from "../Services/ForgotPassword.service";
// import { connect } from "react-redux";
// import { clearMessage, setErrMessage, setMessage } from "../Reducer/reducers";
// import * as yup from "yup";
// const ForgotPassword = ({ setMsg, setErrMsg, clearMsg, msg, errMsg }) => {
//   const handleSubmit = async (e) => {
//     console.log(e);
//     // const data = ForgotPasswrod.SendResetLink(Email);
//     // data.then((res) => {
//     // console.log(res.data);
//     // });
//   };
//   const formik = useFormik({
//     initialValue: { Email: "" },
//     validationSchema: yup.object({
//       Email: yup
//         .string()
//         .email("Enter valid email address")
//         .required("Email is required"),
//     }),
//     validateOnChange: true,
//     validateOnBlur: true,
//     onSubmit: handleSubmit,
//   });

//   return (
//     <>
//       <div>
//         <form onSubmit={formik.handleSubmit}>
//           <div className="form-group my-3">
//             <label htmlFor="exampleInputEmail1">Email address</label>
//             <input
//               type="email"
//               name="Email"
//               className="form-control"
//               id="exampleInputEmail1"
//               onBlur={formik.handleBlur}
//               onChange={formik.handleChange}
//               defaultValue={formik.values?.Email}
//             />
//             {formik.touched?.Email && formik.errors && formik.errors?.Email && (
//               <div className="alert alert-danger">{formik.errors?.Email}</div>
//             )}
//           </div>
//           <button
//             type="submit"
//             className="btn btn-primary"
//             disabled={!formik.isValid}>
//             Send Email
//           </button>
//         </form>
//       </div>
//     </>
//   );
// };

// const mapDispatchToProps = (dispatch) => {
//   return {
//     setMsg: (message) => dispatch(setMessage(message)),
//     setErrMsg: (message) => dispatch(setErrMessage(message)),
//     clearMsg: () => dispatch(clearMessage()),
//   };
// };
// const mapStateToProps = (state) => {
//   return {
//     msg: state.reducer.msg,
//     errMsg: state.reducer.errMsg,
//   };
// };

// export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";

import { clearMessage, setErrMessage, setMessage } from "../Reducer/reducers";

import { useFormik } from "formik";
import ForgotPasswrod from "../Services/ForgotPassword.service";
import * as yup from "yup";
const ForgotPassword = ({
  signin,
  errMsg,
  setErrMsg,
  msg,
  setMsg,
  clearMsg,
}) => {
  console.log("return Login");
  const navigate = useNavigate();
  const [confirmBox, setConfirmBox] = useState(false);
  const [errBox, setErrBox] = useState(false);
  const [email, setEmail] = useState("");
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      console.log(email);
      const data = await ForgotPasswrod.SendResetLink(
        JSON.stringify({ email })
      );
      console.log("102:>", data);
      if (data.status === 200) {
        setMsg(data.data.msg);
        setConfirmBox(true);
      }
      // setTimeout(() => {
      //   clearMsg();
      //   setConfirmBox(false);
      // }, 2000);
    } catch (ex) {
      console.log("117:>", ex);
      if (ex.response) {
        setErrBox(true);
        setErrMsg(ex.response.data.msg);
      } else {
        setErrBox(true);
        setErrMsg(ex.message);
      }
      setTimeout(() => {
        setErrMsg("");
        setErrBox(false);
        // formik.resetForm();
      }, 2000);
    }
  };

  // const formik = useFormik({
  //   initialValues: {
  //     Email: "",
  //   },
  //   validationSchema: yup.object({
  //     Email: yup
  //       .string()
  //       .email("Enter valid email address")
  //       .required("Email is required"),
  //   }),
  //   validateOnChange: true,
  //   validateOnBlur: true,
  //   onSubmit: handleSubmit,
  // });

  return (
    <>
      <div className="container p-2">
        {errBox && (
          <div className="alert alert-danger text-center fw-bold p-2">
            {errMsg}
          </div>
        )}
        {confirmBox && msg ? (
          <div className="alert alert-success text-center fw-bold">{msg}</div>
        ) : (
          // <form onSubmit={formik.handleSubmit}>
          //   <div className="form-group my-3">
          //     <label htmlFor="exampleInputEmail1">Email address</label>
          //     <input
          //       type="email"
          //       name="Email"
          //       className="form-control"
          //       id="exampleInputEmail1"
          //       onBlur={formik.handleBlur}
          //       onChange={formik.handleChange}
          //       defaultValue={formik.values.Email}
          //     />
          //     {formik.touched.Email && formik.errors && formik.errors.Email && (
          //       <div className="alert alert-danger">{formik.errors.Email}</div>
          //     )}
          //   </div>
          //   <button
          //     type="submit"
          //     className="btn btn-primary"
          //     disabled={!formik.isValid}>
          //     Send Email
          //   </button>
          // </form>
          <form onSubmit={handleSubmit}>
            <div className="form-group my-3">
              <label htmlFor="exampleInputEmail1">Email address</label>
              <input
                type="email"
                name="Email"
                className="form-control"
                id="exampleInputEmail1"
                // onBlur={formik.handleBlur}
                onChange={(e) => setEmail(e.target.value)}
                defaultValue={email}
              />
              {/* {formik.touched.Email && formik.errors && formik.errors.Email && (
                <div className="alert alert-danger">{formik.errors.Email}</div>
              )} */}
            </div>
            <button type="submit" className="btn btn-primary">
              Send Email
            </button>
          </form>
        )}
      </div>
    </>
  );
};
const mapDispatchToProps = (dispatch) => {
  return {
    setMsg: (message) => dispatch(setMessage(message)),
    setErrMsg: (message) => dispatch(setErrMessage(message)),
    clearMsg: () => dispatch(clearMessage()),
  };
};
const mapStateToProps = (state) => {
  return {
    msg: state.reducer.msg,
    errMsg: state.reducer.errMsg,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);
