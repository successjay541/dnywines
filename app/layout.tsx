export const metadata = {
  title: "DNY Wine Hub",
  icons: {
    icon: '/image/dnyico.png',
    shortcut: '/image/dnyico.png',
    apple: '/image/dnyico.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/image/dnyico.png" />
      </head>
      <body>{children}</body>
    </html>
  );
}