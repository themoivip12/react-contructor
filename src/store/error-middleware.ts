const getErrorMessage = (errorData: any) => {
  let { message } = errorData;
  if (errorData.fieldErrors) {
    errorData.fieldErrors.forEach((fErr: any) => {
      message += `\nfield: ${fErr.field},  Object: ${fErr.objectName}, message: ${fErr.message}\n`;
    });
  }
  return message;
};

const errMiddlewareHandle = () => (next: any) => (action: any) => {
  const { error } = action;
  if (error) {
    console.error(
      `${action.type} caught at middleware with reason: ${JSON.stringify(
        error.message,
      )}.`,
    );
    if (error.response && error.response.data) {
      const message = getErrorMessage(error.response.data);
      console.error(`Actual cause: ${message}`);
    }
  }
  // Dispatch initial action
  return next(action);
};

export default errMiddlewareHandle;
