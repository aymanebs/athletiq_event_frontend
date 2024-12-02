import { useForm } from "react-hook-form";
import errorIcon from "/icons/icon-error.svg"
import { login } from "../../api/authApi";
import { Link, useNavigate } from "react-router";
import { toast } from "sonner";


const Login = () =>{

    const {register,handleSubmit,formState:{errors}} = useForm();

    const navigate =useNavigate();

    const onFormSubmit = async(data) =>{
        try{
            const response = await login(data);
            localStorage.setItem('acces_token',response.acces_token);
            navigate('/home',{ replace: true });
            toast.success('Logged in');
        }
        catch(error){
            toast.error(error);
            throw error;
        }
    };  
    const onErrors = errors => console.error(errors);

    return(
        
        <form id="form" onSubmit={handleSubmit(onFormSubmit,onErrors)}>
        <div>
            <input type="text"  {...register("email",{required:"Email is required",pattern: { value: /\S+@\S+\.\S+/,message: "Entered value does not match email format",}})} className={`email ${errors?.email && "invalid"}`} placeholder="Email Address" id="email"  ></input>
            {errors?.email &&
                <span><img src={errorIcon} alt="error" className="error-icon"/></span>
            }
            <span className="error">{errors?.email && errors.email.message}</span>
        </div>

        <div>
            <input type="password"  {...register("password",{required:"Password is required",minLength:{value:8,message:'password must be at least 8 characters long'},type:"password"})} className={`password ${errors?.password && "invalid"}`}  placeholder="Password" id="password" ></input>
            {errors?.password &&
                <span><img src={errorIcon} alt="error" className="error-icon"/></span>
            }
            <span className="error">{errors?.password && errors.password.message}</span>     
         </div>

         <div className="form-options">
                     <Link to="/register" className="link">Not yet registered ?</Link>          
        </div>

        <button type="submit" className="btn btn-green" >Submit</button>

        </form>

          
        

        
          
     
    )
}

export default Login;