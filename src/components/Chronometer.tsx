import { useState, useEffect } from 'react'
import { VStack, Text, HStack, Button } from '@kuma-ui/core'



type ChronoProps = {
  taskTime : number | 0;
}

export const Chronometer: React.FC<ChronoProps> = ({ taskTime }) => {

  const [time, setTime] = useState(taskTime || 0);
  const [isRunning, setIsRunning] = useState(false);

  const hours = Math.floor(time / 360000);
  const minutes = Math.floor((time % 360000) / 6000);
  const seconds = Math.floor((time % 6000) / 100);
  const milliseconds = time % 100;


  const startAndStopChrono = () => {
    setIsRunning(!isRunning);
  }

  const resetChrono = () => {
    setIsRunning(false);
    setTime(0);
  }

  useEffect(() => {
    
    let intervalID: NodeJS.Timeout;

    if(isRunning) {
      intervalID = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 10)
    }
  
    return () => clearInterval(intervalID)
  }, [isRunning, time])
  

  
  return (
    <VStack as='section'>
      <Text>
        {hours} : 
        {minutes.toString().padStart(2, '0')} : 
        {seconds.toString().padStart(2, '0')} :
        {milliseconds.toString().padStart(2, '0')}
      </Text>
      <HStack>
        <Button onClick={startAndStopChrono}>
          {isRunning ? 'Stop' : 'Start'}
        </Button>
        <Button onClick={resetChrono}>
          Reset
        </Button>
      </HStack>
    </VStack>
  )
}
