/**
 * Compatibility shim — legacy components still import from "react-router-dom",
 * which vite.config.ts and tsconfig paths alias to this module. It maps the
 * small API surface the app actually uses onto TanStack Router.
 *
 * Supported: Link, NavLink, Navigate, Outlet, useNavigate, useParams,
 * useLocation, useSearchParams, BrowserRouter, useInRouterContext,
 * Routes/Route (inert stubs so LegacyApp keeps typechecking).
 */
import {
  Link as TanLink,
  Navigate as TanNavigate,
  Outlet,
  useLocation as useTanLocation,
  useNavigate as useTanNavigate,
  useParams as useTanParams,
  useRouter,
  useRouterState,
} from "@tanstack/react-router";
import {
  forwardRef,
  type AnchorHTMLAttributes,
  type ReactNode,
} from "react";

type To = string;

export interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  to: To;
  replace?: boolean;
  state?: unknown;
  children?: ReactNode;
}

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(function Link(
  { to, replace, state, ...rest },
  ref,
) {
  return (
    <TanLink
      ref={ref}
      to={to as never}
      replace={replace}
      state={state as never}
      {...rest}
    />
  );
});

export interface NavLinkProps extends Omit<LinkProps, "className"> {
  className?:
    | string
    | ((opts: { isActive: boolean; isPending: boolean }) => string);
  end?: boolean;
}

export const NavLink = forwardRef<HTMLAnchorElement, NavLinkProps>(
  function NavLink({ to, className, end, ...rest }, ref) {
    const pathname = useRouterState({ select: (s) => s.location.pathname });
    const target = to.split(/[?#]/)[0] || "/";
    const isActive = end
      ? pathname === target
      : target === "/"
        ? pathname === "/"
        : pathname === target || pathname.startsWith(`${target}/`);
    const cls =
      typeof className === "function"
        ? className({ isActive, isPending: false })
        : className;
    return <TanLink ref={ref} to={to as never} className={cls} {...rest} />;
  },
);

export interface NavigateProps {
  to: To;
  replace?: boolean;
  state?: unknown;
}

export function Navigate({ to, replace, state }: NavigateProps) {
  return <TanNavigate to={to as never} replace={replace} state={state as never} />;
}

export function useNavigate() {
  const navigate = useTanNavigate();
  const router = useRouter();
  return (to: To | number, opts?: { replace?: boolean; state?: unknown }) => {
    if (typeof to === "number") {
      router.history.go(to);
      return;
    }
    void navigate({
      to: to as never,
      replace: opts?.replace,
      state: opts?.state as never,
    });
  };
};

export function useParams<T extends Record<string, string> = Record<string, string>>(): T {
  return useTanParams({ strict: false }) as T;
}

export function useLocation() {
  const loc = useTanLocation();
  const withStr = loc as typeof loc & { searchStr?: string; key?: string };
  return {
    pathname: loc.pathname,
    search: withStr.searchStr ?? "",
    hash: loc.hash,
    state: loc.state,
    key: withStr.key ?? "default",
  };
}

type SearchParamsInit =
  | URLSearchParams
  | Record<string, string>
  | ((prev: URLSearchParams) => URLSearchParams | Record<string, string>);

export function useSearchParams(): [
  URLSearchParams,
  (next: SearchParamsInit, opts?: { replace?: boolean }) => void,
] {
  const searchStr = useRouterState({
    select: (s) => (s.location as { searchStr?: string }).searchStr ?? "",
  });
  const navigate = useTanNavigate();
  const params = new URLSearchParams(searchStr);
  const setParams: [URLSearchParams, (n: SearchParamsInit, o?: { replace?: boolean }) => void][1] =
    (next, opts) => {
      const resolved =
        typeof next === "function"
          ? next(new URLSearchParams(searchStr))
          : next;
      const value =
        resolved instanceof URLSearchParams
          ? resolved
          : new URLSearchParams(resolved);
      void navigate({
        to: "." as never,
        replace: opts?.replace,
        search: value.toString() as never,
      });
    };
  return [params, setParams];
}

export function BrowserRouter({ children }: { children?: ReactNode }) {
  return <>{children}</>;
}

export function useInRouterContext() {
  return true;
}

/** Inert stubs — only referenced by the retired LegacyApp route table. */
export function Routes({ children }: { children?: ReactNode }) {
  return <>{children}</>;
}

export function Route(_props: {
  path?: string;
  element?: ReactNode;
  children?: ReactNode;
}) {
  return null;
}

export { Outlet };
