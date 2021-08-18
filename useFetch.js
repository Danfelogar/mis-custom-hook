import { useEffect, useRef, useState } from "react"


export const useFetch = ( url ) => {


    const isMounted = useRef(true);//para que el componente quede a mitad de montada para eso se usa el "useRef"(mantenga la referencia minestra el componente siga montado)

    const [state, setState] = useState({data: null, loading: true, error: null
    });

    useEffect(() => {
        return () => {
            isMounted.current = false;
        }
    }, [])//se ejecuatara cuando mi otro efecto se desmonte, entonces quiero cambiar el valor de ismounted a false

    //yo lo veo asi...cuando se cargue el cuadro y quede a mitad de camino me devolvera un arreglo vacio que activara el useEffect y por ende el condicional falso que ejecutara otra cosa del useEffect de mas abajo

    useEffect ( ()=>{

        fetch( url )
            .then( resp => resp.json())
            .then( data => {


                setTimeout(()=>{
                    if(isMounted.current) {
                        setState({
                            loading: false,
                            error: null,
                            data
                        })
                    }else{
                        console.log('setState no se llamo')
                    }
                },0)//ojo el setTimeout esta de mas

            });
    },[url])

    return state;
}
