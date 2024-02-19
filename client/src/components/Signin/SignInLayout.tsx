function SignInLayout({ children }: { children: React.ReactElement }) {
  return (
    <div className="max-w-screen-xl mx-auto min-h-screen">
      <div className="max-w-screen-sm mx-auto p-6 min-h-screen">{children}</div>
    </div>
  );
}

export default SignInLayout;
