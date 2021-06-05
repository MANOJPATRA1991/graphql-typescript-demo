import React, { FormEvent, useState } from 'react';

type AuthFormProps = {
  onSubmit: Function,
  errors: string[],
};

export const AuthForm = ({
  onSubmit,
  errors,
}: AuthFormProps) => {
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmitFn = (event: FormEvent) => {
    event?.preventDefault();
    onSubmit({ email, password });
  }

  return  (
    <div className="row">
      <form onSubmit={(e: FormEvent) => onSubmitFn(e)} className="col s6">
        <div className="input-field">
          <input 
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)} 
          />
        </div>
        <div className="input-field">
          <input 
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="errors">
          {errors.map((error) => <div key={error}>{error}</div>)}
        </div>

        <button className="btn">Submit</button>
      </form>
    </div>
  );
};