const Loading = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex flex-row gap-2">
        <div className="w-4 h-4 rounded-full bg-primary animate-bounce" />
        <div className="w-4 h-4 rounded-full bg-primary/70 animate-bounce [animation-delay:-.3s]" />
        <div className="w-4 h-4 rounded-full bg-primary animate-bounce [animation-delay:-.5s]" />
      </div>
    </div>
  );
};

export default Loading;
