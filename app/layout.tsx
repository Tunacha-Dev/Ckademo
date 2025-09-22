export const metadata = {
  title: "CKA Wireframes",
  description: "Crimson Knights Adventure – styled interactive UI wireframes",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
