
export function get(url, json = true) {
    return fetch(url)
        .then(res => !res.ok ? new Error(res.statusText) : res)
        .then(res => (json && !(res instanceof Error)) ? res.json() : res)
}
