import { http as request } from '@/utils'

const rank = data => request({
  url: '/api/rank',
  method: 'POST',
  data
})

export {
  rank
}
