import { useForm } from "react-hook-form";
import errorIcon from "/icons/icon-error.svg"
import { registerUser } from "../../api/authApi";
import { Link } from "react-router";

const Register = () =>{

    const {register,handleSubmit,formState:{errors}} = useForm();

    const onFormSubmit = async(data) =>{
        try{
            const response = await registerUser(data); 
        }
        catch(error){
            throw error;
        }
    };  
    const onErrors = errors => console.error(errors);

    return(
        
        <form id="form" onSubmit={handleSubmit(onFormSubmit,onErrors)}>

        <div>
            <input type="text"  {...register("first_name",{required:"First name is required",minLength: { value: 3, message: "First name must be at least 3 characters long" },maxLength: { value: 20, message: "First name must not exceed 20 characters" }})} className={`first_name ${errors?.first_name && "invalid"}`} placeholder="First name" id="first_name"  ></input>
            {errors?.first_name &&
                <span><img src={errorIcon} alt="error" className="error-icon"/></span>
            }
            <span className="error">{errors?.first_name && errors.first_name.message}</span>
        </div>

        <div>
            <input type="text"  {...register("last_name",{required:"Last name is required",minLength: { value: 3, message: "Last name must be at least 3 characters long" },maxLength: { value: 20, message: "Last name must not exceed 20 characters" }})} className={`email ${errors?.last_name && "invalid"}`} placeholder="Last name" id="last_name"  ></input>
            {errors?.last_name &&
                <span><img src={errorIcon} alt="error" className="error-icon"/></span>
            }
            <span className="error">{errors?.last_name && errors.last_name.message}</span>
        </div>

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
                 <Link to="/login" className="link">Already have an account ?</Link>                 
        </div>

        <button type="submit" className="btn btn-green" >Submit</button>


        </form>

          
    )
}

export default Register;

