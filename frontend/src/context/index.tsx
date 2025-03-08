import SignModeContext from "./SignMode.Context";

const ContextProviders = ({ children }: { children: React.ReactNode }) => {
  return <SignModeContext>{children}</SignModeContext>;
};

export default ContextProviders;
