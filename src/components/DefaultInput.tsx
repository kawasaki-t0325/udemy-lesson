import React, { SFC } from 'react';
import { TextField, Typography } from '@material-ui/core';

interface IDefaultInput {
  autoComplete: string,
  name: string,
  type: string,
  id: string,
  label: string,
  value: string,
  handleChange: Function,
  message: string,
}

const DefaultInput: SFC<IDefaultInput> = ({ autoComplete, name, type, id, label, value, handleChange, message }) => {
  return (
    <React.Fragment>
      <TextField
        autoComplete={autoComplete}
        name={name}
        type={type}
        variant="outlined"
        required
        fullWidth
        id={id}
        label={label}
        value={value}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          handleChange(event);
        }}
      />
      {message && (
        <Typography style={{ color: 'red', marginTop: 5 }}>{message}</Typography>
      )}
    </React.Fragment>
  );
};

export default DefaultInput;