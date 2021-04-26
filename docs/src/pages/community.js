import React from "react";
import Heading from "../components/common/heading";
import GeneralLayout from "../layouts/general.layout";

const CommunityPage = () => {
  const links = [
    {
      title: "Twitter",
      id: "@lesyjs",
      url: "https://twitter.com/lesyjs",
      desc: "Follow lesy handle in twitter for updates and share thoughts",
      icon: "ri-twitter-fill",
      color: "#1da1f2",
    },
    {
      title: "Facebook",
      id: "/lesyjs",
      url: "https://www.facebook.com/lesyjs",
      desc: "Join lesy community page in facebook",
      icon: "ri-facebook-circle-fill",
      color: "#3b5998",
    },
    {
      title: "Reddit",
      id: "r/lesyjs",
      url: "https://www.reddit.com/r/lesyjs/",
      desc: "Join lesy reddit page ",
      icon: "ri-reddit-fill",
      color: "#ff4500",
    },
    {
      title: "Stackoverflow",
      id: "#lesyjs",
      url: "https://stackoverflow.com/questions/tagged/lesyjs",
      desc: "Ask and get answers for all lesy related using the tag",
      icon: "ri-stack-overflow-fill",
      color: "#f48024",
    },
    {
      title: "Discord",
      id: "@lesyjs",
      url: "https://discord.com/channels/720063177156591646/720063177156591649",
      desc: "Join lesy channel in discord",
      icon: "ri-discord-fill",
      color: "#7289da",
    },
    {
      title: "Discussions",
      id: "lesyjs/discussions",
      url: "https://github.com/lokesh-coder/lesyjs/discussions",
      desc:
        " Join in the github project discussion to know more about the code, bug and features",
      icon: "ri-github-fill",
      color: "#333",
    },
  ];

  return (
    <GeneralLayout title="Community">
      <div className="container">
        <Heading
          title="Community"
          desc="Collaborate, discuss, and help each other"
        />
        <div className="mt-10 lg:flex lg:flex-wrap">
          {links.map(link => {
            return (
              <div className="flex items-start px-4 mb-8 lg:w-1/3">
                <i
                  className={`${link.icon} text-3xl mr-4`}
                  style={{ color: link.color }}
                />
                <div>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center text-xl font-medium text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary"
                  >
                    {link.title}
                    <span className="px-2 ml-2 text-sm font-medium rounded-md text-primary">
                      {link.id}
                    </span>
                  </a>
                  <p className="my-1 text-gray-500 dark:text-gray-400">
                    {link.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </GeneralLayout>
  );
};

export default CommunityPage;
