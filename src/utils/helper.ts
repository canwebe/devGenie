export const getPromt = (type: string, tone: string, description: string) => {
  let promptType = 'a profile bio'

  if (type === 'project') {
    promptType = 'a project description'
  }

  if (type === 'experience') {
    promptType = 'an experience'
  }

  return `Create ${promptType} in ${tone} tone. Make sure to use simple sentences and base them on this context : ${description}`
}
