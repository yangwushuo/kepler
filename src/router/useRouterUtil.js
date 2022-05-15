import { useRouter } from "vue-router"

const router = useRouter();

export const routerPush = (path) => {
  router.push(path)
}

export const routerReplace = (path) => {
  router.replace(path)
}