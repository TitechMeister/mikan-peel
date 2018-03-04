export default async (context) => {
  if (!context.store.state.token)
    context.redirect('/login')
  await context.store.dispatch('nuxtClientInit', context)
}
