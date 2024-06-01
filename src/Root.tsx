import { ParentProps, Suspense } from "solid-js";
import { Toaster } from "solid-toast";
import Loading from "./common/components/LoadingIndicator/Loading";
import AppLayout from "./features/Layout/AppLayout";
import { AuthProvider } from "./providers/AuthProvider";
import { LocaleProvider } from "./providers/LocaleProvider";

const Root = (props: ParentProps) => {
  return (
    <main>
      <Suspense fallback={<Loading />}>
        <AuthProvider>
          <LocaleProvider>
            <AppLayout>{props.children}</AppLayout>
          </LocaleProvider>
        </AuthProvider>
        <Toaster />
      </Suspense>
    </main>
  );
};

export default Root;
