export const env = {
	GITHUB_RAW_DATA_URL: "https://raw.githubusercontent.com",
	GITHUB_USER_NAME: "yokesh-ks",
	GITHUB_REPO_NAME: "ingenious-stream-constants",
	GITHUB_BRANCH_REF: "refs/heads/main",
} as const;

export const getGithubDataUrl = (path: string) => {
	const {
		GITHUB_RAW_DATA_URL,
		GITHUB_USER_NAME,
		GITHUB_REPO_NAME,
		GITHUB_BRANCH_REF,
	} = env;
	const branch = GITHUB_BRANCH_REF.replace("refs/heads/", "");
	return `${GITHUB_RAW_DATA_URL}/${GITHUB_USER_NAME}/${GITHUB_REPO_NAME}/${branch}/${path}`;
};
