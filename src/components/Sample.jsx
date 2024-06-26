import React , { useState } from 'react'
import { useEffect } from 'react'

const Sample = () => {

    const [data, setData] = useState('')

    useEffect(() => {
        try{
             fetch('https://reactnexus.com/')
            .then((res) => res.text())
            .then(html => {
                const parser = new DOMParser();
                const doc = parser.parseFromString(html, 'text/html');
        
                // Access data inside the DOM
                const title = doc.querySelector('title').textContent;
                setData(title)
            })
        }
        catch (error){
            console.log(error, "error wjile fetching data from the react nexus website")
        }
    }, [])

  return (
    <div>
      <h1> the title Fetched is {data} </h1>
    </div>
  )
}

export default Sample
