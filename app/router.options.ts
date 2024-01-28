import type { RouterOptions } from "@nuxt/schema";

export default <RouterOptions>{
  scrollBehavior: (to, from, savedPosition) => {
    if (savedPosition) {
      return savedPosition;
    } else {
      if (!to.hash) {
        return { top: 0 };
      }
      console.log(from);
      console.log(to);

      if (from.path === to.path) {
        return {
          el: to.hash,
          behavior: "smooth",
          top: 80,
        };
      }
      return {
        el: to.hash,
        top: 80,
      };
    }
  },
};
