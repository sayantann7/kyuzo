import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, UserPlus } from "lucide-react";
import ButtonCustom from "../components/ui/button-custom";
import { useToast } from "../hooks/use-toast";
const host = import.meta.env.BACKEND_HOST;

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [fullname, setFullname] = useState("");
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

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "Please ensure both passwords match",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(`http://localhost:3000/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullname, name, email, password }),
      });
      const data = await response;
      console.log(data);

      if (!response.ok) {
        showToast(
          "Error",
          "An error occurred while creating your account"
        );
        setIsLoading(false);
        return;
      }
      setIsLoading(false);
      localStorage.setItem('userId', data.userId);
      showToast("Account Created", "Your account has been created successfully");
      navigate("/dashboard");
    } catch (error) {
      showToast("Error", "An error occurred while creating your account");
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
            Join Kyuzo
          </h1>
          <p className="text-kyuzo-paper/70 mt-2">
            Create an account to start your learning journey
          </p>
        </div>

        <form onSubmit={handleSignup} className="space-y-5">

        <div className="space-y-2">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-kyuzo-paper"
            >
              Full Name
            </label>
            <input
              id="name"
              type="text"
              placeholder="Your Full Name"
              required
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
              className="w-full px-4 py-3 bg-kyuzo-black/50 text-kyuzo-paper border border-kyuzo-gold/20 rounded-md focus:outline-none focus:ring-2 focus:ring-kyuzo-gold/30"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-kyuzo-paper"
            >
              Username
            </label>
            <input
              id="name"
              type="text"
              placeholder="Your Username"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 bg-kyuzo-black/50 text-kyuzo-paper border border-kyuzo-gold/20 rounded-md focus:outline-none focus:ring-2 focus:ring-kyuzo-gold/30"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-kyuzo-paper"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="your.email@example.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
          </div>

          <div className="space-y-2">
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-kyuzo-paper"
            >
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-3 bg-kyuzo-black/50 text-kyuzo-paper border border-kyuzo-gold/20 rounded-md focus:outline-none focus:ring-2 focus:ring-kyuzo-gold/30"
            />
          </div>

          <div className="pt-2">
            <ButtonCustom
              type="submit"
              variant="default"
              className="w-full"
              icon={<UserPlus size={18} />}
              disabled={isLoading}
            >
              {isLoading ? "Creating Account..." : "Create Account"}
            </ButtonCustom>
          </div>
        </form>

        <div className="mt-8 text-center">
          <p className="text-kyuzo-paper/70">
            Already have an account?{" "}
            <Link to="/login" className="text-kyuzo-gold hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
