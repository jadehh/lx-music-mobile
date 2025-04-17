const logs: string[] = []


export const bootLog = (...msgs: any[]) => {
  console.log(msgs)
  logs.push(msgs.map(m => typeof m == 'string' ? m : JSON.stringify(m)).join(' '))
}

export const getBootLog = () => {
  return logs.join('\n')
}

