import React, { useState } from 'react';
// import { useHttp } from '../../hooks/http.hook';

export const AuthPage = () => {
  // const { loading, error, request } = useHttp();

  const [form, setForm] = useState({
    email: '',
    password: ''
  });

  const changeHandler = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  }

  // const registerHandler = async () => {
  //   try {
  //     const data = await request('api/auth/register', 'POST', {...form});
  //     console.log('Data:', data)
  //   } catch (error) {
      
  //   }
  // }

  return (
    <div>
      <h1>Authentication</h1>
      <div className="card">
        <div className="card-body">
          <form>
            <div className="mb-3">
              <label htmlFor="input-email" className="form-label">Email address</label>
              <input
                type="email"
                className="form-control"
                id="input-email"
                aria-describedby="emailHelp"  
                name="email"
                onChange={changeHandler}
              />
              <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
            </div>

            <div className="mb-3">
              <label htmlFor="input-password" className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                id="input-password"
                name="password"
                onChange={changeHandler}
              />
            </div>

            <button
              className="btn btn-primary"
              type="submit"
              // disabled={loading}
            >
              Log in
            </button>

            <button
              className="btn btn-primary"
              type="submit"
              // onClick={registerHandler}
              // disabled={loading}
            >
              Sign up
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}