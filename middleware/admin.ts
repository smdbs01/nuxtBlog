export default defineNuxtRouteMiddleware((to) => {
  const { status, data } = useAuth();
  if (status.value === "unauthenticated") {
    return navigateTo("/login");
  }

  // @ts-ignore
  if (to.path === "/admin" && data.value?.role !== "admin") {
    return navigateTo("/");
  }
});
