export default async function ({ isDev, redirect }) {
  if (!isDev) {
    redirect('/error/working')
    return
  }
}
