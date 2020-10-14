import React, { useState } from "react";
import addToMailchimp from "gatsby-plugin-mailchimp";

const NewsletterSection = () => {
  const [email, setEmail] = useState(null);
  const [status, setStatus] = useState({});
  const onChange = (e) => {
    e.target.setCustomValidity("");
    setEmail(e.target.value);
  };
  const onSubscribe = async (e) => {
    e.preventDefault();
    const result = await addToMailchimp(email);
    console.log("result", result);
    setStatus(result);
  };

  return (
    <div className="container mx-auto px-5 py-24 lg:flex">
      <div className="w-full lg:w-6/12">
        <h2 className="text-3xl text-left inline-block font-bold text-heading font-heading">
          Sign up for latest news and updates
        </h2>
        <p className="my-2">
          No spams and no nonsense mails. Just the sweet and hot news
        </p>
      </div>
      <form className="w-full lg:w-6/12 mt-2" onSubmit={onSubscribe}>
        <div className="flex items-center flex-wrap lg:flex-no-wrap">
          <input
            type="email"
            placeholder="user@email.com"
            className="w-full px-4 py-2 lg:mr-2  bg-gray-100  rounded-md border border-gray-400 focus:outline-none"
            onChange={onChange}
            required
            onInvalid={(e) =>
              e.target.setCustomValidity("Please enter valid email address")
            }
          />
          <button className="bg-secondary text-white px-5 py-2 mt-3 lg:mt-0 rounded shadow w-full lg:w-1/4 font-semibold">
            Notify
          </button>
        </div>
        {status.result === "error" && (
          <div
            dangerouslySetInnerHTML={{ __html: status.msg }}
            className="text-xs mt-2 px-4"
          ></div>
        )}
        {status.result === "success" && (
          <div className="text-xs mt-2 px-4">{status.msg}</div>
        )}
      </form>
    </div>
  );
};

export default NewsletterSection;
