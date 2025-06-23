const ApiService = {
    token: null,

    setToken: function (token) {
        this.token = token;
    },

    consume: async function (type = "", url = "", data = {}, customHeaders = {}) {
        try {
            const response = await fetch(url, {
                method: type,
                mode: "cors",
                cache: "no-cache",
                credentials: url.includes("beeceptor") ? "same-origin" : "include",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: this.token ? `Bearer ${this.token}` : "",
                    ...customHeaders
                },
                redirect: "manual",
                referrerPolicy: "no-referrer",
                body: type === "GET" ? undefined : JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error(`Error ${response.status}: ${response.statusText}`);
            }

            const contentType = response.headers.get("content-type");
            if (contentType && contentType.includes("application/json")) {
                return await response.json();
            } else if (contentType && (contentType.startsWith("image/") || contentType.includes("application/pdf") || contentType.includes("application/vnd"))) {
                // Para imágenes, PDF, Word, Excel, etc.
                return await response.blob();
            } else {
                // Por si acaso, intenta texto plano
                return await response.text();
            }
        } catch (error) {
            throw error;
        }
    },
};

export default ApiService;