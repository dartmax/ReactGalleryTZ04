const gamer = {
  id: 1,
  shardId: 1
}

function joinParty({leader, player}){
  player.shardId = leader.shardId
}

export function checkUser(user, callback) {
  if(user.age < 18){
    // callback(user.age)
    alert('Your age less then need')
  }
}

const foo = {}

function sum(a, b) {
  return a + b
}

describe('Some group 1', () => {
  beforeAll(() => { // arrange
    window.alert = jest.fn() // Stub
  })
  beforeEach(() => {

  })
  afterEach(() => {
    window.alert.mockReset() // Stub - сбросить состояние мока
  })
  afterAll(() => {

  })
  test('hello world', () => {
    expect.hasAssertions()
    const user = {age: 2}
    checkUser(user, (age) => {
      expect(age).toBe(user.age)
    })
  })
  it('check user is under 18', () => {
    checkUser({age: 2}) // Act

    expect(window.alert).toHaveBeenCalled()
  })
  it('check user is under 18', () => {
    checkUser({age: 22})

    expect(window.alert).not.toHaveBeenCalled()
  })
})

describe('player managment', () => {
  describe('joinParty', () => {
    it.each`
      a     | b    | result
      ${1}  | ${2} | ${3}
      ${-1} | ${1} | ${0}
    `('when a is $a and b is $b', ({ a, b, result }) => {
      expect(sum(a, b)).toBe(result)
      }
    )
    it('should move player id to leader', () => {
      const PLAYER_SHARD_ID = 1
      const player1 = {id: 1, shardId: PLAYER_SHARD_ID}
      const player2 = {id: 2, shardId: 2}
      joinParty({leader: player1, player: player2})
      expect(player2.shardId).toBe(PLAYER_SHARD_ID)
    })
  })
})
