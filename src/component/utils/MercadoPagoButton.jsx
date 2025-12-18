import {initMercadoPago, Wallet} from "@mercadopago/sdk-react"
import {useEffect, useState} from "react"

initMercadoPago('APP_USR-6a405dbf-ddd7-4ff9-a96d-6610ed5d042d')

function MercadoPagoButton({pedidoId}) {
    const [preferenceId, setPreferenceId] = useState(null)

    useEffect(() => {
        fetch(`http://localhost:8080/api/v1/payment/preference/${pedidoId}`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                pedidoId: pedidoId
            })
        })
            .then(res => res.json())
            .then(data => setPreferenceId(data.data.preferenceId))
    }, [])

    if(!preferenceId) return <p>Carregando pagamento...</p>

    return (
        <Wallet initialization={{preferenceId}}></Wallet>
    )
}

export default MercadoPagoButton;