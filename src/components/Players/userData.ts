const userData = {
    username: localStorage.getItem("username"),
    avatar: localStorage.getItem("avatar"),
    id: localStorage.getItem("id"),
    language: localStorage.getItem("language"),
};

fetch("/api/save-user-data", {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
})
    .then((response) => response.json())
    .then((data) => {
        console.log(data)
    })
    .catch((error) => {
        console.log(error);
    });
