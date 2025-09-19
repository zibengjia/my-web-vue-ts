export async function getGitHubContributions(user: string) {
  const url = `/github/users/${user}/contributions`
  const html = await (await fetch(url)).text()

  const tooltips = html.matchAll(/>(\w+) contributions? on \w+ \w+/g)
  const cells = html.matchAll(/data-date="(\d+-\d+-\d+)" .*? data-level="(\d+)"/g)
  const contributions = []

  for (const [, count] of tooltips) {
    const nextCell = cells.next().value
    if (!nextCell) break
    const [, date, level] = nextCell
    contributions.push({
      level: parseInt(level),
      date: new Date(date).getTime(),
      count: parseInt(count) || 0,
    })
  }
  return contributions.sort((a, b) => a.date - b.date)
}
