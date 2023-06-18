import React from 'react'

const Signup = () => {
  return (
    <div className="container">
      <form>
  <div className="mb-3">
    <label htmlFor="name" className="form-label">Email address</label>
    <input type="text" className="form-control" id="name" name='name' aria-describedby="emailHelp" onChange={onchange}/>
  </div>
  <div className="mb-3">
    <label htmlFor="email" className="form-label">Email address</label>
    <input type="email" className="form-control" id="email" name='email' aria-describedby="emailHelp"onChange={onchange}/>
  </div>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  <div className="mb-3">
    <label htmlFor="password" className="form-label">Password</label>
    <input type="password" className="form-control" name="password" id="password"onChange={onchange}/>
  </div>
  <div className="mb-3">
    <label htmlFor="cpassword" className="form-label">Confirm Password</label>
    <input type="password" className="form-control" cname="password" id="cpassword"onChange={onchange}/>
  </div>
  <button type="submit" className="btn btn-primary">Submit</button>
</form>
    </div>
  )
}

export default Signup
