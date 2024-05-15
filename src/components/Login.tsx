import { useAuth } from "@realm/react";

const Login = () => {
    const { logInWithAnonymous } = useAuth();
    logInWithAnonymous();
    return null;
    
}

export default Login;