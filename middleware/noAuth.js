import { checkLogin } from "~/utils/auth"

export default async function (context) {
  if (await checkLogin(context)) {
    context.store.commit('authenticate')
    context.redirect('/')
    return
  }
  context.store.commit('unauthenticate')
}

