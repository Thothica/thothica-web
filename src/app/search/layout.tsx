export default async function RootLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return (
      <div>
        
        <div className="container py-6 sm:py-12">
            User
        </div>

        <div className="container">
            {children}
        </div>
      </div>
    );
  }