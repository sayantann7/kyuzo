import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, LogIn } from "lucide-react";
import ButtonCustom from "../components/ui/button-custom";
import { useToast } from "@/hooks/use-toast";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const { toast, dismiss } = useToast();

  const showToast = (title, description) => {
    const { id, dismiss } = toast({
      title: title,
      description: description,
    });
    setTimeout(() => {
      dismiss();
    }, 5000);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch(`http://localhost:3000/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();

      if (!response.ok) {
        showToast(
          "Invalid Credentials",
          "Please check your username and password"
        );
        setIsLoading(false);
        return;
      } else {
        localStorage.setItem('userId', data.userId);
        showToast("Login Successful", "You are now logged in");
        setIsLoading(false);
        navigate("/dashboard");
      }
    } catch (error) {
      showToast("Error", "An error occurred while logging in");
      console.error(error);
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-kyuzo-black">
      <div className="absolute inset-0 bg-asanoha-pattern bg-repeat opacity-5 z-0"></div>

      <div className="glass-card w-full max-w-md p-8 z-10">
        <div className="text-center mb-8">
          <Link to="/" className="inline-block">
            <span className="text-3xl font-bold font-calligraphy tracking-wider text-kyuzo-gold">
              kyuzo
            </span>
          </Link>
          <h1 className="text-2xl font-bold text-kyuzo-paper mt-4">
            Welcome Back
          </h1>
          <p className="text-kyuzo-paper/70 mt-2">
            Sign in to continue your learning journey
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-kyuzo-paper"
            >
              Username
            </label>
            <input
              id="email"
              type="text"
              placeholder="Your Username"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 bg-kyuzo-black/50 text-kyuzo-paper border border-kyuzo-gold/20 rounded-md focus:outline-none focus:ring-2 focus:ring-kyuzo-gold/30"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-kyuzo-paper"
            >
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-kyuzo-black/50 text-kyuzo-paper border border-kyuzo-gold/20 rounded-md focus:outline-none focus:ring-2 focus:ring-kyuzo-gold/30"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-kyuzo-paper/60 hover:text-kyuzo-paper"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            <div className="flex justify-end">
              <Link
                to="/reset-password"
                className="text-sm text-kyuzo-gold hover:underline"
              >
                Forgot password?
              </Link>
            </div>
          </div>

          <ButtonCustom
            type="submit"
            variant="default"
            className="w-full"
            icon={<LogIn size={18} />}
            disabled={isLoading}
          >
            {isLoading ? "Signing in..." : "Sign In"}
          </ButtonCustom>
        </form>

        <div className="mt-8 text-center">
          <p className="text-kyuzo-paper/70">
            Don't have an account?{" "}
            <Link to="/signup" className="text-kyuzo-gold hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
