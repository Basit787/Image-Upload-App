import SignModeContext from "./AuthStepProvider";

const ContextProviders = ({ children }: { children: React.ReactNode }) => {
  return <SignModeContext>{children}</SignModeContext>;
};

export default ContextProviders;
