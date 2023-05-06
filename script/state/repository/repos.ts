const personal_token = process.env.GITHUB_PERSONAL_TOKEN

export const fetchRepos = async (user: string = "abrahamduno", config: any = {}): Promise<any> => {
  console.log("personal token,", personal_token)
  try {
    const response = await fetch(`https://api.github.com/users/${user}/repos`, {
      ...config,
      headers: {
        ...config.headers,
        Authorization: `Token ${personal_token}`,
        ...(!!config.headers ? config.headers : {}),
      },
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    return []
    throw new Error(`Failed to fetch the repos for user ${user}`);
  }
};
