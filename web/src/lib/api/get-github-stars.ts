export const getGithubStars = async () => {
  const URL = "https://api.github.com/repos/sireto/offlinepass";
  try {
    const res = await fetch(URL);
    if (res.status === 200) {
      const data = await res.json();
      console.log(data["stargazers_count"]);
      return data["stargazers_count"];
    } else {
      return 0;
    }
  } catch (e) {
    throw e;
  }
};
