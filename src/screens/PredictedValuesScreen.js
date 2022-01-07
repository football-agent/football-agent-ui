import React, { useEffect }  from 'react'
import { useCount } from '../context/SelectionContext'

export default function PredictedValuesScreen() {
    const {stuff} = useCount()   
    
    useEffect(() => {
        console.log(stuff)
      }, []);

    
    return (
        <div>
            
        </div>
    )
}
