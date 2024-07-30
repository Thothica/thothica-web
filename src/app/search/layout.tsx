export default async function RootLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return (
      <div className="">
        {children}
      </div>
    );
  }