export const getPromt = (
	mode: string,
	tone: string,
	characters: number,
	prompt: string
) => {
	let promptType = 'a profile bio'

	if (mode === 'project') {
		promptType = 'a project description'
	}

	if (mode === 'experience') {
		promptType = 'an experience'
	}

	return `Create ${promptType} in ${tone} tone. Make sure to use simple sentences, under ${characters?.toString()} characters and base them on this context : ${prompt}`
}
