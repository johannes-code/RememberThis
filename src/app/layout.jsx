


export const metadata = {
    title: 'Remember This',
    description: 'This is a memory game',
  }
  
  export default function RootLayout({ children }) {
    return (
      <html lang="en">
        <head>
          <link rel="icon" href="favicon.ico" />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          <link
            href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap"
            rel="stylesheet"
          />
        </head>
        <body>{children}</body>
      </html>
    )
  }
  