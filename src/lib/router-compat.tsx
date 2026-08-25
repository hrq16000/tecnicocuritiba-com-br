/**
 * Compatibility shim — legacy components still import from "react-router-dom",
 * which vite.config.ts and tsconfig paths alias to this module. It maps the
 * small API surface the app actually uses onto TanStack Router.
 *
 * Supported: Link, NavLink, Navigate, Outlet, useNavigate, useParams,
 * useLocation, useSearchParams, BrowserRouter, useInRouterContext,
 * Routes/Route (inert stubs so LegacyApp keeps typechecking).
 *
 * Internally the TanStack calls are cast to a loose signature: this module is
 * a dynamic pass-through for arbitrary legacy paths, so the router's strict
 * route-generic types do not apply here. The public types below are what
 * consumers see.
 */
import {
  Link as TanLinkReal,
  Navigate as TanNavigateReal,
  Outlet,
  useLocation as useTanLocation,
  useNavigate as useTanNavigateReal,
  useParams as useTanParamsReal,
  useRouter,
  useRouterState,
} from "@tanstack/react-router";
import {
  forwardRef,
  type AnchorHTMLAttributes,
  type ReactElement,
  type ReactNode,
  type Ref,
} from "react";

type To = string;

/* eslint-disable @typescript-eslint/no-explicit-any */
const TanLink = TanLinkReal as unknown as (props: any) => ReactElement;
const TanNavigate = TanNavigateReal as unknown as (props: any) => ReactElement;
/* eslint-enable @typescript-eslint/no-explicit-any */

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
      ref={ref as Ref<never>}
      to={to}
      replace={replace}
      state={state}
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
    return <TanLink ref={ref as Ref<never>} to={to} className={cls} {...rest} />;
  },
);

export interface NavigateProps {
  to: To;
  replace?: boolean;
  state?: unknown;
}

export function Navigate({ to, replace, state }: NavigateProps) {
  return <TanNavigate to={to} replace={replace} state={state} />;
}

export function useNavigate() {
  const navigate = useTanNavigateReal() as unknown as (opts: {
    to: string;
    replace?: boolean;
    state?: unknown;
    search?: string;
  }) => Promise<void>;
  const router = useRouter();
  return (
    to: To | number,
    opts?: { replace?: boolean; state?: unknown },
  ): void => {
    if (typeof to === "number") {
      router.history.go(to);
      return;
    }
    void navigate({ to, replace: opts?.replace ?? false, state: opts?.state });
  };
}

export function useParams<
  T extends Record<string, string> = Record<string, string>,
>(): T {
  const params = (useTanParamsReal as unknown as (opts?: unknown) => unknown)(
    { strict: false },
  );
  return (params ?? {}) as T;
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
  const navigate = useTanNavigateReal() as unknown as (opts: {
    to: string;
    replace?: boolean;
    search?: string;
  }) => Promise<void>;
  const params = new URLSearchParams(searchStr);
  const setParams = (next: SearchParamsInit, opts?: { replace?: boolean }) => {
    const resolved =
      typeof next === "function" ? next(new URLSearchParams(searchStr)) : next;
    const value =
      resolved instanceof URLSearchParams
        ? resolved
        : new URLSearchParams(resolved);
    void navigate({
      to: ".",
      replace: opts?.replace ?? false,
      search: value.toString(),
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
