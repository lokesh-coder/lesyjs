import React, { useState } from "react";
import addToMailchimp from "gatsby-plugin-mailchimp";

const Newsletter = () => {
  const [email, setEmail] = useState(null);
  const [status, setStatus] = useState({});
  const onChange = e => {
    e.target.setCustomValidity("");
    setEmail(e.target.value);
  };
  const onSubscribe = async e => {
    e.preventDefault();
    const result = await addToMailchimp(email);
    setStatus(result);
  };

  return (
    <div className="p-4 text-center bg-transparent lg:p-16 ">
      <h2 className="inline-flex items-center mb-0 text-2xl font-extrabold leading-none tracking-tighter text-steel-800 font-text-4xl text-heading lg:text-4xl dark:text-gray-300">
        <i className="mr-2 font-normal text-green-500 ri-mail-open-line " />
        Subscribe for latest news
      </h2>
      <p className="mt-0 mb-5 text-sm text-gray-500 dark:text-gray-400">
        We wont send you spams or any nonsense mails!
      </p>
      <form className="flex justify-center" onSubmit={onSubscribe}>
        <div className="flex w-full p-2 bg-white border border-gray-200 rounded-lg lg:w-1/2 dark:bg-gray-800 dark:border-gray-600">
          <input
            className="flex-1 w-full p-2 text-gray-600 bg-transparent outline-none dark:text-gray-400 md:w-auto"
            placeholder="user@email.com"
            type="email"
            onChange={onChange}
            required
            onInvalid={e =>
              e.target.setCustomValidity("Please enter valid email address")
            }
          />
          <button className="px-5 py-2 text-base font-semibold text-gray-100 rounded-md bg-secondary hover:bg-primary ">
            Subscribe
          </button>
        </div>
      </form>
      {status.result === "error" && (
        <div
          dangerouslySetInnerHTML={{ __html: status.msg }}
          className="px-4 mt-2 text-sm text-red-500"
        ></div>
      )}
      {status.result === "success" && (
        <div className="px-4 mt-2 text-sm text-green-500">{status.msg}</div>
      )}
    </div>
  );
};

export default Newsletter;
