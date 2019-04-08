import store from 'state/store'

export default function cachebust (name) {
  const realName = name.split('?')[0]
  return realName + '?v=' + encodeURI(store.version.get())
}
