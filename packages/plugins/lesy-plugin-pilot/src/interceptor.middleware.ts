export default {
  on: "END",
  description: "Notify command ran status",
  run: (data: any) => {
    let message;
    if (data.error) {
      message = {
        status: "ERROR",
        title: "Error",
        details: `Throwed ${data.error.errno} error`,
      };
    } else {
      message = {
        status: "SUCCESS",
        title: "Success",
        details: "Command ran succesfully!",
      };
    }
    data.feature.socket.sendMessage({
      message,
      type: "notification",
    });
    return data;
  },
};
