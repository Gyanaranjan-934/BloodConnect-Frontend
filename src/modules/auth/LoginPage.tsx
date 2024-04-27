import LoginFormComponent from "./components/LoginForm";
import { AuthPageCarousel } from "./components/PageCarosoul";

const LoginPage = () => {
    return (
        <div className="flex">
            <div className="w-[50%] px-10 py-20 h-full flex justify-center items-center">
                <AuthPageCarousel />
            </div>
            <LoginFormComponent />
        </div>
    );
};

export default LoginPage;
