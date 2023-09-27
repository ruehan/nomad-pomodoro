import styled from "styled-components";
import { AnimatePresence, motion, useAnimationControls } from "framer-motion"
import { useEffect, useState } from "react";
import CountDown from "../Time/countdown";
import Confetti from "react-confetti";

const CountDownContainer = styled(motion.div)`
  background: #313A3A;
  /* color: #e74d3d; */
  position: relative;
  font-size: 100px;
  width: 100%;
  height: 100%;
`
const CountDownDiv = styled.div`
  width: 60%;
  height: 100%;
  position: fixed;
  top: 0%;
  left: 20%;
  display: flex;
  justify-content: space-around;
  align-content: center;
  align-items: center;
  background-color: #e74d3d;
`

const CountDownH1 = styled(motion.div)`
  font-family: 'Gasoek One', sans-serif;
  width: 250px;
  height: 350px;
  background-color: #fefefe;
  text-align: center;
  line-height: 350px;
  border-radius: 10px;
`

const StatusDiv = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-around;
  align-items: center;
  position: absolute;
  bottom: 5%;
`

const RoundStatus = styled.div`
  font-size: 40px;
  color: white;
  /* position: fixed; */
  /* bottom: 10%; */
  /* left: 30%; */
  display: flex;
  flex-direction: column;
  grid-template-rows: repeat(2, 1fr);
  text-align: center;


`

const GoalStatus = styled.div`
  font-size: 40px;
  color: white;
  /* position: fixed; */
  /* bottom: 10%; */
  /* right: 30%; */
  display: flex;
  flex-direction: column;
  grid-template-rows: repeat(2, 1fr);
  text-align: center;
`



const Btn = styled(motion.button)`
  width: 100px;
  height: 100px;
  /* position: fixed; */
  /* left: 46%; */
  /* bottom: 50px; */
  border-radius: 100px;
  justify-items: center;
  align-items: center;
  border: 1px solid #e74d3d;
  color: white;
  background-color: rgba(0, 0, 0, 0.15);

  svg {
    width: 50%;
  }
`

const Input = styled.input`
  /* width: 200px; */
  height: 30px;
  font-size: 20px;
  border-radius: 15px;
  border: 1px solid #e74d3d;
  background-color: rgba(0, 0, 0, 0.15);
  color: white;
`

const InputBox = styled.div`
  /* position: fixed; */
  /* top: 5%; */
  /* left: 30%; */
  width: 100%;
  display: flex;
  justify-content: center;
  /* align-items: center; */
  position: absolute;
  top: 5%;
  /* grid-template-columns: repeat(3, 200px); */
  z-index: 100;
  flex-wrap: wrap;
  
  button{
    width: 100px;
    height: 35px;
    font-size: 20px;
    border-radius: 15px;
    border: 1px solid #e74d3d;
    
  }
`

function Home() {
  const [complete, setComplete] = useState(false)
  const [stop, setStop] = useState(true)
  const [round, setRound] = useState(1)
  const [goal, setGoal] = useState(0)
  const [minutes, setMinutes] = useState(25)
  const [seconds, setSeconds] = useState(0)

  function onClickInputBtn(){
    countdown.init({minutes: minutes , seconds: seconds})
  }

  function onChangeMinutes(event: React.ChangeEvent<HTMLInputElement>){
    setMinutes(Number(event.target.value))
  }

  function onChangeSeconds(event: React.ChangeEvent<HTMLInputElement>){
    setSeconds(Number(event.target.value))
  }

  const countdown = CountDown({
    minutes: minutes,
    seconds: seconds,
    onCompleted: () => setComplete(true),
  })

  useEffect(() => {
    if(countdown.seconds === 0 && countdown.minutes === 0){
      setRound(prev => prev + 1)
      setStop(prev => !prev)
      countdown.reset()
    }
  }, [countdown.seconds])

  const countdownStatus = () => {
    if(!stop === true){
      countdown.pause()
    }else {
      countdown.resume()
    }
  }

  const onClick = () => {
    setStop(prev => !prev)
    countdownStatus()
  }

  useEffect(() => {
    countdown.pause()
    if(round > 4){
      setGoal(prev => prev + 1)
      setRound(1)
    }
  },[round])

    return (
        <>
          <CountDownContainer> 
          {goal > 20 && <Confetti />}
          <AnimatePresence>
          <CountDownDiv>
            <InputBox>
              <Input onChange={onChangeMinutes} placeholder="Minutes"></Input>
              <Input onChange={onChangeSeconds} placeholder="Seconds"></Input>
              <button onClick={onClickInputBtn}>Set Time</button>
            </InputBox>

              <CountDownH1
              key={countdown.minutes + "m"}
              initial={{y: -150, opacity: 0}}
              animate={{y:0, opacity: 1}}
              transition={{
                ease: "easeOut",
                duration: 1
              }}>
              {countdown.minutes}
              
            </CountDownH1>
            <div style={{fontSize: "200px", color: "white"}}>:</div>

            <CountDownH1
              key={countdown.seconds}
              initial={{y: -150, opacity: 0}}
              animate={{y:0, opacity: 1}}
              transition={{
                ease: "easeOut",
                duration: 1
              }}
              >
              {countdown.seconds}
            </CountDownH1>

            <StatusDiv>
        <RoundStatus>
          <div>{round}/4</div>
          <div>Round</div>
        </RoundStatus>
        <Btn id="btn" onClick={onClick}
          whileHover={{
            scale: 1.2
          }}
          whileTap={{
            scale: .8,
          }}>
          {stop ? (
              <svg fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z"></path>
            </svg>
          ) : (
            
            <svg fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path d="M5.75 3a.75.75 0 00-.75.75v12.5c0 .414.336.75.75.75h1.5a.75.75 0 00.75-.75V3.75A.75.75 0 007.25 3h-1.5zM12.75 3a.75.75 0 00-.75.75v12.5c0 .414.336.75.75.75h1.5a.75.75 0 00.75-.75V3.75a.75.75 0 00-.75-.75h-1.5z"></path>
          </svg>    
          )}   
        </Btn>
        <GoalStatus>
            <div>{goal}/20</div>
            <div>Goal</div>
            
        </GoalStatus>
        </StatusDiv>

          </CountDownDiv>
          </AnimatePresence>

          
        </CountDownContainer>
        
        </>
    )
}

export default Home