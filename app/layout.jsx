import "@styles/globals.css";
import Nav from "@components/Nav";
import provider from "@components/Provider";

export const metadata = {
  title: "Promptopia",
  describtion: "Discover & Share AI Prompts",
};

const RootLayout = ({ children }) => {
  return (
    <html lang="eng">
      <body>
        <div className="main">
          <div className="gradient"></div>

          <main className="app">
            <Nav />
            {children}
          </main>
        </div>
      </body>
    </html>
  );
};

export default RootLayout;
