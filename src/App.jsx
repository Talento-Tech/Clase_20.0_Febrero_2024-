/* useState:  Función de React que nos permite manejar elestado en un componente funcional, almacenar una url, y cada vez que se refresque la página actualice esa información por 
algo diferente
useEffect: Para efectos secundarios, esta se llama para cuando completemos el renderizado
1. Cuando el comlemento se monta
2. Modifiquemos el fat
*/
/* API a usar en clase: https://catfact.ninja/fact para las frases aleatorias
contenido de API: https://catfact.ninja/docs/api-docs.json
*/
/* cataas  para las imagenes aleatorias*/
import { useState, useEffect } from 'react'
/* import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg' */
import './App.css'

function App() {
  /* useState para manejar el estado, para almacenar la URL, y el  segundo para guardar el fact*/
  /* Hooks useState */
  const [catImageUrl, setCatImageURL] = useState('');
  const [fact, setFact] = useState('');

  useEffect( () =>{
      /* Función asincrona, nos devuelve una promesa. */
    (
      async()=>{
        try{
          const response = await fetch('https://catfact.ninja/fact')
          const data = await response.json()
          /* Desestructuración de objeto */
          const{fact}= data
          setFact(fact)
        }catch(error){
          console.error(error)
        }
      }
    )()/*Función anonima (Argumentos que pasamos a funciones de orden superior) Invocan inmediatamente despues de que la definimos. */
  },[])

  useEffect(()=>{
    /* Efectos secundarios en componentes secundarios de React */
    if(fact){
      (
        async() =>{
          try{
            const firstWord = fact.split(' ',3).join(' ')
            const response = await fetch(`https://cataas.com/cat/says/${firstWord}`) /* Alt + 96 */
            const data = await response 
            /* Desectructurización de objeto */
            const { url } = data
            setCatImageURL(url)
          }catch(error){
            console.log(error)
          }
        }
      )()
        /* console.log(error) */
    }
  },[fact])


  return (
    <>
      <h1>UseState, useEffect example: Random cat</h1>
      {fact && <p> {fact} </p>}
      {catImageUrl && <img src={catImageUrl} alt="random" width={400} height={400} />
      }
    </>
  )
}

export default App