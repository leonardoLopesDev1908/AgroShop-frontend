export async function RefreshService() {
    const response = await fetch("/auth/refresh-token", {
        method: "POST",
        credentials: "include"
    })
    if(!response.ok){
        throw new Error("Não foi possivel renovar o token")
    }

    return await response.json()
}