interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="h-screen relative bg-[#050810] flex flex-row justify-center items-center">
      <div className=" fixed top-0 w-full h-full flex flex-col justify-center items-center backdrop-blur-[150px]">
        {children}
      </div>
      <div className="w-[50%] h-[80%] bg-[#263149] rounded-[100%] "></div>
    </div>
  );
};

export default Layout;
