import { Link } from "react-router-dom";    

function Register() {
    return (
        <div className="register-page">
            <div className="register-card">
                <h1>Create Account 🎮 </h1>
                <p>Join the DJROCK gaming community</p>
            

            <form>
                <input
                  type="text"
                  placeholder="Entre your name"
                />            

                <input
                type="email"
                placeholder="Enter your email"
                />

                <input
                 type="password"
                 placeholder="Create your password"
                 />

                <input
                 type="password"
                 placeholder="Confirm your password"  
                 />

                 <button type="Submit">
                    Register
                 </button>
                  
                  </form>

                  <p className="register-login">
                     Already have an account?{" "}
                 <Link to="/login">Login</Link>
             </p>
        </div>
      </div>  
    );
}
export default Register;