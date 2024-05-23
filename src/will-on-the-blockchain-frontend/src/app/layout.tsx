import ClientRootLayout from "./ClientRootLayout";
import {rainbowConfig} from "../lib/config";
import {headers} from "next/headers";
import {cookieToInitialState} from "wagmi";

// export const dynamic = "force-static";

export default function RootLayout({children}: {children: React.ReactNode}) {
  const initialState = cookieToInitialState(
    rainbowConfig,
    headers().get("cookie")
  );

  return (
    <html lang="en">
      <body>
        <div id="root">
          <ClientRootLayout initialState={initialState}>
            {children}
          </ClientRootLayout>
        </div>
      </body>
    </html>
  );
}
