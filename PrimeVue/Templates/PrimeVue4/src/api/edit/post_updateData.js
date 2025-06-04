import { URL_BACK } from "@/config/config";
import { useAuthStore } from '@/stores/auth'
const authStore = useAuthStore()

export async function updateFetch(id, newData) {
  let params = new URLSearchParams();
  params.append("id", id);
  params.append("newData", JSON.stringify(newData));

  const options = {
    method: "POST",
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Bearer ${authStore.authToken}`,
    },
    redirect: 'follow',
    body: params,
  }
  
  const updated = await fetch(URL_BACK + ``, options)
  .then(res => {
    // Controlar respuesta
    if (res.ok) return res.json()
    else {
      console.log('Error al llamar al servidor: ', res)
      return { error: 'Error al realizar la consulta al servidor. Por favor, inténtelo de nuevo o contacte al administrador.\n\nError: Bad Response' }
    }
  })
  .then(data => {
    console.log(data)
    if (data) {
      // Manipular respuesta
      return data
    }
  })
  .catch(error => {
    console.log('ERROR: ', error)
    return { error: 'Error al realizar la consulta al servidor. Por favor, inténtelo de nuevo o contacte al administrador.\n\nError: ' + error }
  })
  return updated
}