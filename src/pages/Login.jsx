import { Link } from "react-router-dom";

function Login() {
    return(
       <div className="login-page">
           <div className="login-card">
              <h1>Welcome Back   🎮</h1>
              <p>Login to your DJROCK account</p>

          <from>
            <input
                type="elmail"
                placeholder="Enter your email"
            />

            <input
                type="password"
                placeholder="Enter your password" 
            />

            <button type="Submit">
                login
            </button>
          </from>  

            <p className="login-register">
              Don't have any account?{" "}
         <Link to="/register">Register</Link>
        </p>
            </div>
         </div>
    );
}

export default Login;
       