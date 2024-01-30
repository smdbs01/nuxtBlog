export default defineNuxtRouteMiddleware((to, from) => {
  const { status, data } = useAuth();
  if (status.value === "unauthenticated") {
    return navigateTo("/login");
  }

  // @ts-ignore
  if (to.path === "/admin" && data.value?.user?.role !== "admin") {
    return navigateTo("/");
  }
});
