import api from './api'
import Cookies from 'js-cookie'

const csrf = async () => {
  await api.get('/csrf-cookie')

  return Cookies.get('XSRF-TOKEN');
}

export default csrf