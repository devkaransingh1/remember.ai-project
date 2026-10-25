import React from 'react';

export interface LoginProps {
  onBackToHome: () => void;
}

const Login: React.FC<LoginProps> = ({ onBackToHome }) => {
  return (
    <main className="min-h-screen bg-black text-[#E1E0CC] flex flex-col items-center justify-center gap-6">
      <h1 className="m-0 text-2xl font-medium">Sign in to Remember AI</h1>
      <button
        type="button"
        className="rounded-full bg-[#E1E0CC] px-6 py-3 font-medium text-black"
      >
        Continue with Google
      </button>
      <button
        type="button"
        onClick={onBackToHome}
        className="text-sm text-[#E1E0CC]/70 hover:text-[#E1E0CC] bg-transparent border-0 cursor-pointer"
      >
        Back to home
      </button>
    </main>
  );
};

export default Login;
