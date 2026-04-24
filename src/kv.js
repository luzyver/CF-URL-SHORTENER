import Redis from 'ioredis'

const redis = new Redis(process.env.REDIS_URL || 'redis://localhost:6379', {
  maxRetriesPerRequest: 3,
  enableReadyCheck: true,
  lazyConnect: false,
})

redis.on('error', (err) => {
  console.error('[Redis] error:', err.message)
})

redis.on('connect', () => {
  console.log('[Redis] connected')
})

// Links are stored as  link:{slug}
// Sessions are stored as session:{id}  (unchanged — already prefixed)
function redisKey(key) {
  if (key.startsWith('session:')) return key
  return 'link:' + key
}

export const kv = {
  // Returns string | null
  async get(key) {
    return redis.get(redisKey(key))
  },

  // options.expirationTtl = seconds
  async put(key, value, options = {}) {
    const rk = redisKey(key)
    if (options.expirationTtl && options.expirationTtl > 0) {
      await redis.set(rk, value, 'EX', options.expirationTtl)
    } else {
      await redis.set(rk, value)
    }
  },

  async delete(key) {
    await redis.del(redisKey(key))
  },

  // Mirrors CF KV list() — returns { keys: [{ name }], list_complete }
  async list({ limit = 1000 } = {}) {
    const slugs = []
    let cursor = '0'
    do {
      const [next, batch] = await redis.scan(cursor, 'MATCH', 'link:*', 'COUNT', 100)
      cursor = next
      for (const k of batch) {
        slugs.push(k.slice(5)) // strip "link:" prefix → bare slug
        if (slugs.length >= limit) break
      }
    } while (cursor !== '0' && slugs.length < limit)

    return {
      keys: slugs.map(name => ({ name })),
      list_complete: cursor === '0',
    }
  },
}

export default redis