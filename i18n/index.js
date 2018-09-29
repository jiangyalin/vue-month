import zhCn from './locale/zh-CN'
import en from './locale/en'
import ja from './locale/ja'

export default (name) => {
  let lang = zhCn
  if (name === 'zh-CN') lang = zhCn
  if (name === 'en') lang = en
  if (name === 'ja') lang = ja
  return lang
}
