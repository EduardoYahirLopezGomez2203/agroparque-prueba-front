const ApiService = {
    token: null, // Propiedad para almacenar el token

    setToken: function (token) {
        this.token = token;
    },

    consume: async function (type = "", url = "", data = {}, customHeaders = {}) { //MODIFICACIÓN: Se agregó para añadir parámetros de los headers para añadir valores al findby

        try {
            // Default options are marked with *
            const response = await fetch(url, {
                method: type, // *GET, POST, PUT, DELETE, etc.
                mode: "cors", // no-cors, *cors, same-origin
                cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
                credentials: url.includes("beeceptor") ? "same-origin" : "include", // include, *same-origin, omit
                headers: {
                    "Content-Type": "application/json",
                    Authorization: this.token ? `Bearer ${this.token}` : "",
                    "ngrok-skip-browser-warning": "true",
                    ...customHeaders //MODIFICACIÓN: Aquí se utiliza los customHeaders para la sección de los parámetros
                },
                redirect: "manual", // manual, *follow, error
                referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
                body: type === "GET" ? undefined : JSON.stringify(data), // body data type must match "Content-Type" header
            });

            if (!response.ok) {
                throw new Error(`Error ${response.status}: ${response.statusText}`);
            }

            return response.json(); // parses JSON response into native JavaScript objects

        } catch (error) {
            throw error;
        }
    },
};

export default ApiService;
