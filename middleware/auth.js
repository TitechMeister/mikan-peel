import { checkLogin } from "~/utils/auth"

export default async function (context) {
  if (!(await checkLogin(context))) {
    context.store.commit('unauthenticate')
    context.redirect('/login')
    return
  }
  context.store.commit('authenticate')
}

