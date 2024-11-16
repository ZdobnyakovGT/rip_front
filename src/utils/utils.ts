export const isHomePage = (path:string) => {
	return path == "/"
}

export const isTopicPage = (path:string) => {
    return path.match(/^\/topics\/(\d+)/)
}
