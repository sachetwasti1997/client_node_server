import axios from 'axios';
import { useState } from 'react';

export default ({ url, method, body, onSuccess }) => {
  const [errors, setErrors] = useState([]);

  const doRequest = async () => {
    try {
      setErrors(null);
      const resp = await axios[method](url, body);
      onSuccess(resp.data);
      return resp.data;
    } catch (error) {
      const errList = error.response.data.errors;
      setErrors(
        <div className="alert alert-danger">
          <h4>Oops....</h4>
          <ul className="my-0">
            {errList.map((err) => (
              <li key={err.message}>{err.message}</li>
            ))}
          </ul>
        </div>
      );
    }
  };

  return { doRequest, errors };
};
