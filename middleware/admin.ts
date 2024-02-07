export default defineNuxtRouteMiddleware((to) => {
  const { status, session } = useAuth();
  if (status.value === "unauthenticated") {
    return navigateTo("/login");
  }

  // @ts-ignore
  if (to.path === "/admin" && session.value.role !== "admin") {
    return navigateTo("/");
  }
});
